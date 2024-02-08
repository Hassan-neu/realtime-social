import Tweets from "@/components/home/tweets";
import { HomeBar } from "@/components/shared/homeBar";
import { TweetCard } from "@/components/shared/tweetCard";
import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export const revalidate = 0;
async function Page() {
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
    }));
    return (
        <main className="">
            <HomeBar>
                <div className="text-2xl font-semibold">HOME</div>
            </HomeBar>
            <Tweets contents={newContents} />
        </main>
    );
}

export default Page;
