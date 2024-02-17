import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function TweetLoading() {
    return (
        <div className="w-full flex flex-col gap-3 px-4 py-2 border-[0.2px] cursor-pointer">
            <div className="flex gap-3 w-full">
                <Skeleton
                    className={"w-12 h-12 border rounded-full shrink-0"}
                />
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-1 items-center">
                            <Skeleton className={"w-20 h-3 rounded"} />
                            <Skeleton className="w-20 h-3 rounded" />
                            <Skeleton className="w-1 h-1 mx-0.5 rounded-full" />
                            <Skeleton className="w-14 h-3" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Skeleton className="w-full h-12 rounded" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-3 justify-between w-[calc(100%_-_3.75rem)] self-end">
                <Skeleton className={"w-6 h-3 rounded"} />
                <Skeleton className={"w-6 h-3 rounded"} />
                <Skeleton className={"w-6 h-3 rounded"} />
            </div>
        </div>
    );
}
