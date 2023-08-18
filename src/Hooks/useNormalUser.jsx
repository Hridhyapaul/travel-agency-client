import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useNormalUser = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: isTraveler, isLoading: isTravelerLoading } = useQuery({
        queryKey: ['isTraveler', user?.email],
        enabled: !!user?.email && !!localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/traveler/${user?.email}`)
            console.log('is traveler response', res)
            return res.data.traveler
        }
    })
    return [isTraveler, isTravelerLoading]
};

export default useNormalUser;