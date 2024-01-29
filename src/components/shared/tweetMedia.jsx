import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useCreateMedia } from "@/utils/mediaReplyHook";
export function TweetMedia({ url }) {
    const { supabase } = useCreateMedia();
    const [mediaSrc, setMediaSrc] = useState("");
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });
    useEffect(() => {
        const getMedia = async (path) => {
            try {
                const { data, error } = await supabase.storage
                    .from("media")
                    .download(path);
                if (error) {
                    throw error;
                }
                const src = URL.createObjectURL(data);
                setMediaSrc(src);
            } catch (error) {
                console.log(error);
            }
        };
        if (url) getMedia(url);
    }, [supabase, url]);
    useEffect(() => {
        const setImageSize = (imageUrl) => {
            const img = new window.Image();
            img.src = imageUrl;
            img.onload = () => {
                setSize({ height: img.height, width: img.width });
            };
        };
        if (mediaSrc) setImageSize(mediaSrc);
    }, [mediaSrc]);
    return (
        <div className="w-full">
            {mediaSrc && (
                <div
                    className={`relative rounded-xl overflow-clip w-full h-96`}
                >
                    <Image
                        src={mediaSrc}
                        alt="blank-png"
                        fill
                        className="object-cover w-full"
                    />
                </div>
            )}
            <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 z-50"></div>
        </div>
    );
}
