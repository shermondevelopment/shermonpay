import prisma from "@/settings/prisma";
import PaymentTable from "./components/paymenttaable";

export const revalidate = 0;

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

async function getPayments() {
	return await prisma.payment.findMany({
		orderBy: {
			dateCreate: 'desc'
		}
	})
}

export default async function Payment() {

	const payments = await getPayments()

	return (
		<>
			<PaymentTable payments={payments} />
		</>
	)
}

