import PaymentTable from "./components/paymenttaable";

export const revalidate = 0;

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";


// eslint-disable-next-line @next/next/no-async-client-component
export default async function Payment() {
	return (
		<>
			<PaymentTable />
		</>
	)
}

