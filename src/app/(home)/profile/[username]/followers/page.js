import Followers from "@/components/profile/followers";
import { HomeBar } from "@/components/shared/homeBar";
import React from "react";
export default async function Page({ params: { username } }) {
    return (
        <div>
            <HomeBar showButton>{username}</HomeBar>
            <Followers username={username} />
        </div>
    );
}
