import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import prisma from "@/utils/prismaClient";

export async function POST(req) {
    const cookieStore = cookies();
    // const supabase = createServerComponentClient({
    //     cookies: () => cookieStore,
    // });
    try {
        const body = await req.json();
        const { post_id, user_id } = body;
        // const {
        //     data: { user },
        // } = await supabase.auth.getUser();
        await prisma.bookmark.create({
            data: {
                post_id,
                user_id,
            },
        });
        return NextResponse.json({ messge: "sucessful" }, { status: 201 });
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}

export async function DELETE(req) {
    const cookieStore = cookies();
    // const supabase = createServerComponentClient({
    //     cookies: () => cookieStore,
    // });
    const { searchParams } = new URL(req.url);
    const post_id = searchParams.get("post_id");
    const user_id = searchParams.get("user_id");
    try {
        // const {
        //     data: { user },
        // } = await supabase.auth.getUser();
        const post = await prisma.bookmark.deleteMany({
            where: {
                post_id,
                user_id,
            },
        });
        return NextResponse.json(
            { message: "action successful" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    try {
        const bookmarks = await prisma.bookmark.findMany({
            where: {
                user_id,
            },
            include: {
                post: {
                    include: {
                        likes: true,
                        bookmarks: true,
                        user: true,
                    },
                },
            },
            orderBy: {
                created_at: "desc",
            },
        });
        return NextResponse.json(bookmarks, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 404 });
    }
}
