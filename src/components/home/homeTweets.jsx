import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import Tweets from "./tweets";
export const revalidate = 0;
export default async function HomeTweets() {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
        cookies: () => cookieStore,
    });
    const fetchContents = async () => {
        const res = await fetch("http://localhost:3000/api/content", {
            method: "GET",
        });
        const data = await res.json();
        return data;
    };
    const contents = await fetchContents();
    const getUserId = async () => {
        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            return user.id;
        } catch (error) {
            console.log(error);
        }
    };
    const userId = await getUserId();
    const newContents = contents.map((content) => ({
        ...content,
        user_liked: content.likes.find((like) => like.user_id === userId),
        user_bookmarked: content.bookmarks.find(
            (bookmark) => bookmark.user_id === userId
        ),
    }));
    return <Tweets contents={newContents} />;
}
