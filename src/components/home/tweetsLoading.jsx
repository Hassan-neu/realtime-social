import React from "react";
import TweetLoading from "../shared/tweetLoading";

export default function TweetsLoading() {
    return (
        <div className="flex flex-col">
            {Array.from({ length: 10 }, (_v, i) => (
                <TweetLoading key={i} />
            ))}
        </div>
    );
}
