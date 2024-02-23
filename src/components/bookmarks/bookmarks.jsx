"use client";
import React, {
    useState,
    useEffect,
    useOptimistic,
    startTransition,
} from "react";
import { TweetCard } from "../shared/tweetCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { ToastAction } from "../ui/toast";
import { toast } from "../ui/use-toast";
export function Bookmarks({ serverBookmarks }) {
    const { refresh } = useRouter();
    const supabase = createClientComponentClient();
    const [newBookmarks, setNewBookmarks] = useState(serverBookmarks);
    const [optimisticBookmarks, addOptimisticBookmark] = useOptimistic(
        newBookmarks,
        (currentBookmarks, newBookmark) => {
            const newOptimisticBookmark = [...currentBookmarks];
            const indx = newOptimisticBookmark.findIndex(
                (post) => post.id === newBookmark.id
            );
            newOptimisticBookmark[indx] = newBookmark;
            return newOptimisticBookmark;
        }
    );
    useEffect(() => {
        setNewBookmarks(serverBookmarks);
        startTransition(() => addOptimisticBookmark(serverBookmarks));
    }, [serverBookmarks, addOptimisticBookmark]);
    useEffect(() => {
        const channel = supabase
            .channel("realtime-bookmarks")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "bookmarks" },
                (payload) => {
                    if (payload.eventType === "DELETE") {
                        refresh();
                    }
                }
            )
            .subscribe();
        return () => supabase.removeChannel(channel);
    }, [supabase, refresh]);
    return (
        <div>
            {optimisticBookmarks.map((bookmark) => {
                return (
                    <TweetCard
                        key={bookmark.id}
                        post={bookmark}
                        addOptimisticPost={addOptimisticBookmark}
                        setNewPosts={setNewBookmarks}
                    />
                );
            })}
        </div>
    );
}
