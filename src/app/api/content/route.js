import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
export async function POST(req) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    try {
        const body = await req.json();
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser();
        const { content, reply_to, media_url } = body;
        if (user && content) {
            const post = await prisma.post.create({
                data: {
                    content,
                    user_id: user.id,
                    reply_to,
                    media_url,
                },
            });
            return NextResponse.json(post, { status: 201 });
        }
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const query = searchParams.get("query");
    const reply_to = searchParams.get("reply_to");
    try {
        if (id) {
            const post = await prisma.post.findUnique({
                where: {
                    id,
                },
                include: {
                    user: true,
                    likes: true,
                    bookmarks: true,
                },
            });
            return NextResponse.json(post, { status: 200 });
        } else if (query) {
            const post = await prisma.post.findMany({
                orderBy: {
                    created_at: "desc",
                },
                where: {
                    content: {
                        search: query.split(" ").join(" & "),
                        mode: "insensitive",
                    },
                },
                include: {
                    user: true,
                    likes: true,
                    bookmarks: true,
                },
            });
            return NextResponse.json(post, { status: 200 });
        } else if (reply_to) {
            const post = await prisma.post.findMany({
                orderBy: {
                    created_at: "desc",
                },
                where: {
                    reply_to,
                },
                include: {
                    user: true,
                    likes: true,
                    bookmarks: true,
                },
            });
            return NextResponse.json(post, { status: 200 });
        } else {
            const post = await prisma.post.findMany({
                where: {
                    reply_to: null,
                },
                orderBy: {
                    created_at: "desc",
                },
                include: {
                    user: true,
                    likes: true,
                    bookmarks: true,
                },
            });
            return NextResponse.json(post, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}
