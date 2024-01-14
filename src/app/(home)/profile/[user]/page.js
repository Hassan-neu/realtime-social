"use client";
import { Button } from "@/components/shared/btn";
import { HomeBar } from "@/components/shared/homeBar";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { ProfileHeader } from "@/components/profile/profileHeader";
import { TweetCard } from "@/components/shared/tweetCard";
const Page = ({ params: { user } }) => {
    const { back } = useRouter();
    return (
        <div className="">
            <HomeBar>
                <Button
                    className="w-9 h-9 rounded-full flex justify-center items-center hover:bg-slate-200"
                    onClick={() => back()}
                >
                    <IoArrowBack size={18} />
                </Button>
                {user}
            </HomeBar>
            <ProfileHeader user={user} />
            {Array.from({ length: 6 }).map((_v, i) => (
                <TweetCard key={i} />
            ))}
        </div>
    );
};

export default Page;
