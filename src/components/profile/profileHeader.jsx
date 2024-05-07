import React from "react";
import { UserHeader } from "./userHeader";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { toast } from "../ui/use-toast";
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
            } else {
                throw new Error("Unable to fetch user profile");
            }
        } catch (error) {
            console.log(error);
            toast({
                description: error.message,
                variant: "destructive",
            });
        }
    }
    const getUserId = async () => {
        try {
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();
            if (user) {
                return user.id;
            } else {
                throw error;
            }
        } catch (error) {
            console.log(error);
            toast({
                description: error.message,
                variant: "destructive",
            });
        }
    };
    const userId = await getUserId();
    const profile = await getProfile();
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const serverProfile = {
        ...profile,
        user_followed: profile.followers.some(
            (follower) => follower.follower_id === userId
        ),
        followers_length: profile.followers.length,
        following_length: profile.following.length,
        is_current_user: profile.id === userId,
    };
    return <UserHeader serverProfile={serverProfile} />;
};
