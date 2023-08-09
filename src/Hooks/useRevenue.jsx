import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRevenue = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: allPayments = [], isLoading: paymentsLoading, refetch } = useQuery({
        queryKey: ['allPayments'],
        // enabled: !!user?.email && !! localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosSecure.get('/allPayments');
            return res.data;
        }
    })

    return [allPayments, paymentsLoading , refetch]
};

export default useRevenue;