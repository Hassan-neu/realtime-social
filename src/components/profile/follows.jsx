import Link from "next/link";
import React from "react";
import { Avatar } from "../shared/avatar";
export function Follows({ follows }) {
    const { username, avatar_url, full_name, bio } = follows;
    return (
        <div className="w-full flex flex-col gap-3 px-4 py-2 border-[0.2px] cursor-pointer hover:bg-slate-100">
            <Link href={`/profile/${username}`} className="flex gap-3 w-full">
                <Avatar
                    className={"relative w-12 h-12 border shrink-0"}
                    url={avatar_url}
                />
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-col gap-1">
                            <p>{full_name}</p>
                            <p className="text-sm">{username}</p>
                        </div>

                        <div className="text-sm text-pretty">{bio}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
