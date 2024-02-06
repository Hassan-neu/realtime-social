"use client";
import React, { useEffect, useState } from "react";
import { TweetCard } from "../shared/tweetCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const Tweets = ({ contents }) => {
    const supabase = createClientComponentClient();
    const [newPosts, setNewPosts] = useState(contents);
    useEffect(() => {
        const channel = supabase
            .channel("custom-all-channel")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "posts" },
                (payload) => {
                    const { new: newPost } = payload;
                    setNewPosts((prev) =>
                        prev.map((post) => {
                            if (post.id === newPost.id) {
                                return {
                                    ...post,
                                    ...newPost,
                                };
                            }
                            return post;
                        })
                    );
                }
            )
            .subscribe();
        return () => supabase.removeChannel(channel);
    }, [supabase]);

    return (
        <div>
            {newPosts?.map((content) => (
                <TweetCard key={content.id} post={content} />
            ))}
        </div>
    );
};

export default Tweets;
