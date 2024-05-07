import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import Tweets from "./tweets";
import { toast } from "../ui/use-toast";
export const revalidate = 0;
export default async function HomeTweets() {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
        cookies: () => cookieStore,
    });
    const fetchContents = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/content");
            if (res.ok) {
                const data = await res.json();
                return data;
            } else {
                throw new Error("Unable to load new contents");
            }
        } catch (error) {
            console.error(error);
            toast({
                description: error.message,
                variant: "destructive",
            });
        }
    };
    const fetchReplies = async () => {
        try {
            const res = await fetch(
                `http://localhost:3000/api/content?replies=${true}`
            );
            if (res.ok) {
                const data = await res.json();
                return data;
            } else {
                throw new Error("Unable to load replies");
            }
        } catch (error) {
            console.log(error);
            toast({
                description: error.message,
            });
        }
    };
    const replies = await fetchReplies();
    const contents = await fetchContents();
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

    const newContents = contents.map((content) => ({
        ...content,
        likes_length: content.likes.length,
        bookmarks_length: content.bookmarks.length,
        user_liked: content.likes.some((like) => like.user_id === userId),
        user_bookmarked: content.bookmarks.some(
            (bookmark) => bookmark.user_id === userId
        ),
        is_current_user: content.user_id === userId,
        reply_length: replies.reduce(
            (acc, curr) => (curr.reply_to === content.id ? acc + 1 : acc),
            0
        ),
    }));

    return <Tweets contents={newContents} />;
}
