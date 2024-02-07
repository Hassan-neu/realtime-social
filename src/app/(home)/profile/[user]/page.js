import User from "@/components/profile/user";
import React from "react";
export const revalidate = 0;
const Page = async ({ params: { user } }) => {
    const getProfile = async () => {
        try {
            const res = await fetch(
                `http://localhost:3000/api/auth/profile?username=${user}`
            );
            if (res.ok) {
                const data = await res.json();
                return data;
            }
        } catch (error) {
            console.log(error);
            throw new Error("Unable to fetch user profile");
        }
    };

    const userProfile = await getProfile();

    return <User profile={userProfile} />;
};

export default Page;
