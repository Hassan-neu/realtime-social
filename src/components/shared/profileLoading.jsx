import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function ProfileLoading() {
    return (
        <div className="flex flex-col w-full border border-b-0 pb-2">
            <div className=" h-36 lg:min-h-52 text-2xl font-bold flex items-center justify-center">
                <div className="text-center">
                    THIS ISN&apos;T X FORGET A COVER PHOTO
                </div>
            </div>
            <div className="flex flex-col gap-4 relative px-4 pt-3">
                <div className="flex justify-between">
                    <Skeleton
                        className={
                            "w-28 h-28 rounded-full lg:w-40 lg:h-40 border-4 border-white absolute -translate-y-1/2 flex justify-center items-center"
                        }
                    />
                    <div className="ml-auto">
                        <Skeleton className={"w-24 h-7 rounded-full"} />
                    </div>
                </div>

                <div className="flex flex-col gap-2 mt-8 lg:mt-16">
                    <div className="flex flex-col gap-2 ">
                        <Skeleton className="w-28 h-4 rounded" />
                        <Skeleton className="w-20 h-3 rounded" />
                    </div>

                    <Skeleton className="w-full h-11 rounded" />
                    <div className="flex gap-2 flex-wrap">
                        <Skeleton className="w-28 h-4 rounded" />
                        <Skeleton className="w-28 h-4 rounded" />
                        <Skeleton className="w-28 h-4 rounded" />
                    </div>
                    <div className="flex gap-2 text-sm">
                        <Skeleton className="w-28 h-4 rounded" />

                        <Skeleton className="w-28 h-4 rounded" />
                    </div>
                </div>

                <div className="flex gap-3 justify-between">
                    <Skeleton className={`w-14 h-5 rounded`} />
                    <Skeleton className={`w-14 h-5 rounded`} />
                    <Skeleton className={`w-14 h-5 rounded`} />
                </div>
            </div>
        </div>
    );
}
