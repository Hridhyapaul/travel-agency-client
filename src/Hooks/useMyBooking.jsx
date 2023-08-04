import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMyBooking = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: bookingCollection = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['bookingCollection'],
        // enabled: !!user?.email && !! localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosSecure.get(`/booking?email=${user?.email}`);
            return res.data;
        }
    })

    return [bookingCollection, refetch, loading]
};

export default useMyBooking;