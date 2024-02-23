"use client";
import React, { useEffect, useOptimistic, useState } from "react";
import { TweetCard } from "../shared/tweetCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
export default function Replies({ serverReplies, reply_id }) {
    const { refresh } = useRouter();
    const supabase = createClientComponentClient();
    const [newReplies, setNewReplies] = useState(serverReplies);
    const [optimisticReplies, addOptimisticReplies] = useOptimistic(
        newReplies,
        (currentReplies, newReply) => {
            const newOptimisticReplies = [...currentReplies];
            const indx = newOptimisticReplies.findIndex(
                (reply) => reply.id === newReply.id
            );
            newOptimisticReplies[indx] = newReply;
            return newOptimisticReplies;
        }
    );
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
                (payload) => {
                    refresh();
                }
            )
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, [supabase, reply_id, refresh]);
    return (
        <>
            {optimisticReplies.map((post) => (
                <TweetCard
                    key={post.id}
                    post={post}
                    addOptimisticPost={addOptimisticReplies}
                    setNewPosts={setNewReplies}
                />
            ))}
        </>
    );
}
