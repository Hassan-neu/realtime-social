"use client";
import React, { useState } from "react";
import { Button } from "../shared/btn";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
export const Signup = () => {
    const { push } = useRouter();
    const [activeIndex, setActiveIndex] = useState(0);
    const [user, setUser] = useState({
        email: "",
        password: "",
        full_name: "",
        username: "",
        birth_date: "",
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
                full_name: "",
                username: "",
                birth_date: "",
            });
        }
    };
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-slate-200">
            <div className="flex flex-col w-[600px] h-[650px] p-5 bg-white rounded-2xl relative overflow-clip">
                <div className="flex gap-1 items-center text-lg font-semibold w-4/5 self-center mt-8">
                    <Button
                        className="w-9 h-9 rounded-full flex justify-center items-center hover:bg-slate-200 disabled:hover:bg-transparent"
                        disabled={activeIndex === 0}
                        onClick={() => setActiveIndex(0)}
                    >
                        <IoArrowBack size={18} />
                    </Button>
                    <div>Step {activeIndex + 1} of 2</div>
                </div>
                <div
                    className={`flex flex-col items-center justify-center gap-3 w-3/4 h-3/5 absolute top-1/2 -translate-y-1/2  transition-[left,opacity] -translate-x-1/2 duration-1000 ${
                        activeIndex == 0
                            ? "left-1/2 visible"
                            : "left-0 opacity-0 invisible"
                    }`}
                >
                    <div className="text-2xl font-semibold self-start">
                        <h2>Create your account</h2>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <label htmlFor="email">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="border-2 h-12 bg-transparent text-sm border-slate-200 rounded px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none focus-visible:bg-transparent"
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
                                className="border-2 h-12 border-slate-200 bg-transparent text-sm rounded px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none"
                                placeholder="Password"
                                value={user.password}
                                onChange={handleChange}
                            />
                        </label>
                        <Button
                            className={`px-3 py-1 text-xl font-medium h-10 bg-blue-500 rounded-full self-stretch text-white`}
                            onClick={() => setActiveIndex(1)}
                        >
                            Continue
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
                <div
                    className={`flex flex-col items-center justify-center gap-3 w-3/4 h-3/5 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-[left,opacity] duration-1000 ${
                        activeIndex == 1
                            ? "left-1/2 visible"
                            : "left-full invisible opacity-0"
                    }`}
                >
                    <div className="text-2xl font-semibold self-start">
                        <h2>Complete your profile</h2>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <label htmlFor="full_name">
                            <input
                                type="text"
                                name="full_name"
                                id="full_name"
                                className="border-2 h-12 bg-transparent text-sm border-slate-200 rounded px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none focus-visible:bg-transparent"
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
                                className="border-2 h-12 border-slate-200 bg-transparent text-sm rounded px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none"
                                placeholder="Username"
                                value={user.username}
                                onChange={handleChange}
                            />
                        </label>
                        <div className="flex flex-col">
                            <div className="text-lg font-bold">
                                Date of Birth
                            </div>
                            <div className="text-xs text-slate-500">
                                This will not be shown publicly. Confirm your
                                own age, even if this account is for a business,
                                a pet, or something else.
                            </div>
                        </div>
                        <label htmlFor="birth_date">
                            <input
                                type="date"
                                name="birth_date"
                                id="birth_date"
                                className="border-2 h-12 border-slate-200 bg-transparent text-sm rounded px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none"
                                placeholder="Birth date"
                                value={user.birth_date}
                                onChange={handleChange}
                            />
                        </label>
                        <Button
                            className={`px-3 py-1 text-xl font-medium bg-blue-500 rounded-full self-stretch text-white h-10`}
                            onClick={handleSignUp}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Sign up"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
