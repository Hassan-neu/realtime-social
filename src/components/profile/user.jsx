"use client";
import React, { useState } from "react";
import { TweetCard } from "../shared/tweetCard";
import { EditProfile } from "./editProfile";
import { ProfileHeader } from "./profileHeader";
import { IoArrowBack } from "react-icons/io5";
import { Button } from "../shared/btn";
import { HomeBar } from "../shared/homeBar";
import { useRouter } from "next/navigation";

export default function User({ profile }) {
    const { username, posts, full_name, avatar_url } = profile;
    const { back } = useRouter();
    const [openEdit, setOpenEdit] = useState(false);
    return (
        <div className="">
            <HomeBar>
                <Button
                    className="w-9 h-9 rounded-full flex justify-center items-center hover:bg-slate-200"
                    onClick={() => back()}
                >
                    <IoArrowBack size={18} />
                </Button>
                {username}
            </HomeBar>
            <ProfileHeader profile={profile} openEdit={setOpenEdit} />
            <div className="flex flex-col">
                {posts?.map((post) => (
                    <TweetCard
                        key={post.id}
                        post={{
                            ...post,
                            user: {
                                username,
                                full_name,
                                avatar_url,
                            },
                        }}
                    />
                ))}
            </div>

            {openEdit && (
                <EditProfile openEdit={setOpenEdit} profile={profile} />
            )}
        </div>
    );
}
