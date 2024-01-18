import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const username = searchParams.get("username");
    try {
        if (id) {
            const profile = await prisma.profile.findUnique({
                where: {
                    id,
                },
            });
            return NextResponse.json(profile, { status: 200 });
        } else if (username) {
            const profile = await prisma.profile.findUnique({
                where: {
                    username,
                },
                include: {
                    posts: true,
                },
            });
            return NextResponse.json(profile, { status: 200 });
        } else {
            return NextResponse.json(
                { message: "Invalid request" },
                { status: 400 }
            );
        }
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}

export async function POST(req) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({
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
