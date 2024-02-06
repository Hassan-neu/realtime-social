"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../shared/btn";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import Image from "next/image";
import { useFormik } from "formik";
import { validation } from "@/libs/signupValidation";
import { PiEyeClosedLight } from "react-icons/pi";
import { RxEyeOpen } from "react-icons/rx";
export const Signup = () => {
    const { push } = useRouter();
    const [disableButton, setDisableButton] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            cpassword: "",
            full_name: "",
            username: "",
            birth_date: "",
        },
        validate: validation,
        onSubmit: handleSignUp,
    });
    const [loading, setLoading] = useState(false);
    async function handleSignUp(values) {
        try {
            setLoading(true);
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify(values),
            });
            if (res.ok) {
                const data = res.json();
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (
            formik.values.full_name &&
            !formik.errors.full_name &&
            formik.values.email &&
            !formik.errors.email &&
            formik.values.birth_date &&
            !formik.errors.birth_date
        ) {
            setDisableButton(false);
        } else setDisableButton(true);
    }, [formik]);

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-slate-200">
            <div className="flex flex-col w-[600px] h-[650px] p-5 bg-white rounded-2xl relative overflow-clip">
                <div className="flex gap-1 items-center justify-between text-lg font-semibold w-4/5 self-center mt-8">
                    <Button
                        className="w-9 h-9 rounded-full flex justify-center items-center hover:bg-slate-200 disabled:hover:bg-transparent"
                        disabled={activeIndex === 0}
                        onClick={() => setActiveIndex(activeIndex - 1)}
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
                    <div className="flex flex-col gap-5 w-full">
                        <label htmlFor="full_name">
                            {formik.errors.full_name &&
                                formik.touched.full_name && (
                                    <span className="text-red-400 text-xs block mb-1">
                                        {formik.errors.full_name}
                                    </span>
                                )}

                            <input
                                type="text"
                                name="full_name"
                                id="full_name"
                                className={`border-2 h-12 bg-transparent text-sm rounded px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none focus-visible:bg-transparent ${
                                    formik.errors.full_name &&
                                    formik.touched.full_name
                                        ? "border-red-400"
                                        : "border-slate-200"
                                }`}
                                placeholder="Full Name"
                                {...formik.getFieldProps("full_name")}
                            />
                        </label>
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
                                className={`border-2 h-12 bg-transparent text-sm rounded px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none focus-visible:bg-transparent ${
                                    formik.errors.email && formik.touched.email
                                        ? "border-red-400"
                                        : "border-slate-200"
                                }`}
                                placeholder="Email"
                                {...formik.getFieldProps("email")}
                            />
                        </label>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                                <span className="block text-lg font-bold">
                                    Date of Birth
                                </span>
                                <span className="text-sm text-slate-500 block">
                                    This will not be shown publicly. Confirm
                                    your own age, even if this account is for a
                                    business, a pet, or something else.
                                </span>
                            </div>
                            <label htmlFor="birth_date">
                                {formik.errors.birth_date &&
                                    formik.touched.birth_date && (
                                        <span className="text-red-400 text-xs block mb-1">
                                            {formik.errors.birth_date}
                                        </span>
                                    )}
                                <input
                                    type="date"
                                    name="birth_date"
                                    id="birth_date"
                                    className={`border-2 h-12 bg-transparent text-sm rounded px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none ${
                                        formik.errors.birth_date &&
                                        formik.touched.birth_date
                                            ? "border-red-400"
                                            : "border-slate-200"
                                    }`}
                                    placeholder="Birth date"
                                    {...formik.getFieldProps("birth_date")}
                                />
                            </label>
                        </div>
                        <Button
                            className={`px-3 py-1 text-lg font-medium h-10 bg-blue-500 rounded-full self-stretch text-white`}
                            disabled={disableButton}
                            onClick={() => setActiveIndex(1)}
                        >
                            Continue
                        </Button>
                        <div className="flex text-sm gap-1 justify-center mt-6">
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
                        <h2>Create your account</h2>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <label htmlFor="username">
                            {formik.errors.username &&
                                formik.touched.username && (
                                    <span className="text-red-400 text-xs block mb-1">
                                        {formik.errors.username}
                                    </span>
                                )}
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className={`border-2 h-12  bg-transparent text-sm rounded px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none ${
                                    formik.errors.username &&
                                    formik.touched.username
                                        ? "border-red-400"
                                        : "border-slate-200"
                                }`}
                                placeholder="Username"
                                {...formik.getFieldProps("username")}
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
                                    className={`border-2 h-12 bg-transparent text-sm rounded px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none ${
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
                        <label htmlFor="cpassword">
                            {formik.errors.cpassword &&
                                formik.touched.cpassword && (
                                    <span className="text-red-400 text-xs block mb-1">
                                        {formik.errors.cpassword}
                                    </span>
                                )}
                            <div className="relative">
                                <input
                                    type={`${
                                        showCPassword ? "text" : "password"
                                    }`}
                                    name="cpassword"
                                    id="cpassword"
                                    className={`border-2 h-12 bg-transparent text-sm rounded px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none ${
                                        formik.errors.cpassword &&
                                        formik.touched.cpassword
                                            ? "border-red-400"
                                            : "border-slate-200"
                                    }`}
                                    placeholder="Confirm Password"
                                    {...formik.getFieldProps("cpassword")}
                                />
                                <span
                                    className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-400"
                                    onClick={() =>
                                        setShowCPassword(!showCPassword)
                                    }
                                >
                                    {showCPassword ? (
                                        <PiEyeClosedLight size={16} />
                                    ) : (
                                        <RxEyeOpen size={16} />
                                    )}
                                </span>
                            </div>
                        </label>
                        <Button
                            className={`px-3 py-1 text-lg font-medium bg-blue-500 rounded-full self-stretch text-white h-10 mt-10`}
                            onClick={formik.handleSubmit}
                            type="button"
                        >
                            Sign up
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
