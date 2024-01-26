import React, { useState } from "react";
import { Button } from "./btn";
import { Avatar } from "./avatar";
export function Reply({ avatar_url }) {
    const [name, setName] = useState("Hey");
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
                placeholder="What's on your mind?!"
                maxLength={200}
            ></textarea>
            <Button
                className={
                    "px-4 py-1 rounded-full font-semibold bg-blue-400 text-white self-end"
                }
            >
                Reply
            </Button>
        </div>
    );
}
