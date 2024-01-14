"use client";
import React, { useState } from "react";
import { Button } from "../shared/btn";

export const UpdateProfile = () => {
    const [user, setUser] = useState({
        full_name: "",
        username: "",
        birth_date: "",
    });
    const handleChange = (e) => {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleUpdate = async () => {
        try {
            const res = await fetch("/api/auth/profile", {
                method: "POST",
                body: JSON.stringify(user),
            });
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-slate-200">
            <div className="flex justify-center items-center w-96 h-96 px-4 py-2 bg-white rounded-2xl">
                <div className="flex flex-col items-center justify-center gap-3 w-3/4">
                    <div className="text-lg font-semibold">
                        <h2>Update account details</h2>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <label htmlFor="full_name">
                            <input
                                type="text"
                                name="full_name"
                                id="full_name"
                                className="border-2 h-10 bg-transparent text-sm border-slate-200 rounded px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none focus-visible:bg-transparent"
                                placeholder="Full Name"
                                value={user.full_name}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="username">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="border-2 h-10 border-slate-200 bg-transparent text-sm rounded px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none"
                                placeholder="Username"
                                value={user.username}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="birth_date">
                            <input
                                type="date"
                                name="birth_date"
                                id="birth_date"
                                className="border-2 h-10 border-slate-200 bg-transparent text-sm rounded px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none"
                                placeholder="Birth date"
                                value={user.birth_date}
                                onChange={handleChange}
                            />
                        </label>
                        <Button
                            className={`px-3 py-1 bg-blue-500 rounded-full self-stretch text-white h-9`}
                            onClick={handleUpdate}
                        >
                            Update account
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const UpdateComponent = () => {
    const [user, setUser] = useState({
        full_name: "",
        username: "",
        birth_date: "",
    });
    const handleChange = (e) => {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleUpdate = () => {
        console.log(user);
    };
    return (
        <div className="flex justify-center items-center w-96 h-96 px-4 py-2 bg-white rounded-2xl">
            <div className="flex flex-col items-center justify-center gap-3 w-3/4">
                <div className="text-lg font-semibold">
                    <h2>Update account details</h2>
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <label htmlFor="full_name">
                        <input
                            type="text"
                            name="full_name"
                            id="full_name"
                            className="border-2 h-10 bg-transparent text-sm border-slate-200 rounded px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none focus-visible:bg-transparent"
                            placeholder="Full Name"
                            value={user.full_name}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="username">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="border-2 h-10 border-slate-200 bg-transparent text-sm rounded px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none"
                            placeholder="Username"
                            value={user.username}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="birth_date">
                        <input
                            type="date"
                            name="birth_date"
                            id="birth_date"
                            className="border-2 h-10 border-slate-200 bg-transparent text-sm rounded px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none"
                            placeholder="Birth date"
                            value={user.birth_date}
                            onChange={handleChange}
                        />
                    </label>
                    <Button
                        className={`px-3 py-1 bg-blue-500 rounded-full self-stretch text-white h-9`}
                        onClick={handleUpdate}
                    >
                        Update account
                    </Button>
                </div>
            </div>
        </div>
    );
};
