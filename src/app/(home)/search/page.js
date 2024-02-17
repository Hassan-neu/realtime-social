import { Searchbar } from "@/components/home/actionBar/searchbar";
import { TweetCard } from "@/components/shared/tweetCard";
import React from "react";
export const revalidate = 0;
const Page = async ({ searchParams: { query } }) => {
    const fetchQuery = async () => {
        const res = await fetch(
            `http://localhost:3000/api/content?query=${query}`
        );
        const data = await res.json();
        return data;
    };
    const searchRes = await fetchQuery();
    return (
        <div>
            <Searchbar />
            <div className="text-pretty">
                {searchRes.length > 0 ? (
                    searchRes.map((res) => (
                        <TweetCard key={res.id} post={res} />
                    ))
                ) : (
                    <div className="flex flex-col items-center h-full mt-10">
                        <div className="text-lg text-slate-400">
                            Results not found
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
