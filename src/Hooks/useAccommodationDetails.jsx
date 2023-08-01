import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
const useAccommodationDetails = ({country, id}) => {
    // const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: rooms = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['rooms'],
        // enabled: !!user?.email && !! localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosSecure.get(`/accommodation/${country}/${id}`);
            return res.data;
        }
    })

    return [rooms, refetch, loading]
};

export default useAccommodationDetails;