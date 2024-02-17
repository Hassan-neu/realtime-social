import { HomeBar } from "@/components/shared/homeBar";
import { TweetCard } from "@/components/shared/tweetCard";
import React, { Suspense } from "react";
import { RiTwitterXFill } from "react-icons/ri";
import HomeTweets from "@/components/home/homeTweets";
import Loading from "@/components/shared/loading";
import TweetsLoading from "@/components/home/tweetsLoading";
async function Page() {
    return (
        <main className="">
            <HomeBar>
                <div className="text-2xl font-semibold hidden lg:block">
                    HOME
                </div>
                <div className="px-3 text-xl font-bold flex items-center mx-auto lg:hidden">
                    NOT &nbsp;
                    <RiTwitterXFill size={20} />
                </div>
            </HomeBar>
            <Suspense fallback={<TweetsLoading />}>
                <HomeTweets />
            </Suspense>
        </main>
    );
}

export default Page;
