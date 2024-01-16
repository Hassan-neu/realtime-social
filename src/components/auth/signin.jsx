"use client";
import React, { useState } from "react";
import { Button } from "../shared/btn";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export const SignIn = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const { push } = useRouter();

    const handleChange = (e) => {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSignIn = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                body: JSON.stringify(user),
            });
            const data = await res.json();
            if (data) {
                push("/home");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setUser({
                email: "",
                password: "",
            });
            setLoading(false);
        }
    };
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-slate-200">
            <div className="flex justify-center items-center w-[600px] h-[650px] px-4 py-2 bg-white rounded-2xl">
                <div className="flex flex-col items-center justify-center gap-3 w-3/5 h-4/5">
                    <div className="text-2xl font-semibold self-start">
                        <h2>Sign In to your account</h2>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <label htmlFor="email">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="border-2 h-12 bg-transparent text-sm border-slate-200 rounded px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none"
                                placeholder="Email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </label>
                        <label htmlFor="password">
                            {/* <span className="block font-medium">Password</span> */}
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="border-2 h-12 border-slate-200 bg-transparent text-sm rounded px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none"
                                placeholder="Password"
                                value={user.password}
                                onChange={handleChange}
                            />
                        </label>
                        <Button
                            className={`px-3 py-1 bg-blue-500 rounded-full self-stretch text-white h-10`}
                            onClick={handleSignIn}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Log In"}
                        </Button>
                        <div className="flex text-sm gap-1 justify-center">
                            <span>Don&apos;t have an account?</span>
                            <Button
                                className="text-blue-500"
                                onClick={() => push("/signup")}
                            >
                                Sign up
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
