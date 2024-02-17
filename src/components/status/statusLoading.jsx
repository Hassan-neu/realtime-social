import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function StatusLoading() {
    return (
        <div className="w-full flex flex-col gap-3 px-4 py-2 border-[0.2px] cursor-pointer border-b-0">
            <div className="flex flex-col gap-3 w-full">
                <div className="flex gap-2">
                    <Skeleton
                        className={
                            "relative w-12 h-12 rounded-full border shrink-0"
                        }
                    />
                    <div className="flex flex-col gap-0.5">
                        <Skeleton className={"w-24 h-4 rounded"} />
                        <Skeleton className="w-20 h-3 rounded" />
                    </div>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="w-full h-24 rounded" />
                    </div>
                    <div className="flex gap-1 items-center text-sm">
                        <Skeleton className={"w-20 h-3 rounded"} />
                        <Skeleton className="w-1 h-1 mx-0.5 rounded-full" />
                        <Skeleton className="w-20 h-3 rounded" />
                    </div>
                    <div className="flex gap-3 justify-between border-y py-3">
                        <Skeleton className={"w-6 h-3 rounded"} />
                        <Skeleton className={"w-6 h-3 rounded"} />
                        <Skeleton className={"w-6 h-3 rounded"} />
                    </div>
                </div>
            </div>
        </div>
    );
}
