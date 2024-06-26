"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import Image from "next/image";
import { useFormik } from "formik";
import { validation } from "@/libs/signupValidation";
import { PiEyeClosedLight } from "react-icons/pi";
import { RxEyeOpen } from "react-icons/rx";
import Link from "next/link";
import { months } from "@/utils/months";
import BirthDate from "./birthDate";
import { BsTwitterX } from "react-icons/bs";
export const Signup = () => {
    const selectYear = new Date().getFullYear();
    const startYear = selectYear - 100;
    const endYear = selectYear - 16;
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
            birth_day: "",
            birth_month: "",
            birth_year: "",
        },
        validate: validation,
        onSubmit: handleSignUp,
        initialErrors: {
            email: "Email cannot be empty",
            full_name: "Full name cannot be empty",
            birth_day: "Select a birthday",
            birth_month: "Select a birth month",
            birth_year: "Select a birth year",
        },
    });

    async function handleSignUp(values) {
        console.log(values);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify(values),
            });
            if (res.ok) {
                const data = res.json();
                toast({
                    description: data.message,
                    variant: "success",
                });
                console.log(data);
            } else {
                const errorMessage = await res.json();
                throw errorMessage;
            }
        } catch (error) {
            toast({
                description: error.message,
                variant: "desctructive",
            });
        }
    }
    useEffect(() => {
        if (
            !formik.errors.full_name &&
            !formik.errors.email &&
            !formik.errors.birth_day &&
            !formik.errors.birth_month &&
            !formik.errors.birth_year
        ) {
            setDisableButton(false);
        } else setDisableButton(true);
    }, [formik]);

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-slate-100/60">
            <div className="w-1/2 h-full relative max-sm:hidden">
                <Image
                    src={"/signup.jpg"}
                    alt="signup image"
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col w-1/2 h-full shrink-0 gap-8 max-sm:p-8 p-5 relative overflow-clip grow">
                <div className="flex gap-1 items-center justify-between text-lg font-semibold max-md:w-full w-4/5 self-center mt-8">
                    <div className="flex flex-col w-full">
                        <div className="self-center mb-10 flex gap-2 items-center">
                            <span className="text-4xl">NOT</span>
                            <BsTwitterX className="inline text-3xl" />
                        </div>
                        <div className="flex gap-0.5 items-center w-full">
                            <span
                                className={`rounded-full border-grey border p-1 w-8 h-8 flex justify-center items-center shrink-0 hover:cursor-pointer ${
                                    activeIndex >= 0
                                        ? "bg-black text-white"
                                        : "bg-transparent text-black"
                                }`}
                                onClick={() => {
                                    if (!activeIndex) return;
                                    setActiveIndex(activeIndex - 1);
                                }}
                            >
                                1
                            </span>

                            <span className="bg-slate-200 w-full h-1 rounded-sm flex overflow-clip">
                                <span
                                    className={`block w-full h-full bg-black transition-[flex] duration-700 ${
                                        activeIndex === 1
                                            ? "basis-full"
                                            : "basis-0"
                                    }`}
                                ></span>
                            </span>
                            <span
                                className={`rounded-full border-grey border p-1 w-8 h-8 flex transition-[background,_color] duration-700 justify-center items-center shrink-0 hover:cursor-pointer ${
                                    activeIndex == 1
                                        ? "bg-black text-white"
                                        : "bg-transparent text-black"
                                }`}
                                onClick={() => {
                                    if (disableButton) return;
                                    setActiveIndex(1);
                                }}
                            >
                                2
                            </span>
                        </div>
                        <div className="flex gap-0.5 items-center w-full justify-between">
                            <span className="text-xs w-min">
                                Personal Information
                            </span>
                            <span className="text-xs w-min text-right">
                                Account Information
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex max-md:w-full w-4/5 h-full lg:h-3/5 relative self-center ">
                    <div
                        className={`flex flex-col items-center w-full h-full gap-3 transition-[left,opacity] absolute top-0 duration-1000 ${
                            activeIndex == 0
                                ? "left-0 visible"
                                : "-left-full  opacity-0 invisible"
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
                                    className={`border h-11 bg-transparent text-sm rounded-md px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none focus-visible:bg-transparent ${
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
                                {formik.errors.email &&
                                    formik.touched.email && (
                                        <span className="text-red-400 text-xs block mb-1">
                                            {formik.errors.email}
                                        </span>
                                    )}
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className={`border h-11 bg-transparent text-sm rounded-md px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none focus-visible:bg-transparent ${
                                        formik.errors.email &&
                                        formik.touched.email
                                            ? "border-red-400"
                                            : "border-slate-200"
                                    }`}
                                    placeholder="Email"
                                    {...formik.getFieldProps("email")}
                                />
                            </label>
                            <BirthDate formik={formik} />
                            <Button
                                className={`px-3 py-1 text-base font-medium h-12 rounded-full self-stretch text-white`}
                                disabled={disableButton}
                                onClick={() => setActiveIndex(1)}
                            >
                                Continue
                            </Button>
                            <div className="flex text-sm gap-0.5 justify-center items-center">
                                <span>Existing User?</span>
                                <Button
                                    asChild
                                    className="text-slate-900 font-semibold p-2 hover:bg-transparent"
                                    variant="ghost"
                                >
                                    <Link href={"/signin"}>Sign In</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`flex flex-col items-center gap-3 w-full h-full absolute top-0 -translate-x-1/2 transition-[left,opacity] duration-1000 ${
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
                                    className={`border h-11  bg-transparent text-sm rounded-md px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none ${
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
                                        className={`border h-11 bg-transparent text-sm rounded-md px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none ${
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
                                        className={`border h-11 bg-transparent text-sm rounded-md px-3 py-1 placeholder:text-slate-500 placeholder:text-sm w-full focus-visible:outline-none ${
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
                                className={`px-3 py-1 text-base font-medium rounded-full self-stretch text-white h-12 mt-2`}
                                onClick={formik.handleSubmit}
                                type="button"
                                disabled={formik.isSubmitting}
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
