import React from "react";
import { ProfileHeader } from "@/components/profile/profileHeader";
import { HomeBar } from "@/components/shared/homeBar";
import ProfilePosts from "@/components/profile/profilePosts";
import { Suspense } from "react";
import ProfileLoading from "@/components/shared/profileLoading";
import TweetsLoading from "@/components/shared/tweetsLoading";

const Page = async ({ params: { username }, searchParams }) => {
    return (
        <div>
            <HomeBar showButton>{username}</HomeBar>
            <Suspense fallback={<ProfileLoading />}>
                <ProfileHeader username={username} />
            </Suspense>
            <Suspense fallback={<TweetsLoading />}>
                <ProfilePosts username={username} searchParams={searchParams} />
            </Suspense>
        </div>
    );
};

export default Page;
