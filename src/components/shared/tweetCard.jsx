"use client";
import React, { useState } from "react";
import { HiChatBubbleLeft } from "react-icons/hi2";
import { GoHeartFill, GoBookmarkFill } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./btn";
import { Avatar } from "./avatar";
export const TweetCard = ({ post }) => {
    const {
        id,
        content,
        likes,
        bookmarks,
        created_at,
        user: { full_name, username, avatar_url },
    } = post;
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [time, setTime] = useState("");
    const getDate = () => {
        let remSeconds;
        const toSeconds = Math.round(
            (Date.now() - new Date(created_at)) / 1000
        );
        const hours = Math.floor(toSeconds / 3600);
        remSeconds = toSeconds % 3600;
        const minutes = Math.floor(remSeconds / 60);
        remSeconds = remSeconds % 60;

        if (hours > 24) {
            const createdDate = new Date(created_at);
            const createdString = `${
                months[createdDate.getMonth()]
            } ${createdDate.getDate()}, ${createdDate.getFullYear()}`;
            return createdString;
        } else {
            return `${
                hours ? hours + "h" : minutes ? minutes + "m" : remSeconds + "s"
            }`;
        }
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
                        <div className="text-sm text-pretty">{content}</div>
                    </div>
                </div>
            </Link>
            <div className="flex gap-3 justify-between w-[calc(100%_-_3.75rem)] self-end">
                <Button onClick={(e) => console.log(e.target)}>
                    <HiChatBubbleLeft size={18} fill="none" strokeWidth={1} />
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
