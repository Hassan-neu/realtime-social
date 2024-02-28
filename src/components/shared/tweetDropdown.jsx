import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { Button } from "../ui/button";
import { GoTrash } from "react-icons/go";
import Link from "next/link";
export default function TweetDropdown({
    is_current_user,
    username,
    handleDelete,
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                asChild
                className="ml-auto p-0 hover:bg-transparent"
            >
                <Button variant="ghost">
                    <HiOutlineDotsHorizontal
                        size={20}
                        className="text-slate-900"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" hideWhenDetached>
                {is_current_user ? (
                    <DropdownMenuItem
                        className="text-red-500 flex gap-2"
                        onClick={handleDelete}
                    >
                        <GoTrash size={20} />
                        Delete post
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem>
                        <Link
                            href={`/profile/${username}`}
                            className="flex gap-2"
                        >
                            <AiOutlineUser size={20} />
                            User profile
                        </Link>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
