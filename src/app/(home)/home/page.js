import { HomeBar } from "@/components/shared/homeBar";
import { TweetCard } from "@/components/shared/tweetCard";
import React from "react";

function Page() {
    return (
        <main className="">
            <HomeBar>
                <div className="text-2xl font-semibold">HOME</div>
            </HomeBar>
            <div>
                <TweetCard />
                <TweetCard />
                <TweetCard />
                <TweetCard />
                <TweetCard />
            </div>
        </main>
    );
}

export default Page;
