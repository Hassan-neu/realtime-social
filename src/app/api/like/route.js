import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function POST(req) {
    try {
        const body = await req.json();
        const { post_id, user_id } = body;
        await prisma.like.create({
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
    const { searchParams } = new URL(req.url);
    const post_id = searchParams.get("post_id");
    const user_id = searchParams.get("user_id");
    try {
        const post = await prisma.like.deleteMany({
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
        const likes = await prisma.like.findMany({
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
        });
        return NextResponse.json(likes, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 404 });
    }
}
