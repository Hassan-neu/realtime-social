"use client";
import React, { useEffect, useState } from "react";
import { TweetCard } from "../shared/tweetCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useOptimistic } from "react";
export default function UserPosts({ serverPosts }) {
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
        const channel = supabase
            .channel("realtime-user-posts")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "posts",
                    filter: `user_id=eq.${userPosts.user_id}`,
                },
                (payload) => {
                    const { new: newPost } = payload;
                    console.log(payload);
                    const oldPost = userPosts.find(
                        (post) => post.id === newPost.id
                    );
                    if (payload.eventType === "DELETE") {
                        return setUserPosts((prev) =>
                            prev.filter((post) => post.id !== payload.old.id)
                        );
                    }
                    if (oldPost) {
                        setUserPosts((prev) =>
                            prev.map((post) =>
                                post.id === newPost.id
                                    ? { ...post, ...newPost }
                                    : post
                            )
                        );
                    } else {
                        setUserPosts([
                            {
                                ...newPost,
                                likes_length: 0,
                                bookmarks_length: 0,
                            },
                            ...userPosts,
                        ]);
                    }
                }
            )
            .subscribe();
        return () => supabase.removeChannel(channel);
    }, [supabase, userPosts]);
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
