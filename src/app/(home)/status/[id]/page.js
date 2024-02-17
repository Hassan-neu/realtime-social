import { HomeBar } from "@/components/shared/homeBar";
import { TweetCard } from "@/components/shared/tweetCard";
import Replies from "@/components/status/replies";
import StatusLoading from "@/components/status/statusLoading";
import StatusTweet from "@/components/status/statusTweet";
import React, { Suspense } from "react";
export const revalidate = 0;
const Page = async ({ params: { id } }) => {
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
            <HomeBar showButton>
                <div>POST</div>
            </HomeBar>
            <Suspense fallback={<StatusLoading />}>
                <StatusTweet post_id={id} />
            </Suspense>
            <Replies serverReplies={replies} reply_id={id} />
        </div>
    );
};

export default Page;
