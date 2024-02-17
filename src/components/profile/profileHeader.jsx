import React from "react";
import { UserHeader } from "./userHeader";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export const revalidate = 0;
export const ProfileHeader = async ({ username }) => {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
        cookies: () => cookieStore,
    });
    async function getProfile() {
        try {
            const res = await fetch(
                `http://localhost:3000/api/auth/profile?username=${username}`
            );
            if (res.ok) {
                const data = await res.json();
                return data;
            }
        } catch (error) {
            console.log(error);
            throw new Error("Unable to fetch user profile");
        }
    }
    const getUserId = async () => {
        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            return user.id;
        } catch (error) {
            console.log(error);
        }
    };
    const userId = await getUserId();
    const profile = await getProfile();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const serverProfile = {
        ...profile,
        user_followed: profile.followers.find(
            (follower) => follower.follower_id === userId
        ),
        is_current_user: profile.id === userId,
    };
    return <UserHeader serverProfile={serverProfile} />;
};
