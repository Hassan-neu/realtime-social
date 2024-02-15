"use client";
import React from "react";
import { Button } from "./btn";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

export const HomeBar = ({ children, showButton }) => {
    const { back } = useRouter();
    return (
        <div className="w-full p-2 lg:p-3 lg:py-4 lg:sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur">
            <div className="text-lg font-medium uppercase flex gap-4 items-center">
                {showButton && (
                    <Button
                        className="w-9 h-9 rounded-full flex justify-center items-center hover:bg-slate-200"
                        onClick={() => back()}
                    >
                        <IoArrowBack size={18} />
                    </Button>
                )}

                {children}
            </div>
        </div>
    );
};
