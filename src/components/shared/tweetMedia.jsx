import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useCreateMedia } from "@/utils/mediaReplyHook";
import { Button } from "./btn";
import { RxCross1 } from "react-icons/rx";
export function TweetMedia({ url }) {
    const [view, setView] = useState(false);
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
                    onClick={() => setView(true)}
                >
                    <Image
                        src={mediaSrc}
                        alt="blank-png"
                        fill
                        className="object-cover w-full"
                    />
                </div>
            )}
            {view && (
                <MediaView setView={setView} mediaSrc={mediaSrc} size={size} />
            )}
        </div>
    );
}

export function MediaView({ setView, mediaSrc, size, className }) {
    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen bg-black  z-50 flex justify-center items-center`}
        >
            <div className={`relative`}>
                <Image
                    src={mediaSrc}
                    alt="blank-png"
                    width={size?.width}
                    height={size?.height / 2}
                    className="object-cover"
                />
            </div>
            <Button
                className={
                    "bg-black hover:bg-opacity-70 p-1 rounded-full absolute top-5 left-5 text-white z-10"
                }
                onClick={() => setView(false)}
            >
                <RxCross1 size={18} />
            </Button>
        </div>
    );
}
