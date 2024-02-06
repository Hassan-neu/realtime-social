"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../shared/btn";
import { BsBalloon, BsCalendar3 } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Avatar } from "../shared/avatar";
import { Spinner } from "../shared/spinner";
import { months } from "@/utils/months";
import { IoIosLink } from "react-icons/io";
import Link from "next/link";
import { RiLinkM } from "react-icons/ri";
export const ProfileHeader = ({ profile, openEdit }) => {
    const {
        id,
        created_at,
        birth_date,
        avatar_url,
        bio,
        full_name,
        username,
        website,
    } = profile;
    const [active, setActive] = useState("post");
    const [isActiveUser, setIsActiveUser] = useState(false);
    const supabase = createClientComponentClient();
    function birthDate() {
        const date = new Date(birth_date);
        const birthday = `${
            months[date.getMonth()]
        } ${date.getDate()}, ${date.getFullYear()}`;
        return birthday;
    }
    function dateCreated() {
        const date = new Date(created_at);
        const dateString = `${months[date.getMonth()]} ${date.getFullYear()}`;
        return dateString;
    }
    const fetchCurrUser = useCallback(async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (user.id === id) {
            setIsActiveUser(true);
        }
    }, [supabase, id]);
    useEffect(() => {
        fetchCurrUser();
    }, [fetchCurrUser]);
    return (
        <div className="w-full">
            <div className="flex flex-col w-full border border-b-0">
                <div className="bg-blue-400 min-h-52 text-4xl"></div>
                <div className="flex flex-col gap-4 relative px-4 pt-3">
                    <div className="flex justify-between">
                        <Avatar
                            url={avatar_url}
                            className={
                                "w-40 h-40 border-4 border-white absolute -translate-y-1/2 flex justify-center items-center"
                            }
                        />
                        <div className="ml-auto">
                            {isActiveUser ? (
                                <Button
                                    className={
                                        "px-3 flex items-center py-1 rounded-full border text-sm font-bold"
                                    }
                                    onClick={() => openEdit(true)}
                                >
                                    Edit profile
                                </Button>
                            ) : (
                                <Button
                                    className={
                                        "px-3 py-1 rounded-full border text-sm font-bold"
                                    }
                                >
                                    Following
                                </Button>
                            )}
                        </div>
                    </div>
                    {
                        <div className="flex flex-col gap-2 mt-16">
                            <div className="flex flex-col ">
                                <p className="text-lg capitalize">
                                    {full_name}
                                </p>
                                <p className="text-sm">{username}</p>
                            </div>

                            <div className="text-sm">{bio}</div>
                            <div className="flex gap-4">
                                {isActiveUser && (
                                    <div className="text-sm flex gap-1 items-center">
                                        <BsBalloon size={16} />
                                        <span>Born {birthDate()}</span>
                                    </div>
                                )}
                                <div className="text-sm flex gap-1 items-center">
                                    <IoCalendarOutline size={16} />
                                    <span>Joined {dateCreated()}</span>
                                </div>
                                <div className="text-sm flex gap-1 items-center">
                                    <RiLinkM size={16} />
                                    <Link
                                        href={`https://${website}`}
                                        target="_blank"
                                        className="text-blue-600"
                                    >
                                        {website}
                                    </Link>
                                </div>
                            </div>
                            <div className="flex gap-2 text-sm">
                                <div className="flex gap-1">
                                    <span className="font-bold">0</span>
                                    following
                                </div>
                                <div className="flex gap-1">
                                    <span className="font-bold">0</span>
                                    followers
                                </div>
                            </div>
                        </div>
                    }
                    <div className="flex gap-3 justify-between">
                        <Button
                            onClick={() => setActive("post")}
                            className={`border-b-4 ${
                                active == "post"
                                    ? "border-blue-400"
                                    : "border-transparent"
                            }`}
                        >
                            Post
                        </Button>
                        <Button
                            onClick={() => setActive("media")}
                            className={`border-b-4 ${
                                active == "media"
                                    ? "border-blue-400"
                                    : "border-transparent"
                            }`}
                        >
                            Media
                        </Button>
                        <Button
                            onClick={() => setActive("bookmarks")}
                            className={`border-b-4 ${
                                active == "bookmarks"
                                    ? "border-blue-400"
                                    : "border-transparent"
                            }`}
                        >
                            Boomarks
                        </Button>
                        <Button
                            onClick={() => setActive("likes")}
                            className={`border-b-4 ${
                                active == "likes"
                                    ? "border-blue-400"
                                    : "border-transparent"
                            }`}
                        >
                            Likes
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
