import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { Bookmarks } from "./bookmarks";
export const revalidate = 0;
export default async function UserBookmarks() {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
        cookies: () => cookieStore,
    });
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
    async function getUserBookmarks() {
        try {
            const res = await fetch(
                `http://localhost:3000/api/bookmark?user_id=${userId}`
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

    const userBookmarks = await getUserBookmarks();
    const serverBookmarks = userBookmarks.map((bookmark) => ({
        ...bookmark,
        post: {
            ...bookmark.post,
            user_liked: bookmark.post.likes.find(
                (like) => like.user_id == userId
            ),
            user_bookmarked: bookmark.post.bookmarks.find(
                (bookmark) => bookmark.user_id === userId
            ),
        },
    }));
    return <Bookmarks serverBookmarks={serverBookmarks} />;
}
