"use client";
import React, { useState } from "react";
import { Button } from "../shared/btn";

export const ProfileHeader = ({ user }) => {
    const [active, setActive] = useState("post");
    return (
        <div className="w-full">
            <div className="flex flex-col w-full border border-b-0">
                <div className="bg-blue-400 min-h-52 ">COVER PHOTO</div>
                <div className="flex flex-col gap-4 relative px-4 pt-3">
                    <div className="flex justify-between">
                        <div className="w-40 h-40 rounded-full border-4 border-white flex justify-center items-center bg-blue-300 absolute -translate-y-1/2">
                            PF
                        </div>
                        <div className="ml-auto">
                            <Button
                                className={
                                    "px-3 py-1 rounded-full border text-sm font-bold"
                                }
                            >
                                <p>Following</p>
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-16">
                        <div className="text-xl capitalize font-bold">
                            {user}
                        </div>
                        <div className="text-sm font-medium">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Suscipit porro possimus dolores facere
                            deleniti ipsum accusantium voluptate officia et
                            consequatur.
                        </div>
                        <div className="text-sm">created on today</div>
                        <div className="flex gap-2 text-sm">
                            <div className="flex gap-1">
                                <span className="font-bold">0</span>
                                following
                            </div>
                            <div className="flex gap-1">
                                <span className="font-bold">0</span>
                                followers
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 justify-between">
                        <Button
                            onClick={() => setActive("post")}
                            className={`border-b-4 ${
                                active == "post"
                                    ? "border-blue-400"
                                    : "border-transparent"
                            }`}
                        >
                            Post
                        </Button>
                        <Button
                            onClick={() => setActive("media")}
                            className={`border-b-4 ${
                                active == "media"
                                    ? "border-blue-400"
                                    : "border-transparent"
                            }`}
                        >
                            Media
                        </Button>
                        <Button
                            onClick={() => setActive("bookmarks")}
                            className={`border-b-4 ${
                                active == "bookmarks"
                                    ? "border-blue-400"
                                    : "border-transparent"
                            }`}
                        >
                            Boomarks
                        </Button>
                        <Button
                            onClick={() => setActive("likes")}
                            className={`border-b-4 ${
                                active == "likes"
                                    ? "border-blue-400"
                                    : "border-transparent"
                            }`}
                        >
                            Likes
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
