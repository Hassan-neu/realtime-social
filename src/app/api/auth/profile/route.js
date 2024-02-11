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
                    username: username.toLowerCase(),
                },
                include: {
                    posts: {
                        where: { reply_to: null },
                        orderBy: {
                            created_at: "desc",
                        },
                        include: {
                            likes: true,
                            bookmarks: true,
                        },
                    },
                    following: true,
                    followers: true,
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
                    email: user.email.toLowerCase(),
                    username: username.toLowerCase(),
                    full_name: full_name.toLowerCase(),
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

export async function PUT(req) {
    const cookieStore = cookies();
    const supabse = createRouteHandlerClient({ cookies: () => cookieStore });

    try {
        const {
            data: { user },
            error,
        } = await supabse.auth.getUser();
        const body = await req.json();
        const { username, avatar_url, website, birth_date, bio } = body;
        if (user) {
            const profile = await prisma.profile.update({
                where: {
                    id: user.id,
                },
                data: {
                    username,
                    avatar_url,
                    website,
                    bio,
                    birth_date: new Date(birth_date).toISOString(),
                },
            });
            return NextResponse.json(
                { message: "Update successful" },
                { status: 200 }
            );
        }
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}
