"use client";
import { Button } from "@/components/shared/btn";
import React from "react";

export default function Error({ error: { message }, reset }) {
    return (
        <div className="flex flex-col gap-4 items-center h-dvh justify-center">
            <div className="text-xl font-bold">An error just occured </div>
            <div>
                <Button
                    onClick={() => reset()}
                    className="text-white bg-blue-500 rounded-full py-1 px-3"
                >
                    Reset
                </Button>
            </div>
        </div>
    );
}
