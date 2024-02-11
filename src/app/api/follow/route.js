import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

export async function POST(req) {
    try {
        const body = await req.json();
        const { follower_id, following_id } = body;

        await prisma.follow.create({
            data: {
                follower_id,
                following_id,
            },
        });
        return NextResponse.json({ message: "following" }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "unable to perform action" },
            { status: 400 }
        );
    }
}

export async function DELETE(req) {
    const { searchParams } = new URL(req.url);
    const follower_id = searchParams.get("follower_id");
    const following_id = searchParams.get("following_id");

    try {
        await prisma.follow.deleteMany({
            where: {
                follower_id,
                following_id,
            },
        });
        return NextResponse.json(
            { message: "User unfollowed" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ message: "unable to perform action" });
    }
}
