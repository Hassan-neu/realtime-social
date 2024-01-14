"use client";
import React from "react";
import { Button } from "./btn";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
export const Compose = ({ openCompose }) => {
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
                        <div className="w-14 h-14 rounded-full bg-blue-400">
                            <Image src={""} alt="profile picture" />
                        </div>
                        <textarea
                            name=""
                            id=""
                            className="grow h-48 resize-none text-lg p-2 focus-visible:outline-none hidescroll"
                            placeholder="What's on your mind?!"
                            maxLength={200}
                        ></textarea>
                    </div>
                    <div className="self-end">
                        <Button
                            className={
                                "px-5 py-1 rounded-full bg-blue-400 uppercase text-white"
                            }
                            onClick={() => alert("hello")}
                        >
                            Post
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
