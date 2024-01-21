"use client";
import React, { useState } from "react";
import { Button } from "../shared/btn";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { MdOutlineAddAPhoto } from "react-icons/md";
export const EditProfile = ({ openEdit }) => {
    const [user, setUser] = useState({
        username: "",
        avatar_url: "",
        bio: "",
        website: "",
        birth_date: "",
    });
    const [avatar, setAvatarUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSetAvatar = (e) => {
        e.preventDefault();
        if (!e.target.files || e.target.files.length === 0) {
            throw new Error("Select image to upload");
        }
        const file = e.target.files[0];
        const fileExt = file.name.split(".").pop();
        const filePath = `${username}-avatar.${fileExt}`;
        setUser((prev) => ({
            ...prev,
            avatar_url: file,
        }));
        setAvatarUrl(URL.createObjectURL(file));
    };
    const handleUpdate = async () => {
        try {
            const res = await fetch("/api/auth/profile", {
                method: "POST",
                body: JSON.stringify(user),
            });
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-slate-200 bg-opacity-50 fixed top-0 left-0 z-[60]">
            <div className="flex justify-center items-center w-[600px] h-[650px] px-4 py-2 bg-white rounded-2xl">
                <div className="flex flex-col items-center justify-center gap-3 w-3/4">
                    <div className="flex justify-between w-full">
                        <div className="text-lg font-semibold">
                            <h2>Edit Profile</h2>
                        </div>
                        <Button onClick={() => openEdit(false)}>
                            <RxCross2 size={25} />
                        </Button>
                    </div>
                    <div className="flex flex-col w-40 h-40 items-center self-start relative">
                        <div className="w-40 h-40 rounded-full bg-blue-300 relative overflow-clip">
                            <Image
                                src={avatar}
                                alt={"avatar"}
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center absolute top-1/2 -translate-y-1/2 rounded-full hover:bg-slate-200 w-10 h-10">
                            <input
                                type="file"
                                id="avatar"
                                accept="image/*"
                                className="z-30 appearance-none absolute w-6 h-6 opacity-0"
                                onChange={handleSetAvatar}
                            />

                            <MdOutlineAddAPhoto size={25} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 w-full">
                        <label
                            htmlFor="username"
                            className="border-slate-200 border-2 rounded flex flex-col"
                        >
                            <span className="text-xs px-2 pt-1">Username</span>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="h-8 bg-transparent text-sm rounded px-2 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none focus-visible:bg-transparent"
                                placeholder="Username"
                                value={user.username}
                                onChange={handleChange}
                            />
                        </label>
                        <label
                            htmlFor="bio"
                            className="border-slate-200 border-2 rounded flex flex-col"
                        >
                            <span className="text-xs px-2 pt-1">Bio</span>
                            <textarea
                                type="text"
                                name="bio"
                                id="bio"
                                className="h-20 bg-transparent text-sm rounded px-2 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none focus-visible:bg-transparent resize-none"
                                placeholder="Bio"
                                value={user.bio}
                                onChange={handleChange}
                            />
                        </label>
                        <label
                            htmlFor="website"
                            className="border-slate-200 border-2 rounded flex flex-col"
                        >
                            <span className="text-xs px-2 pt-1">Website</span>
                            <input
                                type="url"
                                name="website"
                                id="website"
                                className="h-8 bg-transparent text-sm rounded px-2 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none"
                                placeholder="Username"
                                value={user.website}
                                onChange={handleChange}
                            />
                        </label>
                        <label
                            htmlFor="birth_date"
                            className="border-slate-200 border-2 rounded flex flex-col"
                        >
                            <span className="text-xs px-2 pt-1">
                                Date of Birth
                            </span>
                            <input
                                type="date"
                                name="birth_date"
                                id="birth_date"
                                className="h-8 bg-transparent text-sm rounded px-2 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none"
                                value={user.birth_date}
                                onChange={handleChange}
                            />
                        </label>
                        <Button
                            className={`px-3 py-1 bg-blue-500 rounded-full self-stretch text-white h-9`}
                            onClick={handleUpdate}
                        >
                            {loading ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
