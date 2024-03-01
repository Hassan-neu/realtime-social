"use client";
import React, { startTransition } from "react";
import { HiChatBubbleLeft } from "react-icons/hi2";
import { GoHeartFill, GoBookmarkFill } from "react-icons/go";
import Link from "next/link";
import { Button } from "./btn";
import { Avatar } from "./avatar";
import { months } from "@/utils/months";
import { TweetMedia } from "./tweetMedia";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import TweetDropdown from "./tweetDropdown";
export const TweetCard = ({ post, addOptimisticPost, setNewPosts }) => {
    // const { refresh, push } = useRouter();
    const supabase = createClientComponentClient();
    const {
        id,
        content,
        media_url,
        likes_length,
        bookmarks_length,
        user_liked,
        user_bookmarked,
        created_at,
        reply_length,
        is_current_user,
        user: { full_name, username, avatar_url },
    } = post;
    const getDate = () => {
        let remSeconds;
        const currYear = new Date(Date.now()).getFullYear();
        const toSeconds = Math.round(
            (Date.now() - new Date(created_at).getTime()) / 1000
        );
        const hours = Math.floor(toSeconds / 3600);
        remSeconds = toSeconds % 3600;
        const minutes = Math.floor(remSeconds / 60);
        remSeconds = remSeconds % 60;

        if (hours > 24) {
            const date = new Date(created_at);
            const month = months[date.getMonth()].slice(0, 3);
            const day = date.getDate();
            const year = date.getFullYear();
            const createdString = `${month} ${day}${
                year == currYear ? "" : ","
            } ${year == currYear ? "" : year}`;
            return createdString;
        } else {
            return `${
                hours ? hours + "h" : minutes ? minutes + "m" : remSeconds + "s"
            }`;
        }
    };
    const handleLike = async () => {
        try {
            let optimisticUpdate;
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (user_liked) {
                optimisticUpdate = {
                    ...post,
                    user_liked: false,
                    likes_length: likes_length - 1,
                };
                await supabase
                    .from("likes")
                    .delete()
                    .match({ post_id: id, user_id: user.id });
            } else {
                optimisticUpdate = {
                    ...post,
                    user_liked: true,
                    likes_length: likes_length + 1,
                };
                await supabase
                    .from("likes")
                    .insert({ post_id: id, user_id: user.id });
            }
            startTransition(() => addOptimisticPost(optimisticUpdate));
            setNewPosts((prev) =>
                prev.map((post) => (post.id === id ? optimisticUpdate : post))
            );
        } catch (error) {
            setNewPosts((prev) =>
                prev.map((old) => (old.id === id ? { ...old, ...post } : old))
            );
            console.error(error);
        }
    };
    const handleBookmark = async () => {
        try {
            let optimisticUpdate;
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (user_bookmarked) {
                optimisticUpdate = {
                    ...post,
                    user_bookmarked: false,
                    bookmarks_length: bookmarks_length - 1,
                };
                await supabase
                    .from("bookmarks")
                    .delete()
                    .match({ post_id: id, user_id: user.id });
            } else {
                optimisticUpdate = {
                    ...post,
                    user_bookmarked: true,
                    bookmarks_length: bookmarks_length + 1,
                };
                await supabase
                    .from("bookmarks")
                    .insert({ post_id: id, user_id: user.id });
            }
            startTransition(() => addOptimisticPost(optimisticUpdate));
            setNewPosts((prev) =>
                prev.map((post) => (post.id === id ? optimisticUpdate : post))
            );
        } catch (error) {
            setNewPosts((prev) =>
                prev.map((old) => (old.id === id ? { ...old, ...post } : old))
            );
            console.error(error);
        }
    };
    const handleDelete = async () => {
        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            await supabase
                .from("posts")
                .delete()
                .match({ id, user_id: user.id });
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    };
    return (
        <div className="w-full flex flex-col gap-3 px-4 py-2 border-[0.2px] cursor-pointer hover:bg-slate-100">
            <Link href={`/status/${id}`} className="flex gap-3 w-full">
                <Avatar
                    className={"relative w-12 h-12 border shrink-0"}
                    url={avatar_url}
                    viewable
                />
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-1 items-center">
                            <p>{full_name}</p>
                            <p className="text-sm">&#64;{username}</p>
                            <span className="w-1 h-1 inline-block mx-0.5 rounded-full bg-black"></span>
                            <p className="text-sm">{getDate()}</p>
                            <TweetDropdown
                                is_current_user={is_current_user}
                                username={username}
                                handleDelete={handleDelete}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="text-sm text-pretty">{content}</div>
                            {media_url && <TweetMedia url={media_url} />}
                        </div>
                    </div>
                </div>
            </Link>
            <div className="flex gap-3 justify-between w-[calc(100%_-_3.75rem)] self-end">
                <Button
                    onClick={(e) => console.log(e.target)}
                    className={"flex items-center gap-1"}
                >
                    <HiChatBubbleLeft size={18} fill="none" strokeWidth={1} />
                    <span className="text-xs">{reply_length}</span>
                </Button>
                <Button
                    onClick={handleLike}
                    className={"flex items-center gap-1"}
                >
                    <GoHeartFill
                        size={18}
                        fill={`${user_liked ? "red" : "transparent"}`}
                        stroke={`${user_liked ? "red" : "currentColor"}`}
                        strokeWidth={1}
                        className="transition duration-500"
                    />
                    <span
                        className={`text-xs ${
                            user_liked ? "text-red-500" : "text-black"
                        }`}
                    >
                        {likes_length}
                    </span>
                </Button>
                <Button
                    onClick={handleBookmark}
                    className={"flex items-center gap-1"}
                >
                    <GoBookmarkFill
                        size={18}
                        fill={`${
                            user_bookmarked ? "rgb(15 23 42)" : "transparent"
                        }`}
                        stroke={`${
                            user_bookmarked ? "rgb(15 23 42)" : "currentColor"
                        }`}
                        strokeWidth={1}
                        className="transition duration-500"
                    />
                    <span className="text-xs">{bookmarks_length}</span>
                </Button>
            </div>
        </div>
    );
};
