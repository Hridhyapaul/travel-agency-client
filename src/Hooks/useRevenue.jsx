import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRevenue = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: revenues = [], isLoading: revenuesLoading, refetch } = useQuery({
        queryKey: ['revenues'],
        // enabled: !!user?.email && !! localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosSecure.get('/allPayments');
            return res.data;
        }
    })

    return [revenues, revenuesLoading , refetch]
};

export default useRevenue;