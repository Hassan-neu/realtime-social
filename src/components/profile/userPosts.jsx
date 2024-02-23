"use client";
import React, { startTransition, useEffect, useState } from "react";
import { TweetCard } from "../shared/tweetCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useOptimistic } from "react";
import { useRouter } from "next/navigation";
import { ToastAction } from "../ui/toast";
import { toast } from "../ui/use-toast";
export default function UserPosts({ serverPosts, username }) {
    const { refresh } = useRouter();
    const supabase = createClientComponentClient();
    const [userPosts, setUserPosts] = useState(serverPosts);
    const [optimisticPosts, addOptimisticPost] = useOptimistic(
        userPosts,
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
        setUserPosts(serverPosts);
        startTransition(() => addOptimisticPost(serverPosts));
    }, [serverPosts, addOptimisticPost]);
    useEffect(() => {
        const channel = supabase
            .channel("realtime-userposts")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "posts" },
                async (payload) => {
                    const res = await fetch(
                        `/api/auth/profile?username=${username}`
                    );
                    const user = await res.json();
                    const { new: newPost } = payload;
                    if (newPost.user_id === user.id) {
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
                }
            )
            .subscribe();
        return () => supabase.removeChannel(channel);
    }, [supabase, username, refresh]);
    return (
        <div className="flex flex-col">
            {optimisticPosts?.map((post) => (
                <TweetCard
                    key={post.id}
                    post={post}
                    addOptimisticPost={addOptimisticPost}
                    setNewPosts={setUserPosts}
                />
            ))}
        </div>
    );
}
