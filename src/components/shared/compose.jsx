"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "./btn";
import Image from "next/image";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { Avatar } from "./avatar";
import { FaRegImage } from "react-icons/fa6";
export const Compose = ({ openCompose, avatar_url }) => {
    const mediaInput = useRef();
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [mediaFile, setMediaFile] = useState("");
    const [mediaSrc, setMediaSrc] = useState("");
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });
    const handleChange = (e) => {
        setContent(e.target.value);
    };
    const handlePost = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/content/", {
                method: "POST",
                body: JSON.stringify({ content }),
            });
            const post = await res.json();
            console.log(post);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setContent("");
            openCompose(false);
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
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-black  bg-opacity-50 fixed top-0 left-0 z-[60]">
            <div className="w-4/5 max-w-[600px] rounded-lg p-4 bg-white relative">
                <div className="w-full flex flex-col gap-2">
                    <div className="self-end flex justify-center items-center">
                        <Button onClick={() => openCompose(false)}>
                            <RxCross2 size={25} />
                        </Button>
                    </div>
                    <div className="flex gap-2 w-full h-full">
                        <Avatar
                            className={"relative w-14 h-14 border shrink-0"}
                            url={avatar_url}
                        />
                        <div className="flex flex-col gap-2 w-full">
                            <textarea
                                name=""
                                id=""
                                className=" resize-none text-lg p-2 focus-visible:outline-none hidescroll"
                                placeholder="What's on your mind?!"
                                maxLength={200}
                                value={content}
                                onChange={handleChange}
                            ></textarea>
                            <div className="w-full max-h-80 overflow-scroll">
                                {mediaSrc && (
                                    <div
                                        className={`relative rounded-xl overflow-clip w-full`}
                                    >
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
                            </div>

                            <div className="flex justify-between">
                                <div
                                    className={`relative flex justify-center items-center self-start hover:bg-opacity-50 p-2 rounded-full  hover:bg-blue-400 `}
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
                                        <FaRegImage
                                            size={18}
                                            className="text-blue-400"
                                        />
                                    </span>
                                </div>
                                <div className="self-end">
                                    <Button
                                        className={
                                            "px-5 py-1 rounded-full font-semibold bg-blue-400 uppercase text-white"
                                        }
                                        onClick={handlePost}
                                        disabled={loading}
                                    >
                                        {loading ? "Sending..." : "Post"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
