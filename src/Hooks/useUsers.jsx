import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useUsers = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: allUsers = [], isLoading: userLoading, refetch } = useQuery({
        queryKey: ['allUsers'],
        // enabled: !!user?.email && !! localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    return [allUsers, userLoading , refetch]
};

export default useUsers;