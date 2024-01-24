"use client";
import { Button } from "@/components/shared/btn";
import { HomeBar } from "@/components/shared/homeBar";
import React, { useCallback, useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { ProfileHeader } from "@/components/profile/profileHeader";
import { TweetCard } from "@/components/shared/tweetCard";
import { EditProfile } from "@/components/profile/editProfile";
import { Spinner } from "@/components/shared/spinner";
import { resolve } from "styled-jsx/css";
const Page = ({ params: { user } }) => {
    const { back } = useRouter();
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [openEdit, setOpenEdit] = useState(false);
    const getProfile = useCallback(async () => {
        const res = await fetch(
            `http://localhost:3000/api/auth/profile?username=${user}`,
            {
                method: "GET",
            }
        );
        const data = await res.json();
        setProfile(data);
    }, [user]);
    useEffect(() => {
        try {
            setLoading(true);
            getProfile();
        } catch (error) {
            console.log(error);
            setLoading(false);
        } finally {
            new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
                setLoading(false)
            );
        }
    }, [getProfile]);

    return (
        <div className="">
            <HomeBar>
                <Button
                    className="w-9 h-9 rounded-full flex justify-center items-center hover:bg-slate-200"
                    onClick={() => back()}
                >
                    <IoArrowBack size={18} />
                </Button>
                {profile?.username}
            </HomeBar>
            <ProfileHeader
                profile={profile}
                openEdit={setOpenEdit}
                loading={loading}
            />
            <div className="flex flex-col">
                {loading ? (
                    <div className="flex justify-center mt-10">
                        <Spinner className={"w-8 h-8"} />
                    </div>
                ) : (
                    profile?.posts?.map((post) => (
                        <TweetCard
                            key={post.id}
                            post={{
                                ...post,
                                user: {
                                    username: profile?.username,
                                    full_name: profile?.full_name,
                                    avatar_url: profile?.avatar_url,
                                },
                            }}
                        />
                    ))
                )}
            </div>

            {openEdit && (
                <EditProfile openEdit={setOpenEdit} profile={profile} />
            )}
        </div>
    );
};

export default Page;
