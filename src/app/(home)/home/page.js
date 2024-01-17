import { HomeBar } from "@/components/shared/homeBar";
import { TweetCard } from "@/components/shared/tweetCard";
import React from "react";

async function Page() {
    const fetchContents = async () => {
        const res = await fetch("http://localhost:3000/api/content", {
            method: "GET",
        });
        const data = await res.json();
        return data;
    };
    const contents = await fetchContents();
    return (
        <main className="">
            <HomeBar>
                <div className="text-2xl font-semibold">HOME</div>
            </HomeBar>
            <div>
                {contents?.map((content) => (
                    <TweetCard key={content.id} post={content} />
                ))}
                {/* <TweetCard />
                <TweetCard />
                <TweetCard />
                <TweetCard />
                <TweetCard /> */}
            </div>
        </main>
    );
}

export default Page;
