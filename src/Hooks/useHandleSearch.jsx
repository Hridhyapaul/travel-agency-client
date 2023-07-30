// import useAuth from "./useAuth";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useHandleSearch = ({ searchText }) => {
    // const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: services = [], isLoading: loadingServices, refetch: refetchServices } = useQuery({
        queryKey: ['services'],
        // enabled: !!user?.email && !! localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosSecure.get(`/packageSearch/${searchText}`);
            return res.data;
        }
    })

    return [services, refetchServices, loadingServices]

};

export default useHandleSearch;