import { HomeBar } from "@/components/shared/homeBar";
import { TweetCard } from "@/components/shared/tweetCard";
import Replies from "@/components/status/replies";
import { TweetPost } from "@/components/status/tweetPost";
import React from "react";
export const revalidate = 0;
const Page = async ({ params: { id } }) => {
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

    return (
        <div>
            <HomeBar>POST</HomeBar>
            <TweetPost serverPost={post} />
            <Replies serverReplies={replies} reply_id={id} />
        </div>
    );
};

export default Page;
