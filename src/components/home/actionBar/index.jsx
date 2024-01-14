import React from "react";
import { Searchbar } from "./searchbar";
import { TrendList } from "./trendList";
import { Trend } from "./trend";
export const ActionBar = () => {
    return (
        <div className="px-3 min-h-svh">
            <div className="flex flex-col gap-3 py-1 w-3/4 ">
                <Searchbar />
                <TrendList>
                    <Trend />
                    <Trend />
                    <Trend />
                    <Trend />
                    <Trend />
                </TrendList>
            </div>
        </div>
    );
};
