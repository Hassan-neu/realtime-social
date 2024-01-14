"use client";
import React, { useState } from "react";
import { Button } from "../shared/btn";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export const Signup = () => {
    const { push } = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSignUp = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify(user),
            });
            const data = res.json();
            if (data) {
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setUser({
                email: "",
                password: "",
            });
        }
    };
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-slate-200">
            <div className="flex justify-center items-center w-96 h-96 px-4 py-2 bg-white rounded-2xl">
                <div className="flex flex-col items-center justify-center gap-3 w-3/4">
                    <div className="text-lg font-semibold">
                        <h2>Create an account</h2>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <label htmlFor="email">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="border-2 h-10 bg-transparent text-sm border-slate-200 rounded px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none focus-visible:bg-transparent"
                                placeholder="Email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="password">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="border-2 h-10 border-slate-200 bg-transparent text-sm rounded px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none"
                                placeholder="Password"
                                value={user.password}
                                onChange={handleChange}
                            />
                        </label>
                        <Button
                            className={`px-3 py-1 bg-blue-500 rounded-full self-stretch text-white h-9`}
                            onClick={handleSignUp}
                        >
                            Create account
                        </Button>
                        <div className="flex text-sm gap-1 justify-center">
                            <span>Existing User?</span>
                            <Button
                                className="text-blue-500"
                                onClick={() => push("/signin")}
                            >
                                Sign In
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
