import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAccommodation = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: accommodations = [], isLoading: accommodationLoading, refetch } = useQuery({
        queryKey: ['accommodations'],
        // enabled: !!user?.email && !! localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosSecure.get('/accommodation');
            return res.data;
        }
    })

    return [accommodations, accommodationLoading, refetch]
};

export default useAccommodation;