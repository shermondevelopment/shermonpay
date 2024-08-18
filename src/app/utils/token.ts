import dayjs from 'dayjs';
import { createClient } from 'redis';
import fs from 'node:fs'
import https from 'https'
import axios from "axios";



export const client = createClient({
	password: '61ZDLA3AkvByydYXFZjCit7WjqThaiDr',
	socket: {
		host: 'redis-17605.c52.us-east-1-4.ec2.redns.redis-cloud.com',
		port: 17605
	}
});

export const tokenExpired = async () => {
	if (!client.isOpen) {
		await client.connect()
	}

	const tokenExpired = await client.get('tokenexpire')
	const token = await client.get('token')

	const diff = dayjs().diff(tokenExpired, 'minutes')

	if (!token) {
		return true
	}

	if (-5 < diff) {
		return true
	}

	return false
}

export const generateToken = async () => {
	var certificado = fs.readFileSync("./producao.p12");
	var data = JSON.stringify({ grant_type: "client_credentials" });
	var data_credentials = process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET

	// Codificando as credenciais em base64
	var auth = Buffer.from(data_credentials).toString("base64");

	const agent = new https.Agent({
		pfx: certificado,
		passphrase: "",
	});
	//Consumo em desenvolvimento da rota post oauth/token
	var config = {
		method: "POST",
		url: "https://openfinance.api.efipay.com.br/v1/oauth/token",
		headers: {
			Authorization: "Basic " + auth,
			"Content-Type": "application/json",
		},
		httpsAgent: agent,
		data: data,
	};

	const response = await axios(config)
	client.set('token', response.data.access_token)
	client.set('tokenexpire', `${dayjs().add(3600, 'seconds')}`)
	return response.data.access_token
}

export const getToken = async () => {
	if (!client.isOpen) {
		await client.connect()
	}

	return client.get('token')
}

