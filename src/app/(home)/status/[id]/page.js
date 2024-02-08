import { HomeBar } from "@/components/shared/homeBar";
import { TweetCard } from "@/components/shared/tweetCard";
import Replies from "@/components/status/replies";
import { TweetPost } from "@/components/status/tweetPost";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
export const revalidate = 0;
const Page = async ({ params: { id } }) => {
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
    const getReplies = async () => {
        const res = await fetch(
            `http://localhost:3000/api/content?reply_to=${id}`
        );
        const data = res.json();
        return data;
    };
    const replies = await getReplies();
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

    return (
        <div>
            <HomeBar showButton>POST</HomeBar>
            <TweetPost serverPost={newPosts} />
            <Replies serverReplies={replies} reply_id={id} />
        </div>
    );
};

export default Page;
