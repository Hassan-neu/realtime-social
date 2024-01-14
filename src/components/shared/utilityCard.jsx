import React from "react";

export const UtilityCard = ({ className, children }) => {
    return (
        <div className={`w-64 rounded-md ${className || ""}`}>{children}</div>
    );
};
