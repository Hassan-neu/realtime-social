"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../shared/btn";
import { BsBalloon, BsCalendar3 } from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { Avatar } from "../shared/avatar";
export const ProfileHeader = ({ profile, openEdit }) => {
    const [active, setActive] = useState("post");
    const [isActiveUser, setIsActiveUser] = useState(false);
    const supabase = createClientComponentClient();
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
    const createDate = new Date(profile?.created_at);
    const birthDate = new Date(profile?.birth_date);
    const createdAt = `${
        months[createDate.getMonth()]
    } ${createDate.getFullYear()}`;
    const birthString = `${
        months[birthDate.getMonth()]
    } ${birthDate.getDate()}, ${birthDate.getFullYear()}`;
    const fetchCurrUser = useCallback(async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (user.id === profile.id) {
            setIsActiveUser(true);
        }
    }, [supabase, profile]);
    useEffect(() => {
        fetchCurrUser();
    }, [fetchCurrUser]);
    return (
        <div className="w-full">
            <div className="flex flex-col w-full border border-b-0">
                <div className="bg-blue-400 min-h-52 ">COVER PHOTO</div>
                <div className="flex flex-col gap-4 relative px-4 pt-3">
                    <div className="flex justify-between">
                        <Avatar
                            url={profile?.avatar_url}
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
                    <div className="flex flex-col gap-2 mt-16">
                        <div className="flex flex-col ">
                            <p className="text-lg capitalize">
                                {profile?.full_name}
                            </p>
                            <p className="text-sm">{profile?.username}</p>
                        </div>

                        <div className="text-sm">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Suscipit porro possimus dolores facere
                            deleniti ipsum accusantium voluptate officia et
                            consequatur.
                        </div>
                        <div className="flex gap-4">
                            {isActiveUser && (
                                <div className="text-sm flex gap-1 items-center">
                                    <BsBalloon size={16} />
                                    <span>Born {birthString}</span>
                                </div>
                            )}
                            <div className="text-sm flex gap-1 items-center">
                                <BsCalendar3 size={16} />
                                <span>Joined {createdAt}</span>
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
