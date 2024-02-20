"use client";
import React, { useState } from "react";
import { GoHomeFill, GoBookmarkFill } from "react-icons/go";
import { BiSolidUser } from "react-icons/bi";
import { MdOutlineSearch, MdNotifications } from "react-icons/md";
import Link from "next/link";
import { RiTwitterXFill } from "react-icons/ri";
import { Compose } from "../shared/compose";
import { Avatar } from "../shared/avatar";
import { TbLogout } from "react-icons/tb";
import { useSelectedLayoutSegment } from "next/navigation";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
export function SideMenu({ profile }) {
    const segment = useSelectedLayoutSegment();
    const { username, full_name, avatar_url } = profile;
    const [popup, setPopup] = useState(false);
    const [openCompose, setOpenCompose] = useState(false);
    return (
        <div className="min-h-screen px-4 hidden lg:block">
            <div className="py-4 ml-auto flex flex-col gap-3 w-3/4 h-screen sticky top-0">
                <Link
                    href={"/"}
                    className="px-3 text-2xl font-bold flex items-center"
                >
                    NOT &nbsp;
                    <RiTwitterXFill size={25} />
                </Link>
                <nav>
                    <ul className="flex flex-col items-start gap-2">
                        <li className="text-lg hover:bg-slate-200 rounded-full">
                            <Link
                                href={"/"}
                                className="flex h-full w-full gap-4 items-center pl-2 pr-6 py-2"
                            >
                                <GoHomeFill
                                    fill={`${
                                        segment === "home"
                                            ? "black"
                                            : "transparent"
                                    }`}
                                    stroke={`${
                                        segment === "home"
                                            ? "black"
                                            : "currentColor"
                                    }`}
                                    strokeWidth={1}
                                    size={30}
                                />
                                <span>Home</span>
                            </Link>
                        </li>
                        <li className="text-lg  hover:bg-slate-200  rounded-full">
                            <Link
                                href={"/search"}
                                className="flex h-full w-full gap-4 items-center pl-2 pr-6 py-2"
                            >
                                <MdOutlineSearch size={30} />
                                <span>Search</span>
                            </Link>
                        </li>

                        <li className="text-lg hover:bg-slate-200 rounded-full">
                            <Link
                                href={`/profile/${username}`}
                                className="flex w-full h-full gap-4 items-center pl-2 pr-6 py-2"
                            >
                                <BiSolidUser
                                    size={30}
                                    fill={`${
                                        segment === "profile"
                                            ? "black"
                                            : "transparent"
                                    }`}
                                    stroke={`${
                                        segment === "profile"
                                            ? "black"
                                            : "currentColor"
                                    }`}
                                    strokeWidth={1}
                                />
                                <span>Profile</span>
                            </Link>
                        </li>
                        <li className="text-lg  hover:bg-slate-200 rounded-full">
                            <Link
                                href={"/bookmarks"}
                                className="flex w-full h-full gap-4 items-center pl-2 pr-6 py-2"
                            >
                                <GoBookmarkFill
                                    size={30}
                                    fill={`${
                                        segment === "bookmark"
                                            ? "black"
                                            : "transparent"
                                    }`}
                                    stroke={`${
                                        segment === "bookmark"
                                            ? "black"
                                            : "currentColor"
                                    }`}
                                    strokeWidth={1}
                                />
                                <span>Bookmarks</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Compose avatar_url={avatar_url} />
                {/* <Button
                    className="mt-2 bg-blue-400 font-bold text-white px-3 py-3 rounded-full text-center uppercase"
                    onClick={() => setOpenCompose(true)}
                >
                    post
                </Button> */}
                <Popover>
                    <PopoverTrigger
                        asChild
                        className="mt-auto border rounded-full pl-1 py-1 hover:cursor-pointer bg-slate-900 text-slate-50"
                    >
                        <Button className="flex h-auto gap-3 items-center justify-start">
                            <Avatar
                                className={"relative w-12 h-12 border shrink-0"}
                                url={avatar_url}
                            />
                            <div className="flex flex-col items-start text-sm">
                                <span>{full_name}</span>
                                <span>{username}</span>
                            </div>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-40 border overflow-clip rounded-full"
                        align="end"
                        sideOffset={5}
                    >
                        <form
                            action="/api/auth/signout"
                            method="post"
                            className="w-full"
                        >
                            <Button className="w-full justify-start gap-2">
                                <TbLogout size={20} />
                                Log out
                            </Button>
                        </form>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
