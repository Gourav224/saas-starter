import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";

export async function POST() {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
    }

    // capture payment

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            return NextResponse.json(
                { message: "User not found", success: false },
                { status: 401 },
            );
        }
        const subscriptionEnds = new Date();
        subscriptionEnds.setMonth(subscriptionEnds.getMonth() + 1);
        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                isSubscribed: true,
                subscriptionEnds: subscriptionEnds,
            },
        });
        return NextResponse.json(
            {
                message: "Subscription successful",
                success: true,
                subscriptionEnds: updatedUser.subscriptionEnds,
            },
            { status: 200 },
        );
    } catch (error) {
        console.error("Error fetching subscription status:", error);
        return NextResponse.json(
            { error: "Internal server error", success: false },
            { status: 500 },
        );
    }
}

export async function GET() {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                isSubscribed: true,
                subscriptionEnds: true,
            },
        });
        if (!user) {
            return NextResponse.json(
                { message: "User not found", success: false },
                { status: 401 },
            );
        }
        const now = new Date();
        if (user.subscriptionEnds && user.subscriptionEnds < now) {
            await prisma.user.update({
                where: { id: userId },
                data: { isSubscribed: false, subscriptionEnds: null },
            });
            return NextResponse.json({
                isSubscribed: false,
                subscriptionEnds: null,
            });
        }

        return NextResponse.json({
            isSubscribed: user.isSubscribed,
            subscriptionEnds: user.subscriptionEnds,
        });
    } catch (error) {
        console.error("Error fetching subscription status:", error);
        return NextResponse.json(
            { error: "Internal server error", success: false },
            { status: 500 },
        );
    }
}
