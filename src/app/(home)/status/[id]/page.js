import { HomeBar } from "@/components/shared/homeBar";
import TweetsLoading from "@/components/shared/tweetsLoading";
import StatusLoading from "@/components/status/statusLoading";
import StatusReplies from "@/components/status/statusReplies";
import StatusTweet from "@/components/status/statusTweet";
import React, { Suspense } from "react";
export const revalidate = 0;
const Page = async ({ params: { id } }) => {
    return (
        <div>
            <HomeBar showButton>
                <div>POST</div>
            </HomeBar>
            <Suspense fallback={<StatusLoading />}>
                <StatusTweet post_id={id} />
            </Suspense>
            <Suspense fallback={<TweetsLoading />}>
                <StatusReplies post_id={id} />
            </Suspense>
        </div>
    );
};

export default Page;
