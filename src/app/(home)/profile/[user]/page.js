import User from "@/components/profile/user";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
export const revalidate = 0;
const Page = async ({ params: { user } }) => {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
        cookies: () => cookieStore,
    });
    const getProfile = async () => {
        try {
            const res = await fetch(
                `http://localhost:3000/api/auth/profile?username=${user}`
            );
            if (res.ok) {
                const data = await res.json();
                return data;
            }
        } catch (error) {
            console.log(error);
            throw new Error("Unable to fetch user profile");
        }
    };
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

    const userProfile = await getProfile();
    const newUserProfile = {
        ...userProfile,
        posts: userProfile.posts.map((post) => ({
            ...post,
            user_liked: post.likes.find((post) => post.user_id === userId),
            user_bookmarked: post.bookmarks.find(
                (bookmark) => bookmark.user_id === userId
            ),
        })),
    };

    return <User profile={newUserProfile} />;
};

export default Page;
