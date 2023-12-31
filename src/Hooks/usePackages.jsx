// import useAuth from "./useAuth";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePackages = ({text}) => {
    // const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: packages = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['package'],
        // enabled: !!user?.email && !! localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosSecure.get(`/packages/${text}`);
            return res.data;
        }
    })

    return [packages, refetch, loading]

};

export default usePackages;