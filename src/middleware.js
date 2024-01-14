import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session && req.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/home", req.url));
    }
    if (!session && req.nextUrl.pathname !== "/") {
        return NextResponse.redirect(new URL("/", req.url));
    }
    return res;
}

export const config = {
    matcher: ["/", "/home", "/status/:path", "/profile/:path"],
};
