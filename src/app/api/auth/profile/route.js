import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req) {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
        cookies: () => cookieStore,
    });

    try {
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser();
        if (user) {
            const profile = await prisma.profile.findUnique({
                where: {
                    id: user.id,
                },
            });
            return NextResponse.json(profile, { status: 200 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json(error, { status: 400 });
    }
}

export async function POST(req) {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
        cookies: () => cookieStore,
    });
    try {
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser();
        const body = await req.json();
        if (body && user) {
            const { username, full_name, birth_date } = body;
            const update = await prisma.profile.update({
                where: {
                    id: user.id,
                },
                data: {
                    email: user.email,
                    username,
                    full_name,
                    birth_date,
                },
            });
            return NextResponse.json(update, { status: 201 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json(error, { status: 400 });
    }
}
