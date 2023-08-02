import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useBook = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: booking = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['booking'],
        // enabled: !!user?.email && !! localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosSecure.get(`/booking?email=${user?.email}`);
            return res.data;
        }
    })

    return [booking, refetch, loading]

};

export default useBook;