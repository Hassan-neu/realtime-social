"use client";
import React from "react";
import Image from "next/image";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { Avatar } from "./avatar";
import { FaRegImage } from "react-icons/fa6";
import { useCreateMedia } from "@/utils/mediaReplyHook";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
export const Compose = ({ avatar_url }) => {
    const {
        mediaSrc,
        size,
        loading,
        content,
        mediaInput,
        onCancel,
        importMedia,
        handleChange,
        handlePost,
    } = useCreateMedia();
    return (
        <Dialog onOpenChange={(state) => !state && onCancel()}>
            <DialogTrigger
                asChild
                className="text-white py-5 rounded-full mt-2"
            >
                <Button>POST</Button>
            </DialogTrigger>
            <DialogContent className="min-w-[600px]">
                <div className="w-full flex flex-col gap-2">
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
                            <div className="w-full max-h-96 overflow-y-scroll">
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
                                                "bg-slate-900 hover:bg-opacity-7- p-1 h-auto text-xs rounded-full absolute top-0 right-0 text-slate-50"
                                            }
                                            onClick={onCancel}
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
                                            className="text-slate-900"
                                        />
                                    </span>
                                </div>
                                <div className="self-end">
                                    <Button
                                        className={
                                            "px-5 py-1 rounded-full font-semibold bg-slate-900 uppercase text-white"
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
            </DialogContent>
        </Dialog>
    );
};
