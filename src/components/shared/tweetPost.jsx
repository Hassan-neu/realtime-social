"use client";
import React, { useState } from "react";
import { GoBookmarkFill, GoHeartFill } from "react-icons/go";
import { Button } from "./btn";
import { HiChatBubbleLeft } from "react-icons/hi2";
import Link from "next/link";
import { Avatar } from "./avatar";
import { months } from "@/utils/months";
import { Reply } from "./reply";
export function TweetPost({ post }) {
    const {
        id,
        content,
        likes,
        bookmarks,
        created_at,
        user: { full_name, username, avatar_url },
    } = post;
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
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
                        <p className="text-sm">{username}</p>
                    </Link>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <div className="text-pretty">{content}</div>
                    <div className="flex gap-1 items-center text-sm">
                        <span>{getTime()}</span>
                        <span className="w-1 h-1 inline-block mx-0.5 rounded-full bg-black"></span>
                        <span>{getDate()}</span>
                    </div>
                    <div className="flex gap-3 justify-between border-y py-3">
                        <Button onClick={(e) => console.log(e.target)}>
                            <HiChatBubbleLeft
                                size={18}
                                fill="none"
                                strokeWidth={1}
                            />
                        </Button>
                        <Button
                            onClick={() => setLiked(!liked)}
                            className={"flex items-center gap-1"}
                        >
                            <GoHeartFill
                                size={18}
                                fill={`${liked ? "red" : "transparent"}`}
                                stroke={`${liked ? "red" : "currentColor"}`}
                                strokeWidth={1}
                                className="transition duration-500"
                            />
                            <span className="text-xs">{likes}</span>
                        </Button>
                        <Button
                            onClick={() => setBookmarked(!bookmarked)}
                            className={"flex items-center gap-1"}
                        >
                            <GoBookmarkFill
                                size={18}
                                fill={`${
                                    bookmarked
                                        ? "rgb(59 130 246)"
                                        : "transparent"
                                }`}
                                stroke={`${
                                    bookmarked
                                        ? "rgb(59 130 246)"
                                        : "currentColor"
                                }`}
                                strokeWidth={1}
                                className="transition duration-500"
                            />
                            <span className="text-xs">{bookmarks}</span>
                        </Button>
                    </div>
                </div>

                <Reply avatar_url={avatar_url} id={id} />
            </div>
        </div>
    );
}
