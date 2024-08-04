import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

 
type ResponseData = {
  message: string
}

export interface Payment {
  identificadorPagamento: string
  valor: string
  status: string
  dataCriacao: string
  endToEndId: string
  idProprio: string
  motivo: string
}

 
export async function POST(req: Request) {
 const payment: Payment = await req.json()
 

 const prisma = new PrismaClient()

 await prisma.payment.create({
  data: {
    dateCreate: payment.dataCriacao,
    endToEndId: payment.endToEndId,
    reason: payment?.motivo ?? '',
    identifierPayment: payment.identificadorPagamento,
    status: payment.status,
    value: payment.valor,
  }
 })

 return NextResponse.json({})
}