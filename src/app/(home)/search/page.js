import { Searchbar } from "@/components/home/actionBar/searchbar";
import { TweetCard } from "@/components/shared/tweetCard";
import React from "react";

const Page = async ({ searchParams: { query } }) => {
    const fetchQuery = async () => {
        const res = await fetch(
            `http://localhost:3000/api/content?query=${query}`,
            {
                method: "GET",
            }
        );
        const data = await res.json();
        return data;
    };
    const searchRes = await fetchQuery();

    return (
        <div>
            <Searchbar />
            <div className="text-pretty">
                {searchRes.map((res) => (
                    <TweetCard key={res.id} post={res} />
                ))}
            </div>
        </div>
    );
};

export default Page;
