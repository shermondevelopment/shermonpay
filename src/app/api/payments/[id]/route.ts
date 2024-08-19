import prisma from "@/settings/prisma"
import { NextResponse } from "next/server"

export async function GET(
	req: Request,
	{ params }: { params: { id: string } },
) {

	const creditorAccount = await prisma.payment.findFirst({
		where: {
			identifierPayment: params.id
		},
	})

	if (!creditorAccount) {
		return NextResponse.json(null)
	}

	return NextResponse.json(creditorAccount)
}