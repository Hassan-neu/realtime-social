import React from "react";

export const Spinner = () => {
    return (
        <span
            className={`w-6 h-6 border-[3px] border-blue-400 border-b-blue-100 rounded-full inline-block animate-spin`}
        ></span>
    );
};
