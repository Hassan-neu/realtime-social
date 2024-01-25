import { HomeBar } from "@/components/shared/homeBar";
import { TweetPost } from "@/components/shared/tweetPost";
import React from "react";

const Page = ({ params: { id } }) => {
    return (
        <div>
            <HomeBar>POST</HomeBar>
            <TweetPost />
        </div>
    );
};

export default Page;
