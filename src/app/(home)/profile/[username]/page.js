import User from "@/components/profile/profilePosts";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { ProfileHeader } from "@/components/profile/profileHeader";
import { HomeBar } from "@/components/shared/homeBar";
import ProfilePosts from "@/components/profile/profilePosts";
import Followers from "@/components/profile/follower";
const Page = async ({ params: { username }, searchParams }) => {
    return (
        <div>
            <HomeBar showButton>{username}</HomeBar>
            <ProfileHeader username={username} />
            <ProfilePosts username={username} searchParams={searchParams} />
        </div>
    );
};

export default Page;
