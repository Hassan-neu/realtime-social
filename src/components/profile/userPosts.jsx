import React, { useEffect, useState } from "react";
import { TweetCard } from "../shared/tweetCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export default function UserPosts({ serverPosts, user }) {
    const supabase = createClientComponentClient();
    const [posts, setPosts] = useState(serverPosts);
    useEffect(() => {
        const channel = supabase
            .channel("realtime-user-posts")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "posts" },
                (payload) => {
                    const { new: newPosts } = payload;
                    setPosts((prev) =>
                        prev.map((post) =>
                            post.id === newPosts.id
                                ? { ...post, ...newPosts }
                                : post
                        )
                    );
                }
            )
            .subscribe();
        return () => supabase.removeChannel(channel);
    }, [supabase, posts]);
    return (
        <div className="flex flex-col">
            {posts?.map((post) => (
                <TweetCard
                    key={post.id}
                    post={{
                        ...post,
                        user,
                    }}
                />
            ))}
        </div>
    );
}
