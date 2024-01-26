import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./btn";
import { Avatar } from "./avatar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export function Reply({ id }) {
    const supabase = createClientComponentClient();
    const [content, setContent] = useState("");
    const [avatar_url, setAvatarUrl] = useState("");
    const [loading, setLoading] = useState(false);
    function handleChange(e) {
        setContent(e.target.value);
    }
    const handlePost = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/content/", {
                method: "POST",
                body: JSON.stringify({ content, reply_to: id }),
            });
            const post = await res.json();
            console.log(post);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setContent("");
        }
    };
    const getAvatar = useCallback(async () => {
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser();
        if (user) {
            const res = await fetch(
                `http://localhost:3000/api/auth/profile?id=${user.id}`
            );
            const data = await res.json();
            setAvatarUrl(data.avatar_url);
        }
    }, [supabase]);

    useEffect(() => {
        getAvatar();
    }, [getAvatar]);
    return (
        <div className="flex gap-2 items-center">
            <Avatar
                className={"relative w-12 h-12 border shrink-0 self-start"}
                url={avatar_url}
            />
            <textarea
                name=""
                id=""
                className="grow h-12 focus-visible:h-24 transition-[height] resize-none text-lg p-2 focus-visible:outline-none hidescroll"
                placeholder="Write a reply"
                maxLength={200}
                value={content}
                onChange={handleChange}
            ></textarea>
            <Button
                className={
                    "px-4 py-1 rounded-full font-semibold bg-blue-400 text-white self-end"
                }
                onClick={handlePost}
                disabled={loading}
            >
                {loading ? "Sending..." : "Reply"}
            </Button>
        </div>
    );
}
