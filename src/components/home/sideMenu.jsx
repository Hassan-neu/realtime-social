"use client";
import React, { useCallback, useEffect, useState } from "react";
import { GoHome } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { CiMail, CiBookmark } from "react-icons/ci";
import { HiOutlineUser } from "react-icons/hi2";
import Link from "next/link";
import { Button } from "../shared/btn";
import { RiTwitterXFill } from "react-icons/ri";
import { UtilityCard } from "../shared/utilityCard";
import { Compose } from "../shared/compose";
export function SideMenu({ profile }) {
    const { username, full_name } = profile;
    const [popup, setPopup] = useState(false);
    const [openCompose, setOpenCompose] = useState(false);
    return (
        <div className="min-h-screen px-4">
            <div className="py-4 ml-auto flex flex-col gap-3 w-3/4 h-screen sticky top-0">
                <Link
                    href={"/"}
                    className="px-3 text-2xl font-bold flex items-center"
                >
                    NOT &nbsp;
                    <RiTwitterXFill size={25} />
                </Link>
                <nav>
                    <ul className="flex flex-col items-start">
                        <li className="text-lg hover:bg-slate-200 pl-3 pr-6 py-3 rounded-full">
                            <Link
                                href={"/"}
                                className="flex  gap-4 items-center"
                            >
                                <GoHome size={30} />
                                <span>Home</span>
                            </Link>
                        </li>
                        <li className="text-lg  hover:bg-slate-200 pl-3 pr-6 py-3 rounded-full">
                            <Link
                                href={"/search"}
                                className="flex gap-4 items-center"
                            >
                                <FiSearch size={30} />
                                <span>Search</span>
                            </Link>
                        </li>
                        <li className="text-lg hover:bg-slate-200 pl-3 pr-6 py-3 rounded-full">
                            <Link
                                href={"/notifications"}
                                className="flex gap-4 items-center"
                            >
                                <IoNotificationsOutline size={30} />
                                <span>Notifications</span>
                            </Link>
                        </li>
                        <li className="text-lg hover:bg-slate-200 pl-3 pr-6 py-3 rounded-full">
                            <Link
                                href={"/messages"}
                                className="flex gap-4 items-center"
                            >
                                <CiMail size={30} />
                                <span>Messages</span>
                            </Link>
                        </li>
                        <li className="text-lg hover:bg-slate-200 pl-3 pr-6 py-3 rounded-full">
                            <Link
                                href={`/profile/${username}`}
                                className="flex gap-4 items-center"
                            >
                                <HiOutlineUser size={30} />
                                <span>Profile</span>
                            </Link>
                        </li>
                        <li className="text-lg  hover:bg-slate-200 pl-3 pr-6 py-3 rounded-full">
                            <Link
                                href={"/bookmark"}
                                className="flex gap-4 items-center"
                            >
                                <CiBookmark size={30} />
                                <span>Bookmarks</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Button
                    className="bg-blue-400 font-bold text-white px-3 py-3 rounded-full text-center uppercase"
                    onClick={() => setOpenCompose(true)}
                >
                    post
                </Button>
                <UtilityCard
                    className={`relative min-w-full mt-auto h-20 border bg-white shadow rounded-lg transition ${
                        popup ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <div className="w-full h-full rounded-md bg-white flex flex-col py-3">
                        <form
                            action="/api/auth/signout"
                            method="post"
                            className="w-full"
                        >
                            <Button className={"w-full p-3 hover:bg-slate-200"}>
                                Log out
                            </Button>
                        </form>
                    </div>
                    <span className="w-4 h-4 rotate-45 absolute top-full -translate-y-1/2 left-1/2 bg-white -translate-x-1/2 shadow -z-10"></span>
                </UtilityCard>
                <Button
                    className={
                        "flex gap-3 items-center hover:bg-slate-200 pl-3 pr-6 py-3 rounded-full relative"
                    }
                    onClick={() => setPopup(!popup)}
                >
                    <div className="w-12 h-12 rounded-full border bg-blue-500"></div>
                    <div className="flex flex-col items-start text-sm">
                        <span>{full_name}</span>
                        <span>{username}</span>
                    </div>
                </Button>
            </div>
            {openCompose && <Compose openCompose={setOpenCompose} />}
        </div>
    );
}
