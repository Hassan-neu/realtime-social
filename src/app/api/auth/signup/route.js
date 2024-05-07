import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import prisma from "@/utils/prismaClient";

export async function POST(req) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    try {
        const body = await req.json();
        const { email, password, full_name, username, birth_date } = body;
        const {
            data: { user },
            error,
        } = await supabase.auth.signUp({
            email,
            password,
        });
        if (user) {
            const profile = await prisma.profile.create({
                data: {
                    id: user.id,
                    email,
                    username,
                    full_name,
                    birth_date: new Date(birth_date).toISOString(),
                },
            });
            return NextResponse.json(
                { message: "Sign up successful" },
                { status: 201 }
            );
        } else {
            throw error;
        }
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}
