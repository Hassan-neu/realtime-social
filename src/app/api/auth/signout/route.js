import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(req) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (user) {
        await supabase.auth.signOut();
    } else {
        await supabase.auth.signOut();
    }

    return NextResponse.redirect(new URL("/", req.url), { status: 302 });
}
