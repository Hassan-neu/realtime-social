import Link from "next/link";
import React from "react";

export default function NotFound() {
    return (
        <div className="h-dvh">
            <div className="w-full h-full flex flex-col justify-center items-center">
                <h2 className="text-xl font-medium">Not Found</h2>
                <p>Could not find requested resource</p>
                <div className="flex gap-1">
                    <span>Return</span>
                    <Link href="/" className="underline">
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
