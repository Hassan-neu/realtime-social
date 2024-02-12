import User from "@/components/profile/profilePosts";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { ProfileHeader } from "@/components/profile/profileHeader";
import { HomeBar } from "@/components/shared/homeBar";
import ProfilePosts from "@/components/profile/profilePosts";
import NotFound from "@/app/not-found";
const Page = async ({ params: { username }, searchParams }) => {
    const matcher = ["followers", "following"];
    const checkMatch = matcher.some((match) => username[1] === match);
    if (!checkMatch) {
        return <NotFound />;
    }

    return (
        <div>
            <HomeBar showButton>{username[0]}</HomeBar>
            <ProfileHeader username={username[0]} />
            <ProfilePosts username={username[0]} searchParams={searchParams} />
        </div>
    );
};

export default Page;
