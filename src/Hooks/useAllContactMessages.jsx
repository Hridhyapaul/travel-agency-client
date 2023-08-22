import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAllContactMessages = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: allContactMessages = [], isLoading: MessagesLoading, refetch } = useQuery({
        queryKey: ['allContactMessages'],
        // enabled: !!user?.email && !! localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosSecure.get('/contactMessage');
            return res.data;
        }
    })

    return [allContactMessages, refetch, MessagesLoading]
};

export default useAllContactMessages;