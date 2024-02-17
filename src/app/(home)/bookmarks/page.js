import UserBookmarks from "@/components/bookmarks/userBookmarks";
import { HomeBar } from "@/components/shared/homeBar";
import TweetsLoading from "@/components/shared/tweetsLoading";
import React, { Suspense } from "react";
export const revalidate = 0;
export default async function page() {
    return (
        <div>
            <HomeBar showButton>Bookmarks</HomeBar>
            <Suspense fallback={<TweetsLoading />}>
                <UserBookmarks />
            </Suspense>
        </div>
    );
}
