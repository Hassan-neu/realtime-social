"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../shared/btn";
import { BsBalloon } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Avatar } from "../shared/avatar";
import { months } from "@/utils/months";
import Link from "next/link";
import { RiLinkM } from "react-icons/ri";
import { EditProfile } from "./editProfile";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
export const UserHeader = ({ serverProfile }) => {
    const searchParams = useSearchParams();
    const view = searchParams.get("view");
    const path = usePathname();
    const { replace } = useRouter();
    const [profile, setProfile] = useState(serverProfile);
    const [openEdit, setOpenEdit] = useState(false);
    const {
        id,
        created_at,
        birth_date,
        avatar_url,
        bio,
        full_name,
        username,
        website,
        followers,
        following,
        user_followed,
        is_current_user,
    } = profile;
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

    async function handleFollow() {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (user_followed) {
            const res = await fetch(
                `/api/follow?following_id=${id}&follower_id=${user.id}`,
                {
                    method: "DELETE",
                }
            );
            if (res.ok) {
                const data = await res.json();
                console.log(data);
            }
        } else {
            const res = await fetch("/api/follow", {
                method: "POST",
                body: JSON.stringify({
                    following_id: id,
                    follower_id: user.id,
                }),
            });
            if (res.ok) {
                const data = await res.json();
                console.log(data);
            }
        }
    }
    function profileTab(value) {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set("view", value);
        } else {
            params.delete("view");
        }
        params.toString();
        return replace(`${path}?${params}`);
    }
    useEffect(() => {
        const profileChannel = supabase
            .channel("realtime-profile-details")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "profiles",
                    filter: `id=eq.${id}`,
                },
                (payload) => {
                    const { new: newProfile } = payload;
                    setProfile((prev) => ({ ...prev, ...newProfile }));
                }
            )
            .subscribe();
        return () => supabase.removeChannel(profileChannel);
    }, [supabase, profile, id]);
    return (
        <>
            <div className="w-full">
                <div className="flex flex-col w-full border border-b-0">
                    <div className=" h-36 lg:min-h-52 text-2xl font-bold flex items-center justify-center">
                        <div className="text-center">
                            THIS ISN&apos;T X FORGET A COVER PHOTO
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 relative px-4 pt-3">
                        <div className="flex justify-between">
                            <Avatar
                                url={avatar_url}
                                className={
                                    "w-28 h-28 lg:w-40 lg:h-40 border-4 border-white absolute -translate-y-1/2 flex justify-center items-center"
                                }
                            />
                            <div className="ml-auto">
                                {is_current_user ? (
                                    <Button
                                        className={
                                            "px-3 flex items-center py-1 rounded-full border text-sm font-bold"
                                        }
                                        onClick={() => setOpenEdit(true)}
                                    >
                                        Edit profile
                                    </Button>
                                ) : user_followed ? (
                                    <Button
                                        className={
                                            "px-3 py-1 rounded-full border text-sm font-bold"
                                        }
                                        onClick={handleFollow}
                                    >
                                        Following
                                    </Button>
                                ) : (
                                    <Button
                                        className={
                                            "px-3 py-1 rounded-full border text-sm font-bold"
                                        }
                                        onClick={handleFollow}
                                    >
                                        Follow
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 mt-8 lg:mt-16">
                            <div className="flex flex-col ">
                                <p className="text-lg capitalize">
                                    {full_name}
                                </p>
                                <p className="text-sm">{username}</p>
                            </div>

                            <div className="text-sm">{bio}</div>
                            <div className="flex gap-2 lg:gap-4 flex-wrap">
                                {is_current_user && (
                                    <div className="text-sm flex gap-1 items-center">
                                        <BsBalloon size={16} />
                                        <span>Born {birthDate()}</span>
                                    </div>
                                )}
                                <div className="text-sm flex gap-1 items-center">
                                    <IoCalendarOutline size={16} />
                                    <span>Joined {dateCreated()}</span>
                                </div>
                                {website && (
                                    <div className="text-sm flex gap-1 items-center">
                                        <RiLinkM size={16} />
                                        <Link
                                            href={`https://${website}`}
                                            target="_blank"
                                            className="text-blue-500"
                                        >
                                            {website}
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2 text-sm">
                                <Link
                                    href={`${username}/following`}
                                    className="flex gap-1"
                                >
                                    <span className="font-bold">
                                        {following.length}
                                    </span>
                                    following
                                </Link>
                                <Link
                                    href={`${username}/followers`}
                                    className="flex gap-1"
                                >
                                    <span className="font-bold">
                                        {followers.length}
                                    </span>
                                    followers
                                </Link>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-between">
                            <Button
                                onClick={() => profileTab("")}
                                className={`border-b-4 ${
                                    view === null
                                        ? "border-blue-400"
                                        : "border-transparent"
                                }`}
                            >
                                Post
                            </Button>
                            <Button
                                onClick={() => {
                                    profileTab("media");
                                }}
                                className={`border-b-4 ${
                                    view === "media"
                                        ? "border-blue-400"
                                        : "border-transparent"
                                }`}
                            >
                                Media
                            </Button>
                            <Button
                                onClick={() => {
                                    profileTab("likes");
                                }}
                                className={`border-b-4 ${
                                    view === "likes"
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
            {openEdit && (
                <EditProfile openEdit={setOpenEdit} profile={profile} />
            )}
        </>
    );
};
