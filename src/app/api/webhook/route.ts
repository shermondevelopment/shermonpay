import { NextResponse } from 'next/server'

 
type ResponseData = {
  message: string
}
 
export async function POST(req: Request) {
 const body = await req.json()
 console.log(body)
 console.log(req)
 return NextResponse.json({})
}