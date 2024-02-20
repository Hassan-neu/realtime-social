import React from "react";
import { TweetPost } from "./tweetPost";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
export const revalidate = 0;
export default async function StatusTweet({ post_id: id }) {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
        cookies: () => cookieStore,
    });
    const getPost = async () => {
        const res = await fetch(`http://localhost:3000/api/content?id=${id}`);
        const data = res.json();
        return data;
    };
    const post = await getPost();
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
    const newPosts = {
        ...post,
        user_liked: post.likes.find((like) => like.user_id === userId),
        user_bookmarked: post.bookmarks.find(
            (bookmark) => bookmark.user_id === userId
        ),
    };
    return <TweetPost serverPost={newPosts} />;
}
