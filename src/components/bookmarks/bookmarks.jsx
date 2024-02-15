"use client";
import React, { useState, useEffect } from "react";
import { TweetCard } from "../shared/tweetCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function Bookmarks({ serverBookmarks }) {
    const [newBookmarks, setNewBookmarks] = useState(serverBookmarks);
    const supabase = createClientComponentClient();

    useEffect(() => {
        const channel = supabase
            .channel("realtime-bookmarks")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "bookmarks" },
                (payload) => console.log(payload)
            )
            .subscribe();
        return () => supabase.removeChannel(channel);
    });
    return (
        <div>
            {serverBookmarks.map((bookmark) => {
                const { post } = bookmark;
                return <TweetCard key={bookmark.id} post={post} />;
            })}
        </div>
    );
}
