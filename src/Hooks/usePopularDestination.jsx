// import useAuth from "./useAuth";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePopularDestination = () => {
    // const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: destinations = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['destinations'],
        // enabled: !!user?.email && !! localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosSecure.get('/destinations');
            return res.data;
        }
    })

    return [destinations, loading, refetch]

};

export default usePopularDestination;