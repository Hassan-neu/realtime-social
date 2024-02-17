import React from "react";

export const Spinner = () => {
    return (
        <span
            className={`w-6 h-6 border-4 border-blue-400 border-b-transparent rounded-full inline-block animate-spin`}
        ></span>
    );
};
