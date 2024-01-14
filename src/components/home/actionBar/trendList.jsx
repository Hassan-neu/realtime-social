import React from "react";

export function TrendList({ children }) {
    return (
        <div className="min-h-svh w-full bg-slate-100 rounded-lg">
            <div className="flex flex-col gap-3 py-4">
                <div className="text-xl font-bold px-4">Trends for you</div>
                <div className="flex flex-col">{children}</div>
            </div>
        </div>
    );
}
