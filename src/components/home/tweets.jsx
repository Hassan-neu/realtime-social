"use client";
import React, { startTransition, useEffect, useState } from "react";
import { TweetCard } from "../shared/tweetCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useOptimistic } from "react";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { ToastAction } from "../ui/toast";
const Tweets = ({ contents }) => {
    const { refresh } = useRouter();
    const supabase = createClientComponentClient();
    const [newPosts, setNewPosts] = useState(contents);
    const [optimisticPosts, addOptimisticPost] = useOptimistic(
        newPosts,
        (currentPosts, newPost) => {
            const newOptimisticPosts = [...currentPosts];
            const indx = newOptimisticPosts.findIndex(
                (post) => post.id === newPost.id
            );
            newOptimisticPosts[indx] = newPost;
            return newOptimisticPosts;
        }
    );
    useEffect(() => {
        setNewPosts(contents);
        startTransition(() => addOptimisticPost(contents));
    }, [contents, addOptimisticPost]);
    useEffect(() => {
        const channel = supabase
            .channel("realtime-posts")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "posts" },
                (payload) => {
                    if (payload.eventType === "DELETE") {
                        return refresh();
                    }
                    toast({
                        description: "Load new posts",
                        action: (
                            <ToastAction
                                altText="Refresh"
                                onClick={() => refresh()}
                            >
                                Load new
                            </ToastAction>
                        ),
                    });
                }
            )
            .subscribe();
        return () => supabase.removeChannel(channel);
    }, [supabase, refresh]);

    return (
        <div>
            {optimisticPosts?.map((content) => (
                <TweetCard
                    key={content.id}
                    post={content}
                    addOptimisticPost={addOptimisticPost}
                    setNewPosts={setNewPosts}
                />
            ))}
        </div>
    );
};

export default Tweets;
