"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Spinner } from "./spinner";
import { MediaView } from "./tweetMedia";

export function Avatar({ url, className, viewable, ...props }) {
    const [avatarUrl, setAvatarUrl] = useState("");
    const supabase = createClientComponentClient();
    const [viewAvatar, setviewAvatar] = useState(false);
    useEffect(() => {
        async function downloadAvatar(path) {
            try {
                const { data, error } = await supabase.storage
                    .from("avatars")
                    .download(path);
                if (error) {
                    throw error;
                }
                const src = URL.createObjectURL(data);
                setAvatarUrl(src);
            } catch (error) {
                console.log(error);
            }
        }
        if (url) downloadAvatar(url);
    }, [url, supabase]);
    return (
        <>
            <div
                className={`${
                    className || ""
                } rounded-full bg-white overflow-clip`}
                onClick={(e) => {
                    e.stopPropagation();
                    setviewAvatar(true);
                }}
            >
                {avatarUrl ? (
                    <Image
                        src={avatarUrl}
                        alt={"avatar"}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center relative">
                        <Image
                            src="/blankavatar.png"
                            alt="no-avatar"
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
            </div>
            {viewAvatar && viewable && (
                <MediaView
                    setView={setviewAvatar}
                    mediaSrc={avatarUrl}
                    size={{ width: 200, height: 400 }}
                />
            )}
        </>
    );
}
