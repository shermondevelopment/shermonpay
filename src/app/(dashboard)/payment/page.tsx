import prisma from "@/settings/prisma";
import PaymentTable from "./components/paymenttaable";

export default async function Payment() {

	const payments = await prisma.payment.findMany()

	console.log(payments, 'sheron 22')

	return (
		<>
			{JSON.stringify(payments, null, 4)}
			<PaymentTable payments={payments} />
		</>
	)
}

