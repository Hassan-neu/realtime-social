"use client";
import React from "react";
import { TweetCard } from "../shared/tweetCard";

export async function Bookmarks({ serverBookmarks }) {
    return (
        <div>
            {serverBookmarks.map((bookmark) => {
                const { post } = bookmark;
                return <TweetCard key={bookmark.id} post={post} />;
            })}
        </div>
    );
}
