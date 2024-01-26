"use client";
import React from "react";
import { GoBookmarkFill, GoHeartFill } from "react-icons/go";
import { Button } from "./btn";
import { HiChatBubbleLeft } from "react-icons/hi2";
import Link from "next/link";
import { Avatar } from "./avatar";
import { months } from "@/utils/months";
export function TweetPost({ post }) {
    const {
        id,
        content,
        likes,
        bookmarks,
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
    return (
        <div className="w-full flex flex-col gap-3 px-4 py-2 border-[0.2px] cursor-pointer">
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
                            onClick={() => alert("Liked Button")}
                            className={"flex items-center gap-1"}
                        >
                            <GoHeartFill
                                size={18}
                                //   fill={`${liked ? "red" : "transparent"}`}
                                //   stroke={`${liked ? "red" : "currentColor"}`}
                                //   strokeWidth={1}
                                className="transition duration-500"
                            />
                            <span className="text-xs">{likes}</span>
                        </Button>
                        <Button
                            onClick={() => alert("Bookmarked Button")}
                            className={"flex items-center gap-1"}
                        >
                            <GoBookmarkFill
                                size={18}
                                //   fill={`${bookmarked ? "rgb(59 130 246)" : "transparent"}`}
                                //   stroke={`${
                                //       bookmarked ? "rgb(59 130 246)" : "currentColor"
                                //   }`}
                                //   strokeWidth={1}
                                className="transition duration-500"
                            />
                            <span className="text-xs">{bookmarks}</span>
                        </Button>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <Avatar
                        className={
                            "relative w-12 h-12 border shrink-0 self-start"
                        }
                        url={avatar_url}
                    />
                    <textarea
                        name=""
                        id=""
                        className="grow h-12 focus-visible:h-24 transition-[height] resize-none text-lg p-2 focus-visible:outline-none hidescroll"
                        placeholder="What's on your mind?!"
                        maxLength={200}
                    ></textarea>
                    <Button
                        className={
                            "px-4 py-1 rounded-full font-semibold bg-blue-400 text-white self-end"
                        }
                    >
                        Reply
                    </Button>
                </div>
            </div>
        </div>
    );
}
