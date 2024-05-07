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
        try {
            const res = await fetch(
                `http://localhost:3000/api/content?id=${id}`
            );
            if (res.ok) {
                const data = res.json();
                return data;
            } else {
                throw new Error("Unable to fetch post");
            }
        } catch (error) {
            toast({
                description: error.message,
                variant: "destructive",
            });
        }
    };
    const getReplies = async () => {
        try {
            const res = await fetch(
                `http://localhost:3000/api/content?reply_to=${id}`
            );
            if (res.ok) {
                const data = res.json();
                return data;
            } else {
                throw new Error("Unable to fetch replies");
            }
        } catch (error) {
            console.log(error);
            toast({
                description: error.message,
                variant: "destructive",
            });
        }
    };
    const replies = await getReplies();
    const post = await getPost();
    const getUserId = async () => {
        try {
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();
            if (user) {
                return user.id;
            } else {
                throw error;
            }
        } catch (error) {
            toast({
                description: error.message,
                variant: "destructive",
            });
        }
    };
    const userId = await getUserId();
    const newPosts = {
        ...post,
        likes_length: post.likes.length,
        bookmarks_length: post.bookmarks.length,
        user_liked: post.likes.some((like) => like.user_id === userId),
        user_bookmarked: post.bookmarks.some(
            (bookmark) => bookmark.user_id === userId
        ),
        reply_length: replies.length,
        is_current_user: post.user_id === userId,
    };
    return <TweetPost serverPost={newPosts} />;
}
