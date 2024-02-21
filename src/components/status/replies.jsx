"use client";
import React, { useEffect, useState } from "react";
import { TweetCard } from "../shared/tweetCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Replies({ serverReplies, reply_id }) {
    const supabase = createClientComponentClient();
    const [newReplies, setNewReplies] = useState(serverReplies);
    useEffect(() => {
        setNewReplies(serverReplies);
    }, [serverReplies]);
    useEffect(() => {
        const channel = supabase
            .channel("realtime-post-replies")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "posts",
                    filter: `reply_to=eq.${reply_id}`,
                },
                async (payload) => {
                    const { new: newReply } = payload;
                    const oldReply = newReplies.find(
                        (post) => post.id === newReply.id
                    );
                    if (payload.eventType === "DELETE") {
                        return setNewReplies((prev) =>
                            prev.filter((post) => post.id !== payload.old.id)
                        );
                    }
                    if (oldReply) {
                        setNewReplies((prev) =>
                            prev.map((reply) =>
                                reply.id === newReply.id
                                    ? {
                                          ...reply,
                                          ...newReply,
                                      }
                                    : reply
                            )
                        );
                    } else {
                        const res = await fetch(
                            `/api/auth/profile?id=${newReply.user_id}`
                        );
                        const user = await res.json();
                        setNewReplies([
                            { ...newReply, likes: [], bookmarks: [], user },
                            ...newReplies,
                        ]);
                    }
                }
            )
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, [supabase, reply_id, newReplies]);
    return (
        <>
            {newReplies.map((post) => (
                <TweetCard key={post.id} post={post} />
            ))}
        </>
    );
}
