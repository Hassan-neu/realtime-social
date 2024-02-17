import User from "@/components/profile/profilePosts";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { ProfileHeader } from "@/components/profile/profileHeader";
import { HomeBar } from "@/components/shared/homeBar";
import ProfilePosts from "@/components/profile/profilePosts";
import ProfileLikes from "@/components/profile/profileLikes";
import { Suspense } from "react";
import Loading from "@/components/shared/loading";
const Page = async ({ params: { username }, searchParams: { view } }) => {
    return (
        <div>
            <HomeBar showButton>{username}</HomeBar>
            <ProfileHeader username={username} />
            {view === "likes" ? (
                <Suspense fallback={<Loading />}>
                    <ProfileLikes username={username} />
                </Suspense>
            ) : (
                <Suspense fallback={<Loading />}>
                    <ProfilePosts username={username} />
                </Suspense>
            )}
        </div>
    );
};

export default Page;
