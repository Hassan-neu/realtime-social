"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export function Avatar({ url, className }) {
    const [avatarUrl, setAvatarUrl] = useState("");
    const supabase = createClientComponentClient();

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
        <div
            className={`${
                className || ""
            } rounded-full bg-blue-300 overflow-clip`}
        >
            {avatarUrl && (
                <Image
                    src={avatarUrl}
                    alt={"avatar"}
                    fill
                    className="object-cover object-top"
                />
            )}
        </div>
    );
}