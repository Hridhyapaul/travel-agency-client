import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllBooking = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: bookings = [], isLoading: bookingsLoading, refetch } = useQuery({
        queryKey: ['bookings'],
        // enabled: !!user?.email && !! localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosSecure.get('/allBooking');
            return res.data;
        }
    })

    return [bookings, refetch, bookingsLoading]
};

export default useAllBooking;