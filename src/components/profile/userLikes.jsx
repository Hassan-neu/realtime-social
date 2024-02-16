import React from "react";
import { TweetCard } from "../shared/tweetCard";

export default function UserLikes({ serverLikes }) {
    return (
        <div className="flex flex-col">
            {serverLikes.map((like) => {
                const { post } = like;
                return <TweetCard key={like.id} post={post} />;
            })}
        </div>
    );
}
