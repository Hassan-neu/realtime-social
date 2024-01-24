"use client";
import React, { useState } from "react";
import { Button } from "./btn";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { Avatar } from "./avatar";
export const Compose = ({ openCompose, avatar_url }) => {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
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
                        <textarea
                            name=""
                            id=""
                            className="grow h-48 resize-none text-lg p-2 focus-visible:outline-none hidescroll"
                            placeholder="What's on your mind?!"
                            maxLength={200}
                            value={content}
                            onChange={handleChange}
                        ></textarea>
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
    );
};
