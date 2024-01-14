"use client";
import React from "react";

export const Button = ({ children, className, ...props }) => {
    return (
        <button className={`${className || ""} cursor-pointer`} {...props}>
            {children}
        </button>
    );
};
