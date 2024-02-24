"use client";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { FiLoader } from "react-icons/fi";
export const EditProfile = ({ profile }) => {
    const { avatar_url, username, bio, website, birth_date } = profile;
    const supabase = createClientComponentClient();
    const [openDialog, setOpenDialog] = useState(false);
    const [user, setUser] = useState({
        username,
        avatar_url,
        bio,
        website,
        birth_date: birth_date.split("T")[0],
    });
    const [avatarSrc, setAvatarSrc] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState("");
    const [imageSrc, setImageSrc] = useState("");
    useEffect(() => {
        async function downloadAvatar(path) {
            try {
                const { data, error } = await supabase.storage
                    .from("avatars")
                    .download(path);
                if (error) {
                    throw error;
                }
                const src = URL.createObjectURL(data);
                setAvatarSrc(src);
            } catch (error) {
                console.log("Error downloading avatar", error);
            }
        }
        if (avatar_url) downloadAvatar(avatar_url);
    }, [supabase, avatar_url]);

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
        setImageFile(file);
        setImageSrc(URL.createObjectURL(file));
    };
    const handleUpdate = async () => {
        try {
            setLoading(true);
            if (imageFile) {
                const fileExt = imageFile.name.split(".").pop();
                const filePath = `${username}-${Date.now()}.${fileExt}`;
                const { error } = await supabase.storage
                    .from("avatars")
                    .upload(filePath, imageFile);
                if (error) {
                    throw error;
                }
                const res = await fetch("/api/auth/profile", {
                    method: "PUT",
                    body: JSON.stringify({ ...user, avatar_url: filePath }),
                });
                const data = await res.json();
                console.log(data);
            } else {
                const res = await fetch("/api/auth/profile", {
                    method: "PUT",
                    body: JSON.stringify(user),
                });
                const data = await res.json();
                console.log(data);
                setOpenDialog(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Dialog
            open={openDialog}
            onOpenChange={(state) => {
                setOpenDialog(!openDialog);
            }}
        >
            <DialogTrigger asChild className="rounded-full">
                <Button> Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="flex justify-center items-center w-[600px] h-[650px]">
                <div className="flex flex-col items-center justify-center gap-3 w-3/4">
                    <div className="flex justify-between w-full">
                        <div className="text-lg font-semibold">
                            <h2>Edit Profile</h2>
                        </div>
                    </div>
                    <div className="flex flex-col w-40 h-40 items-center self-start relative">
                        <div className="w-40 h-40 rounded-full bg-blue-300 relative overflow-clip">
                            {avatarSrc && (
                                <Image
                                    src={avatarSrc}
                                    alt={"avatar"}
                                    fill
                                    className="object-cover object-top"
                                />
                            )}
                            {imageSrc && (
                                <Image
                                    src={imageSrc}
                                    alt={"avatar"}
                                    fill
                                    className="object-cover object-top"
                                />
                            )}
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
                            className="border-slate-200 border rounded-md flex flex-col"
                        >
                            <span className="text-xs font-semibold px-2 pt-1">
                                Username
                            </span>
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
                            className="border-slate-200 border rounded-md flex flex-col"
                        >
                            <span className="text-xs font-semibold px-2 pt-1">
                                Bio
                            </span>
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
                            className="border-slate-200 border rounded-md flex flex-col"
                        >
                            <span className="text-xs font-semibold px-2 pt-1">
                                Website
                            </span>
                            <input
                                type="url"
                                name="website"
                                id="website"
                                className="h-8 bg-transparent text-sm rounded px-2 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none"
                                placeholder="Website"
                                value={user.website}
                                onChange={handleChange}
                            />
                        </label>
                        <label
                            htmlFor="birth_date"
                            className="border-slate-200 border rounded flex flex-col"
                        >
                            <span className="text-xs font-semibold px-2 pt-1">
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
                            className={`px-3 py-1 rounded-full text-base self-stretch h-9`}
                            onClick={handleUpdate}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex gap-1 w-full items-center justify-center">
                                    <FiLoader
                                        size={20}
                                        className="animate-spin"
                                    />
                                    Saving...
                                </div>
                            ) : (
                                <div className="w-full">Save</div>
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
