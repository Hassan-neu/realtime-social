"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { validation } from "@/libs/signinValidation";
import { useFormik } from "formik";
import { PiEyeClosedLight } from "react-icons/pi";
import { RxEyeOpen } from "react-icons/rx";
import Link from "next/link";
import { FiLoader } from "react-icons/fi";
export const SignIn = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validate: validation,
        onSubmit: handleSignIn,
    });
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const { push } = useRouter();

    async function handleSignIn(values) {
        try {
            setLoading(true);
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                body: JSON.stringify(values),
            });
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                push("/home");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-slate-100/60">
            <div className="flex justify-center items-center w-4/5 max-w-[400px] h-[50vmin] px-4 py-2 bg-white rounded-xl border">
                <div className="flex flex-col items-center justify-center gap-3 w-4/5">
                    <div className="text-xl font-semibold self-start">
                        <h2>Sign In to your account</h2>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <label htmlFor="email">
                            {formik.errors.email && formik.touched.email && (
                                <span className="text-red-400 text-xs block mb-1">
                                    {formik.errors.email}
                                </span>
                            )}
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className={`border h-9 bg-transparent text-sm rounded-md px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none  ${
                                    formik.errors.email && formik.touched.email
                                        ? "border-red-400"
                                        : "border-slate-200"
                                }`}
                                placeholder="Email"
                                {...formik.getFieldProps("email")}
                            />
                        </label>
                        <label htmlFor="password">
                            {formik.errors.password &&
                                formik.touched.password && (
                                    <span className="text-red-400 text-xs block mb-1">
                                        {formik.errors.password}
                                    </span>
                                )}
                            <div className="relative">
                                <input
                                    type={`${
                                        showPassword ? "text" : "password"
                                    }`}
                                    name="password"
                                    id="password"
                                    className={`border h-9 bg-transparent text-sm rounded-md px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none  ${
                                        formik.errors.password &&
                                        formik.touched.password
                                            ? "border-red-400"
                                            : "border-slate-200"
                                    }`}
                                    placeholder="Password"
                                    {...formik.getFieldProps("password")}
                                />
                                <span
                                    className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-400"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <PiEyeClosedLight size={16} />
                                    ) : (
                                        <RxEyeOpen size={16} />
                                    )}
                                </span>
                            </div>
                        </label>
                        <Button
                            className={`px-3 py-1 rounded-full text-base self-stretch text-white h-9`}
                            onClick={formik.handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex gap-1 w-full items-center justify-center">
                                    <FiLoader
                                        size={20}
                                        className="animate-spin"
                                    />
                                    Logging in...
                                </div>
                            ) : (
                                <div className="w-full">Log In</div>
                            )}
                        </Button>
                        <div className="flex text-sm gap-0.5 justify-center items-center">
                            <span>Don&apos;t have an account?</span>
                            <Button
                                type="submit"
                                asChild
                                className="text-slate-90 font-semibold p-2 hover:bg-transparent"
                                variant="ghost"
                            >
                                <Link href={"/signup"}>Sign up</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
