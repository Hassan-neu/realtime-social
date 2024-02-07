"use client";
import React, { useEffect, useState } from "react";
import { TweetCard } from "../shared/tweetCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const Tweets = ({ contents }) => {
    const supabase = createClientComponentClient();
    const [newPosts, setNewPosts] = useState(contents);
    useEffect(() => {
        const channel = supabase
            .channel("realtime-posts")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "posts" },
                async (payload) => {
                    const { new: newPost } = payload;
                    const oldPost = newPosts.find(
                        (post) => post.id === newPost.id
                    );
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
                        setNewPosts([{ ...newPost, user }, ...newPosts]);
                    }
                }
            )
            .subscribe();
        return () => supabase.removeChannel(channel);
    }, [supabase, newPosts]);

    return (
        <div>
            {newPosts?.map((content) => (
                <TweetCard key={content.id} post={content} />
            ))}
        </div>
    );
};

export default Tweets;
