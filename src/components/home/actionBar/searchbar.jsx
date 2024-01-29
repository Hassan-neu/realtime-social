"use client";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
export const Searchbar = ({ sear }) => {
    const [focused, setFocused] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        params.set("query", e.target[0].value);
        params.toString();
        return replace(`${pathname}?${params}`);
    };
    return (
        <div className="py-4 sticky top-0 bg-white w-full z-50">
            <form
                onSubmit={handleSearch}
                className={`flex gap-3 items-center overflow-clip rounded-full bg-slate-100 border-2 ${
                    focused ? "border-blue-400" : "border-transparent"
                }`}
            >
                <label htmlFor="search"></label>
                <FiSearch size={20} className="text-slate-300" />
                <input
                    type="text"
                    name="search"
                    id="search"
                    className="px-3 py-1 bg-transparent border-none outline-none w-full focus-visible:bg-transparent placeholder:text-slate-400"
                    placeholder="Search"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            </form>
        </div>
    );
};
