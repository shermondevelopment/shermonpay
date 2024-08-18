import prisma from "@/settings/prisma";
import { NextResponse } from "next/server";
import fs from 'node:fs'
import https from 'https'
import crypto from 'crypto'
import { generateToken, getToken, tokenExpired } from "@/app/utils/token";
import axios from "axios";
import { nanoid } from "nanoid";

var certificado = fs.readFileSync("./producao.p12");

const api = axios.create({
	httpsAgent: new https.Agent({ keepAlive: true, pfx: certificado, passphrase: "", }),
});


export async function GET(req: Request) {

	const payments = await prisma.payment.findMany({
		orderBy: {
			created_at: 'desc'
		}
	})

	return NextResponse.json(payments)
}

export async function POST(req: Request) {

	try {

		const { value } = await req.json()

		const expired = await tokenExpired()

		if (expired) {
			await generateToken()
		}

		const token = await getToken()

		const data = JSON.stringify({
			pagador: {
				idParticipante: "75db457a-612d-4d62-b557-ba9d32b05216",
				cpf: "07526519351"
			},
			favorecido: {
				contaBanco: {
					codigoBanco: "18236120",
					agencia: "0001",
					documento: "07526519351",
					nome: "Vitor shermon",
					conta: "46125210",
					tipoConta: "CACC"
				}
			},
			detalhes: {
				valor: value.toFixed(2),
				infoPagador: "Cobrança referente ao pedido X",
				idProprio: nanoid()
			}
		},)

		const hash = crypto.randomBytes(20).toString('hex')


		const response = await api.post('https://openfinance.api.efipay.com.br/v1/pagamentos/pix', data, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
				"x-idempotency-key": `${hash}`
			}
		})



		return NextResponse.json(response.data)
	} catch (err) {
		console.log(err)
	}
}