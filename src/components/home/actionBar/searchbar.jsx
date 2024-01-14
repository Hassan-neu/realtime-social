"use client";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
export const Searchbar = () => {
    const [focused, setFocused] = useState(false);
    return (
        <div className="py-4 sticky top-0 bg-white w-full">
            <div
                className={`flex gap-3 items-center rounded-full bg-slate-100 border-2 ${
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
            </div>
        </div>
    );
};
