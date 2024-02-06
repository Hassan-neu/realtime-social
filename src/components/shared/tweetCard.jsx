"use client";
import React, { useState } from "react";
import { HiChatBubbleLeft } from "react-icons/hi2";
import { GoHeartFill, GoBookmarkFill } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./btn";
import { Avatar } from "./avatar";
import { months } from "@/utils/months";
import { TweetMedia } from "./tweetMedia";
export const TweetCard = ({ post }) => {
    const {
        id,
        content,
        media_url,
        likes,
        bookmarks,
        created_at,
        user: { full_name, username, avatar_url },
    } = post;
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const getDate = () => {
        let remSeconds;
        const currYear = new Date(Date.now()).getFullYear();
        const toSeconds = Math.round(
            (Date.now() - new Date(created_at).getTime()) / 1000
        );
        const hours = Math.floor(toSeconds / 3600);
        remSeconds = toSeconds % 3600;
        const minutes = Math.floor(remSeconds / 60);
        remSeconds = remSeconds % 60;

        if (hours > 24) {
            const date = new Date(created_at);
            const month = months[date.getMonth()].slice(0, 3);
            const day = date.getDate();
            const year = date.getFullYear();
            const createdString = `${month} ${day}${
                year == currYear ? "" : ","
            } ${year == currYear ? "" : year}`;
            return createdString;
        } else {
            return `${
                hours ? hours + "h" : minutes ? minutes + "m" : remSeconds + "s"
            }`;
        }
    };
    const updatePost = async () => {
        const res = await fetch("/api/content", {
            method: "PUT",
            body: JSON.stringify({ bookmarked, liked, id }),
        });
    };
    return (
        <div className="w-full flex flex-col gap-3 px-4 py-2 border-[0.2px] cursor-pointer hover:bg-slate-100">
            <Link
                scroll={false}
                href={`/status/${id}`}
                className="flex gap-3 w-full"
            >
                <Avatar
                    className={"relative w-12 h-12 border shrink-0"}
                    url={avatar_url}
                />
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex flex-col gap-1">
                        <Link
                            href={`/profile/${username}`}
                            className="flex gap-1 items-center"
                        >
                            <p>{full_name}</p>
                            <p className="text-sm">{username}</p>
                            <span className="w-1 h-1 inline-block mx-0.5 rounded-full bg-black"></span>
                            <p className="text-sm">{getDate()}</p>
                        </Link>
                        <div className="flex flex-col gap-1">
                            <div className="text-sm text-pretty">{content}</div>
                            <TweetMedia url={media_url} />
                        </div>
                    </div>
                </div>
            </Link>
            <div className="flex gap-3 justify-between w-[calc(100%_-_3.75rem)] self-end">
                <Button onClick={(e) => console.log(e.target)}>
                    <HiChatBubbleLeft size={18} fill="none" strokeWidth={1} />
                </Button>
                <Button
                    onClick={() => {
                        setLiked(!liked);
                        setTimeout(
                            () => alert(JSON.stringify({ liked, bookmarked })),
                            1000
                        );
                    }}
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
                            bookmarked ? "rgb(59 130 246)" : "transparent"
                        }`}
                        stroke={`${
                            bookmarked ? "rgb(59 130 246)" : "currentColor"
                        }`}
                        strokeWidth={1}
                        className="transition duration-500"
                    />
                    <span className="text-xs">{bookmarks}</span>
                </Button>
            </div>
        </div>
    );
};
