import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    try {
        if (user_id) {
            const followers = await prisma.follow.findMany({
                where: {
                    following_id: user_id,
                },
                include: {
                    follower: true,
                },
            });
            return NextResponse.json(followers, { status: 200 });
        } else {
            const followers = await prisma.follow.findMany({});
            return NextResponse.json(followers, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json(error, { status: 404 });
    }
}
