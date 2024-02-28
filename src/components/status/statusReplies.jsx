import React from "react";
import Replies from "./replies";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export const revalidate = 0;
export default async function StatusReplies({ post_id: id }) {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
        cookies: () => cookieStore,
    });
    const getReplies = async () => {
        const res = await fetch(
            `http://localhost:3000/api/content?reply_to=${id}`
        );
        const data = res.json();
        return data;
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
    const replies = await getReplies();
    const newReplies = replies.map((reply) => ({
        ...reply,
        likes_length: reply.likes.length,
        bookmarks_length: reply.bookmarks.length,
        user_liked: reply.likes.some((like) => like.user_id === userId),
        user_bookmarked: reply.bookmarks.some(
            (bookmark) => bookmark.user_id === userId
        ),
        is_current_user: reply.user_id === userId,
    }));

    return <Replies serverReplies={newReplies} reply_id={id} />;
}
