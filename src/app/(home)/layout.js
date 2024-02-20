import { ActionBar } from "@/components/home/actionBar";
import HomeMenu from "@/components/home/homeMenu";
import MenuLoading from "@/components/home/menuLoading";
import { SideMenu } from "@/components/home/sideMenu";
import TweetLoading from "@/components/shared/tweetLoading";
import { Suspense } from "react";
export default async function HomeLayout({ children }) {
    return (
        <main className="grid lg:grid-cols-[1fr_1.5fr_1fr] min-h-dvh relative">
            <Suspense fallback={<MenuLoading />}>
                <HomeMenu />
            </Suspense>
            {children}
            <TweetLoading />
        </main>
    );
}
