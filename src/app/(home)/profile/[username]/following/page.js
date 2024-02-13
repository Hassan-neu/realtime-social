import { Followings } from "@/components/profile/following";
import { HomeBar } from "@/components/shared/homeBar";
import React from "react";
export default async function Page({ params: { username } }) {
    return (
        <div>
            <HomeBar showButton>{username}</HomeBar>
            <Followings username={username} />
        </div>
    );
}
