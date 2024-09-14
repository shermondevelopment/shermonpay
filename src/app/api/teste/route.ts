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
 const data: Payment = await req.json()

 return NextResponse.json(data)
}