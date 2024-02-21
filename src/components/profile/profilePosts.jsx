import React from "react";
import UserPosts from "./userPosts";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getUserPosts } from "./queries/getUserPosts";
export default async function ProfilePosts({ username, searchParams }) {
    const { view } = searchParams;
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
    const userPosts = await getUserPosts(username, view);

    let serverPosts;
    if (view !== "likes") {
        serverPosts = userPosts.map((post) => ({
            ...post,
            likes_length: post.likes.length,
            bookmarks_length: post.bookmarks.length,
            user_liked: post.likes.some((like) => like.user_id == userId),
            user_bookmarked: post.bookmarks.some(
                (bookmark) => bookmark.user_id === userId
            ),
        }));
    } else {
        serverPosts = userPosts.map((like) => ({
            ...like.post,
            likes_length: like.post.likes.length,
            bookmarks_length: like.post.bookmarks.length,
            user_liked: like.post.likes.some((like) => like.user_id == userId),
            user_bookmarked: like.post.bookmarks.some(
                (bookmark) => bookmark.user_id === userId
            ),
        }));
    }
    return <UserPosts serverPosts={serverPosts} />;
}
