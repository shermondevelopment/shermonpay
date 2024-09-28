import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePayments = () => {

	const queryFn = async () => {
		const { data } = await axios.get('/api/payments')

		return data
	}

	return  useQuery({
		queryKey: ['payments'],
		queryFn,
		refetchInterval: 2000
	})

}

export default usePayments