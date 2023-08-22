import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useUsersContactMessage = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { data: userMessageCollection = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['userMessageCollection'],
        // enabled: !!user?.email && !! localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosSecure.get(`/message?email=${user?.email}`);
            return res.data;
        }
    })

    return [userMessageCollection, refetch, loading]
};

export default useUsersContactMessage;