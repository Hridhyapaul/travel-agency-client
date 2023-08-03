import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCountry = () => {
    // const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: countries = [], isLoading: countryLoading, refetch } = useQuery({
        queryKey: ['countries'],
        // enabled: !!user?.email && !! localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosSecure.get('/countries');
            return res.data;
        }
    })

    return [countries, countryLoading , refetch]
};

export default useCountry;