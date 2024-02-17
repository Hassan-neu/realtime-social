import React from "react";
import { Spinner } from "./spinner";

export default function Loading() {
    return (
        <div className="w-full">
            <div className="p-4 flex flex-col gap-3 items-center">
                <Spinner />
                <div>Loading...</div>
            </div>
        </div>
    );
}
