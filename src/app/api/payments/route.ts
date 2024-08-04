import prisma from "@/settings/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

	const payments = await prisma.payment.findMany()

	return NextResponse.json(payments)
}