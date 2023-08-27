import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useTookService = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: tookService, isLoading: isTookServiceLoading } = useQuery({
        queryKey: ['tookService', user?.email],
        enabled: !!user?.email && !!localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/tookService/${user?.email}`)
            console.log('is tookService', res)
            console.log(res.data)
            return res.data.tookService
        }
    })
    return [tookService, isTookServiceLoading]
};

export default useTookService;