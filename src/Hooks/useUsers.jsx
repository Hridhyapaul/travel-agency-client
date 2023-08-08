import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useUsers = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: users = [], isLoading: userLoading, refetch } = useQuery({
        queryKey: ['users'],
        // enabled: !!user?.email && !! localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    return [users, userLoading , refetch]
};

export default useUsers;