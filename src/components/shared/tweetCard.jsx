"use client";
import React, { useState } from "react";
import { HiChatBubbleLeft } from "react-icons/hi2";
import { GoHeartFill, GoBookmarkFill } from "react-icons/go";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./btn";
export const TweetCard = () => {
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    return (
        <div className="w-full flex flex-col gap-3 px-4 py-2 border-[0.2px] cursor-pointer hover:bg-slate-100">
            <Link scroll={false} href={"/"} className="flex gap-3 w-full">
                <div className="w-12 h-12 rounded-full border bg-blue-500">
                    <Image src={""} alt="profile-image" />
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-1 items-center">
                            <p>Name</p>
                            <p className="text-sm">username</p>
                            <p className="text-sm">4h</p>
                        </div>
                        <div className="text-sm text-pretty">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Cum nisi culpa odio voluptatem dolor
                            asperiores, atque inventore repellat. Eaque suscipit
                            nobis debitis nihil doloremque sequi dignissimos
                            totam quisquam harum culpa similique, corporis
                            voluptatibus facilis, ratione est maxime ea illo
                            impedit.
                        </div>
                    </div>
                </div>
            </Link>
            <div className="flex gap-3 justify-between w-[calc(100%_-_3.75rem)] self-end">
                <Button onClick={(e) => console.log(e.target)}>
                    <HiChatBubbleLeft size={22} fill="none" strokeWidth={1} />
                </Button>
                <Button onClick={() => setLiked(!liked)}>
                    <GoHeartFill
                        size={22}
                        fill={`${liked ? "red" : "transparent"}`}
                        stroke={`${liked ? "red" : "currentColor"}`}
                        strokeWidth={1}
                        className="transition duration-500"
                    />
                </Button>
                <Button onClick={() => setBookmarked(!bookmarked)}>
                    <GoBookmarkFill
                        size={22}
                        fill={`${
                            bookmarked ? "rgb(59 130 246)" : "transparent"
                        }`}
                        stroke={`${
                            bookmarked ? "rgb(59 130 246)" : "currentColor"
                        }`}
                        strokeWidth={1}
                        className="transition duration-500"
                    />
                </Button>
            </div>
        </div>
    );
};
