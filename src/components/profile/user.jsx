import React from "react";
import { ProfileHeader } from "./profileHeader";
import { HomeBar } from "../shared/homeBar";
import UserPosts from "./userPosts";

export default function User({ profile }) {
    const { username, posts: serverPosts, full_name, avatar_url } = profile;
    return (
        <div>
            <HomeBar showButton>{username}</HomeBar>
            <ProfileHeader serverProfile={profile} />
            <UserPosts
                serverPosts={serverPosts}
                user={{
                    username,
                    full_name,
                    avatar_url,
                }}
            />
        </div>
    );
}
