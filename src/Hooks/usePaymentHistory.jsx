import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const usePaymentHistory = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const { refetch, data: paymentHistory = [], isLoading: loading } = useQuery({
        queryKey: ['enrolledCourse', user?.email],
        // enabled: !!user?.email && !!localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosSecure(`/payments?email=${user?.email}`);
            return res.data;
        }
    })
    return [paymentHistory, refetch, loading]
};

export default usePaymentHistory;