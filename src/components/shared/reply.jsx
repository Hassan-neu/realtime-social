import React, { useCallback, useEffect, useState, useRef } from "react";
import { Button } from "./btn";
import { Avatar } from "./avatar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FaRegImage } from "react-icons/fa6";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
export function Reply({ id }) {
    const mediaInput = useRef();
    const supabase = createClientComponentClient();
    const [content, setContent] = useState("");
    const [avatar_url, setAvatarUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState(false);
    const [mediaFile, setMediaFile] = useState("");
    const [mediaSrc, setMediaSrc] = useState("");
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });
    function handleChange(e) {
        setContent(e.target.value);
    }
    const handlePost = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/content/", {
                method: "POST",
                body: JSON.stringify({ content, reply_to: id }),
            });
            const post = await res.json();
            console.log(post);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setContent("");
        }
    };
    const importMedia = (e) => {
        e.preventDefault();
        if (!e.target.files[0] || e.target.files.length === 0) {
            return;
        }
        const file = e.target.files[0];
        setMediaFile(file);
        console.log(file.name);
        setMediaSrc(URL.createObjectURL(file));
    };
    const getAvatar = useCallback(async () => {
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser();
        if (user) {
            const res = await fetch(
                `http://localhost:3000/api/auth/profile?id=${user.id}`
            );
            const data = await res.json();
            setAvatarUrl(data.avatar_url);
        }
    }, [supabase]);

    useEffect(() => {
        getAvatar();
    }, [getAvatar]);
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
        <div className="flex gap-2 items-center">
            <Avatar
                className={"relative w-12 h-12 border shrink-0 self-start"}
                url={avatar_url}
            />
            <div className="flex flex-col gap-2 w-full">
                <textarea
                    name=""
                    id=""
                    className="peer h-12 resize-none text-lg p-2 focus-visible:outline-none hidescroll"
                    placeholder="Write a reply"
                    maxLength={200}
                    value={content}
                    onFocus={() => setFocused(true)}
                    onChange={handleChange}
                ></textarea>
                {mediaSrc && (
                    <div className={`relative rounded-xl overflow-clip w-full`}>
                        <Image
                            src={mediaSrc}
                            alt="blank-png"
                            width={size.width}
                            height={size.height}
                            className="object-cover w-full"
                        />
                        <Button
                            className={
                                "bg-black hover:bg-opacity-70 p-1 rounded-full absolute top-0 right-0 text-white"
                            }
                            onClick={() => {
                                setMediaFile("");
                                setMediaSrc("");
                                mediaInput.current.value = "";
                            }}
                        >
                            <RxCross1 size={18} />
                        </Button>
                    </div>
                )}
                <div className="flex justify-between">
                    <div
                        className={`relative justify-center items-center self-start hover:bg-opacity-50 p-2 rounded-full ${
                            focused ? "flex" : "hidden"
                        } hover:bg-blue-400 `}
                    >
                        <input
                            ref={mediaInput}
                            type="file"
                            name="image"
                            accept="image/jpeg,image/png,image/webp"
                            className="z-30 w-6 h-6 opacity-0 appearance-none absolute"
                            onChange={importMedia}
                        />
                        <span>
                            <FaRegImage size={18} className="text-blue-400" />
                        </span>
                    </div>
                    <Button
                        className={
                            "px-4 py-1 rounded-full font-semibold bg-blue-400 text-white ml-auto"
                        }
                        onClick={handlePost}
                        disabled={loading || content}
                    >
                        {loading ? "Sending..." : "Reply"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
