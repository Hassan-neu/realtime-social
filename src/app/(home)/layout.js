import { ActionBar } from "@/components/home/actionBar";
import { SideMenu } from "@/components/home/sideMenu";
import { Compose } from "@/components/shared/compose";
export default function HomeLayout({ children }) {
    return (
        <main className="grid grid-cols-[1fr_1.5fr_1fr] min-h-screen relative">
            <SideMenu />
            {children}
            {/* <ActionBar /> */}
        </main>
    );
}
