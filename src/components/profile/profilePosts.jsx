import React from "react";
import UserPosts from "./userPosts";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
export const revalidate = 0;
export default async function ProfilePosts({ username }) {
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
    async function getUserPosts() {
        try {
            const res = await fetch(
                `http://localhost:3000/api/content?user_id=${userProfile.id}`
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
    const userPosts = await getUserPosts();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const serverPosts = userPosts.map((post) => ({
        ...post,
        user_liked: post.likes.find((like) => like.user_id == userId),
        user_bookmarked: post.bookmarks.find(
            (bookmark) => bookmark.user_id === userId
        ),
    }));

    return <UserPosts serverPosts={serverPosts} />;
}
