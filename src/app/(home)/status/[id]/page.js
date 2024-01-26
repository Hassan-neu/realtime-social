import { HomeBar } from "@/components/shared/homeBar";
import { TweetCard } from "@/components/shared/tweetCard";
import { TweetPost } from "@/components/shared/tweetPost";
import React from "react";

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
            <TweetPost post={post} />
            {replies.map((post) => (
                <TweetCard key={post.id} post={post} />
            ))}
        </div>
    );
};

export default Page;
