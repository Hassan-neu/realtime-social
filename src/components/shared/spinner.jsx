import React from "react";

export const Spinner = ({ className }) => {
    return (
        <span
            className={`${
                className || ""
            } border-4 border-blue-400 border-b-transparent rounded-full inline-block animate-spin`}
        ></span>
    );
};
