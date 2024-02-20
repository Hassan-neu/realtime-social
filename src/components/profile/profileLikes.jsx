import React from "react";
import UserLikes from "./userLikes";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
export const revalidate = 0;
export default async function ProfileLikes({ username }) {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
        cookies: () => cookieStore,
    });
    async function getuserProfile() {
        try {
            const res = await fetch(
                `http://localhost:3000/api/auth/profile?username=${username}`
            );
            if (res.ok) {
                const data = await res.json();
                return data;
            }
        } catch (error) {
            console.log(error);
            throw new Error("Unable to fetch user profile");
        }
    }
    const userProfile = await getuserProfile();
    async function getUserLikes() {
        try {
            const res = await fetch(
                `http://localhost:3000/api/like?user_id=${userProfile.id}`
            );
            if (res.ok) {
                const data = await res.json();
                return data;
            }
        } catch (error) {
            console.log(error);
            throw new Error("Unable to fetch user posts");
        }
    }
    const getUserId = async () => {
        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            return user.id;
        } catch (error) {
            console.log(error);
        }
    };
    const userId = await getUserId();
    const userLikes = await getUserLikes();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const serverLikes = userLikes.map((like) => ({
        ...like,
        post: {
            ...like.post,
            user_liked: like.post.likes.find((like) => like.user_id == userId),
            user_bookmarked: like.post.bookmarks.find(
                (bookmark) => bookmark.user_id === userId
            ),
        },
    }));
    return <UserLikes serverLikes={serverLikes} />;
}
