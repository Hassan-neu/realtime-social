import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(req) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    try {
        const body = await req.json();
        const { email, password } = body;
        const {
            data: { user },
            error,
        } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}
