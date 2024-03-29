"use client";
import React, { useEffect, useState } from "react";
import { GoBookmarkFill, GoHeartFill } from "react-icons/go";
import { Button } from "../shared/btn";
import { HiChatBubbleLeft } from "react-icons/hi2";
import Link from "next/link";
import { Avatar } from "../shared/avatar";
import { months } from "@/utils/months";
import { Reply } from "./reply";
import { TweetMedia } from "../shared/tweetMedia";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export function TweetPost({ serverPost }) {
    const supabase = createClientComponentClient();
    const [post, setPost] = useState(serverPost);
    const {
        id,
        content,
        media_url,
        likes,
        bookmarks,
        user_liked,
        user_bookmarked,
        created_at,
        user: { full_name, username, avatar_url },
    } = post;
    function getTime() {
        const date = new Date(created_at);
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const timeString = `${hour == 0 ? 12 : hour > 12 ? hour - 12 : hour}:${
            minutes < 10 ? "0" + minutes : minutes
        } ${hour > 11 ? "PM" : "AM"}`;
        return timeString;
    }
    function getDate() {
        const date = new Date(created_at);
        const month = months[date.getMonth()].slice(0, 3);
        const day = date.getDate();
        const year = date.getFullYear();
        const dateString = `${month} ${day}, ${year}`;
        return dateString;
    }
    useEffect(() => {
        const channel = supabase
            .channel("realtime-single-post")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "posts",
                    filter: `id=eq.${id}`,
                },
                (payload) => {
                    const { new: newPost } = payload;
                    setPost((prev) => ({ ...prev, ...newPost }));
                }
            )
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, [supabase, id]);
    const handleLike = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (user_liked) {
            const res = await fetch(
                `/api/like?post_id=${id}&user_id=${user.id}`,
                {
                    method: "DELETE",
                }
            );
        } else {
            const res = await fetch("/api/like", {
                method: "POST",
                body: JSON.stringify({ post_id: id, user_id: user.id }),
            });
        }
    };
    const handleBookmark = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const bookmarkExists = bookmarks.find(
            (bookmark) => bookmark.user_id === user.id
        );
        if (bookmarkExists) {
            const res = await fetch(
                `/api/bookmark?post_id=${id}&user_id=${user.id}`,
                {
                    method: "DELETE",
                }
            );
        } else {
            const res = await fetch("/api/bookmark", {
                method: "POST",
                body: JSON.stringify({ post_id: id, user_id: user.id }),
            });
        }
    };
    return (
        <div className="w-full flex flex-col gap-3 px-4 py-2 border-[0.2px] cursor-pointer border-b-0">
            <div className="flex flex-col gap-3 w-full">
                <div className="flex gap-2">
                    <Avatar
                        className={"relative w-12 h-12 border shrink-0"}
                        url={avatar_url}
                    />
                    <Link
                        href={`/profile/${username}`}
                        className="flex flex-col gap-0.5 leading-"
                    >
                        <p className="text-xl font-bold">{full_name}</p>
                        <p className="text-sm">&#64;{username}</p>
                    </Link>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex flex-col gap-2">
                        <div className="text-pretty">{content}</div>
                        <TweetMedia url={media_url} />
                    </div>
                    <div className="flex gap-1 items-center text-sm">
                        <span>{getTime()}</span>
                        <span className="w-1 h-1 inline-block mx-0.5 rounded-full bg-black"></span>
                        <span>{getDate()}</span>
                    </div>
                    <div className="flex gap-3 justify-between border-y py-3">
                        <Button>
                            <HiChatBubbleLeft
                                size={18}
                                fill="none"
                                strokeWidth={1}
                            />
                        </Button>
                        <Button
                            onClick={handleLike}
                            className={"flex items-center gap-1"}
                        >
                            <GoHeartFill
                                size={18}
                                fill={`${user_liked ? "red" : "transparent"}`}
                                stroke={`${
                                    user_liked ? "red" : "currentColor"
                                }`}
                                strokeWidth={1}
                                className="transition duration-500"
                            />
                            <span
                                className={`text-xs ${
                                    user_liked ? "text-red-500" : "text-black"
                                }`}
                            >
                                {likes.length}
                            </span>
                        </Button>
                        <Button
                            onClick={handleBookmark}
                            className={"flex items-center gap-1"}
                        >
                            <GoBookmarkFill
                                size={18}
                                fill={`${
                                    user_bookmarked
                                        ? "rgb(59 130 246)"
                                        : "transparent"
                                }`}
                                stroke={`${
                                    user_bookmarked
                                        ? "rgb(59 130 246)"
                                        : "currentColor"
                                }`}
                                strokeWidth={1}
                                className="transition duration-500"
                            />
                            <span
                                className={`text-xs ${
                                    user_bookmarked
                                        ? "text-blue-500"
                                        : "text-black"
                                }`}
                            >
                                {bookmarks.length}
                            </span>
                        </Button>
                    </div>
                </div>

                <Reply avatar_url={avatar_url} id={id} />
            </div>
        </div>
    );
}
