import User from "@/components/profile/profilePosts";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { ProfileHeader } from "@/components/profile/profileHeader";
import { HomeBar } from "@/components/shared/homeBar";
import ProfilePosts from "@/components/profile/profilePosts";
import ProfileLikes from "@/components/profile/profileLikes";
import { Suspense } from "react";
import ProfileLoading from "@/components/shared/profileLoading";
import TweetsLoading from "@/components/shared/tweetsLoading";
const Page = async ({ params: { username }, searchParams: { view } }) => {
    return (
        <div>
            <HomeBar showButton>{username}</HomeBar>
            <Suspense fallback={<ProfileLoading />}>
                <ProfileHeader username={username} />
            </Suspense>
            {view === "likes" ? (
                <Suspense fallback={<TweetsLoading />}>
                    <ProfileLikes username={username} />
                </Suspense>
            ) : (
                <Suspense fallback={<TweetsLoading />}>
                    <ProfilePosts username={username} />
                </Suspense>
            )}
        </div>
    );
};

export default Page;
