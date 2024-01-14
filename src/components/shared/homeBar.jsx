import React from "react";

export const HomeBar = ({ children }) => {
    return (
        <div className="w-full p-3 py-6 sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur">
            <div className="text-lg font-medium uppercase flex gap-4 items-center">
                {children}
            </div>
        </div>
    );
};
