import prisma from "@/settings/prisma"
import { NextResponse } from "next/server"

export async function GET(
	req: NextResponse,
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