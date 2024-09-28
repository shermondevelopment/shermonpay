import { Payments, PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

 
type ResponseData = {
  message: string
}

 
export async function POST(req: Request) {
 const payment: Payments = await req.json()
 
  
 const prisma = new PrismaClient()

 await prisma.payments.create({
  data: {
    ammount: payment.ammount,
    identifier: payment.identifier,
    redirectURI: payment.redirectURI,
    description: payment.description,
    ownId: payment.ownId,
    reason: payment.reason,
    status: payment.status
  }
 })

 return NextResponse.json({}, {status: 200})
}

export async function GET(req: Request) {
	return NextResponse.json({ message: 'serrver on edited success' })
}