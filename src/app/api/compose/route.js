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
        const { content } = body;
        if (user && content) {
            const post = await prisma.post.create({
                data: {
                    content,
                    user_id: user.id,
                },
            });
            return NextResponse.json(post, { status: 201 });
        }
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}
