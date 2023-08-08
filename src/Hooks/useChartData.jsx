import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useChartData = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: chartData = [], isLoading: bookingsLoading, refetch } = useQuery({
        queryKey: ['chartData'],
        // enabled: !!user?.email && !! localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosSecure.get('/countryStats');
            return res.data;
        }
    })

    return [chartData, refetch, bookingsLoading]
};

export default useChartData;