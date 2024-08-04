import prisma from "@/settings/prisma";
import PaymentTable from "./components/paymenttaable";

export default async function Payment() {

	const payments = await prisma.payment.findMany()

	return (
		<>
			<PaymentTable payments={payments} />
		</>
	)
}

