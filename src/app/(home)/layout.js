import { ActionBar } from "@/components/home/actionBar";
import { SideMenu } from "@/components/home/sideMenu";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function HomeLayout({ children }) {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
        cookies: () => cookieStore,
    });
    const getUser = async () => {
        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            const res = await fetch(
                `http://localhost:3000/api/auth/profile?id=${user.id}`
            );
            const data = await res.json();
            return data;
        } catch (error) {
            throw error;
        }
    };
    const profile = await getUser();
    return (
        <main className="grid grid-cols-[1fr_1.5fr_1fr] min-h-screen relative">
            <SideMenu profile={profile} />
            {children}
            {/* <ActionBar /> */}
        </main>
    );
}
