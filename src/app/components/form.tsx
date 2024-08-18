'use client'

import { InputNumber } from 'primereact/inputnumber';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button'
import axios from 'axios';
import {QRCodeSVG} from 'qrcode.react';



export const FormReceivePayment = () => {
	let time: NodeJS.Timeout | undefined = undefined;

	const [value, setValue] = useState<number | null>()
	const [link, setLink] = useState<string | undefined>()
	const [loading, setLoading] = useState(false)
	const [paymentStatus, setPaymentStatus] = useState('')

	const interval = useRef<NodeJS.Timeout>();



	const checkPayment =  async (identifierPayment: string) => {
		const response = await axios.get<any>(`/api/payments/${identifierPayment}`)

        if(response.data?.status) {
			setPaymentStatus(response.data?.status)

			clearInterval(time)
		}
		
	}

	const initializeCheck = (identifierPayment: string) => {

		if(time) {
			clearInterval(time)
		}

		time = setInterval(() => {
			checkPayment(identifierPayment)
			console.log('entrei')
		}, 4000)
	}


	const createPayment = async () => {
		try {
		  setLoading(true)
		  const token = await axios.post('/api/payments', { value })

		  setLink(token.data.redirectURI);
		  initializeCheck(token.data?.identificadorPagamento)
		} catch (err) {
			console.log(err)
		} finally {
			setLoading(false)
		}
	}
	



	return (
		<div className="w-full h-screen  flex justify-content-center align-items-center">
			<div className="flex flex-column">
			 {link && (
				<div className="flex justify-content-center flex-column justify-center align-items-center">
				 <p className='w-max'>
			      {paymentStatus !== 'aceito' && (
					 <QRCodeSVG value={link ?? ''} width={300} height={300} />
				  )}
			     </p>
				 <p className="mt-5 flex flex-column">
					{(paymentStatus !== 'aceito' && paymentStatus !== 'expirado') && 'Aguardando pagamento....'} 
					{paymentStatus === 'aceito' && (
						<div className="flex flex-column align-items-center">
							<i className="pi pi-check" style={{ fontSize: '10rem', color: 'green' }}></i>
							<span className="mt-5">Pagamento Aprovado</span>
						</div>
					)}
					{paymentStatus === 'expirado' && (
						<div className="flex flex-column align-items-center">
						  <i className="pi pi-times" style={{ fontSize: '10rem', color: 'red' }}></i>
						<span className="mt-5">Link expirado</span>
					</div>
					)}
				 </p>
				</div>
			 )}
			 {!link && (
				<>
				  <h1>Vamos começar?</h1>
			      <h5 className="mt-4 mb-2">Qunato você deseja pagar?</h5>
			      <InputNumber value={value} onChange={(e) => setValue(e.value)} locale="pt-BR" minFractionDigits={2} className="w-full" inputClassName="w-full" />
			      <Button 
				    className="mt-3 text-center flex justify-content-center" 
					disabled={!value || loading} onClick={createPayment} 
					>
						<span className="">
							{loading && 'Aguarde'}
							{!loading && 'Pagar'}
						</span>
					</Button>
				</>
			 )}
			 {(paymentStatus === 'aceito' || paymentStatus !== '' )&& (
				<Button 
				className="mt-8 text-center flex justify-content-center" 
				onClick={() => {
					setValue(null)
					setPaymentStatus('')
					setLoading(false)
					setLink(undefined)
				}}
				>
					<span className="">
						Gerar novo pagamento
					</span>
				</Button>
			 )}
			</div>
		</div>
	)
}