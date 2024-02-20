import React from "react";
import Replies from "./replies";
export const revalidate = 0;
export default async function StatusReplies({ post_id: id }) {
    const getReplies = async () => {
        const res = await fetch(
            `http://localhost:3000/api/content?reply_to=${id}`
        );
        const data = res.json();
        return data;
    };
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const replies = await getReplies();

    return <Replies serverReplies={replies} reply_id={id} />;
}
