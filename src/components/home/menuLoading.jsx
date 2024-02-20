import Link from "next/link";
import React from "react";
import { RiTwitterXFill } from "react-icons/ri";
import { Skeleton } from "../ui/skeleton";

export default function MenuLoading() {
    return (
        <div className="min-h-screen px-4 hidden lg:block">
            <div className="py-4 ml-auto flex flex-col gap-3 w-3/4 h-screen sticky top-0">
                <Link
                    href={"/"}
                    className="px-3 text-2xl font-bold flex items-center"
                >
                    NOT &nbsp;
                    <RiTwitterXFill size={25} />
                </Link>
                <nav>
                    <ul className="flex flex-col items-start gap-2">
                        <Skeleton className="rounded-full h-12 w-full" />

                        <Skeleton className="rounded-full h-12 w-full" />

                        <Skeleton className="rounded-full h-12 w-full" />

                        <Skeleton className="rounded-full h-12 w-full" />
                    </ul>
                </nav>
                <Skeleton className="mt-2 px-3 py-3 rounded-full h-12" />
                <Skeleton className="mt-auto border rounded-full pl-1 py-1 h-12" />
            </div>
        </div>
    );
}
