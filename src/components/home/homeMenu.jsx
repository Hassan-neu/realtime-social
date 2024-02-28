import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { SideMenu } from "./sideMenu";

export default async function HomeMenu() {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
        cookies: () => cookieStore,
    });
    const getUser = async () => {
        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            const res = await fetch(
                `http://localhost:3000/api/auth/profile?id=${user.id}`
            );
            const data = await res.json();
            return data;
        } catch (error) {
            throw new Error(error);
        }
    };
    await new Promise((resolve) => setTimeout(resolve, 10000));
    const profile = await getUser();
    return <SideMenu profile={profile} />;
}
