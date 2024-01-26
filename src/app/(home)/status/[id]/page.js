import { HomeBar } from "@/components/shared/homeBar";
import { TweetPost } from "@/components/shared/tweetPost";
import React from "react";

const Page = async ({ params: { id } }) => {
    const getPost = async () => {
        const res = await fetch(`http://localhost:3000/api/content?id=${id}`);
        const data = res.json();
        return data;
    };
    const post = await getPost();
    return (
        <div>
            <HomeBar>POST</HomeBar>
            <TweetPost post={post} />
        </div>
    );
};

export default Page;
