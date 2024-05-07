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
        } else {
            return NextResponse.json(
                { message: "Unable to create Post" },
                { status: 403 }
            );
        }
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const post_id = searchParams.get("id");
    const query = searchParams.get("query");
    const reply_to = searchParams.get("reply_to");
    const user_id = searchParams.get("user_id");
    const media = searchParams.get("media_url");
    const replies = searchParams.get("replies");
    try {
        if (user_id && !media) {
            const post = await prisma.post.findMany({
                orderBy: {
                    created_at: "desc",
                },
                where: {
                    user_id,
                    reply_to: null,
                },
                include: {
                    user: true,
                    likes: true,
                    bookmarks: true,
                },
            });
            return NextResponse.json(post, { status: 200 });
        } else if (post_id) {
            const post = await prisma.post.findUnique({
                where: {
                    id: post_id,
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
        } else if (media) {
            const post = await prisma.post.findMany({
                where: {
                    user_id,
                    media_url: { not: null },
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
        } else if (replies) {
            const post = await prisma.post.findMany({
                where: {
                    reply_to: { not: null },
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
