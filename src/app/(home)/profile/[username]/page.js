import User from "@/components/profile/profilePosts";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { ProfileHeader } from "@/components/profile/profileHeader";
import { HomeBar } from "@/components/shared/homeBar";
import ProfilePosts from "@/components/profile/profilePosts";
import ProfileLikes from "@/components/profile/profileLikes";
const Page = async ({ params: { username }, searchParams: { view } }) => {
    return (
        <div>
            <HomeBar showButton>{username}</HomeBar>
            <ProfileHeader username={username} />
            {view === "likes" ? (
                <ProfileLikes username={username} />
            ) : (
                <ProfilePosts username={username} />
            )}
        </div>
    );
};

export default Page;
