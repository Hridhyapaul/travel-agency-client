import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
const useAccommodationDetails = ({id}) => {
    // const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: rooms = [], isLoading: roomLoading, refetch } = useQuery({
        queryKey: ['rooms'],
        // enabled: !!user?.email && !! localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosSecure.get(`/accommodation/${id}`);
            return res.data;
        }
    })

    return [rooms, refetch, roomLoading]
};

export default useAccommodationDetails;