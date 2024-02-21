"use client";
import React, { useEffect, useState } from "react";
import { TweetCard } from "../shared/tweetCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useOptimistic } from "react";
const Tweets = ({ contents }) => {
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
        const channel = supabase
            .channel("realtime-posts")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "posts" },
                async (payload) => {
                    const { new: newPost } = payload;
                    console.log(payload);
                    const oldPost = newPosts.find(
                        (post) => post.id === newPost.id
                    );
                    if (payload.eventType === "DELETE") {
                        return setNewPosts((prev) =>
                            prev.filter((post) => post.id !== payload.old.id)
                        );
                    }
                    if (oldPost) {
                        setNewPosts((prev) =>
                            prev.map((post) =>
                                post.id === newPost.id
                                    ? {
                                          ...post,
                                          ...newPost,
                                      }
                                    : post
                            )
                        );
                    } else {
                        const res = await fetch(
                            `/api/auth/profile?id=${newPost.user_id}`
                        );
                        const user = await res.json();
                        setNewPosts([
                            {
                                ...newPost,
                                likes_length: 0,
                                bookmarks_length: 0,
                                user,
                            },
                            ...newPosts,
                        ]);
                    }
                }
            )
            .subscribe();
        return () => supabase.removeChannel(channel);
    }, [supabase, newPosts]);

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
