import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useMostVisitedDestinations = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: popularDestinations = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['popularDestinations'],
        // enabled: !!user?.email && !! localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosSecure.get('/popularDestinations');
            return res.data;
        }
    })

    return [popularDestinations, loading, refetch]
};

export default useMostVisitedDestinations;