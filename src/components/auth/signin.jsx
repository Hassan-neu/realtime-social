"use client";
import React, { useState } from "react";
import { Button } from "../shared/btn";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { validation } from "@/libs/signinValidation";
import { useFormik } from "formik";
import { PiEyeClosedLight } from "react-icons/pi";
import { RxEyeOpen } from "react-icons/rx";
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
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-slate-200">
            <div className="flex justify-center items-center w-[600px] h-[650px] px-4 py-2 bg-white rounded-2xl">
                <div className="flex flex-col items-center justify-center gap-3 w-3/5 h-4/5">
                    <div className="text-2xl font-semibold self-start">
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
                                className={`border-2 h-12 bg-transparent text-sm rounded px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none  ${
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
                                    className={`border-2 h-12 bg-transparent text-sm rounded px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none  ${
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
                            className={`px-3 py-1 bg-blue-500 rounded-full self-stretch text-white h-10`}
                            onClick={formik.handleSubmit}
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
