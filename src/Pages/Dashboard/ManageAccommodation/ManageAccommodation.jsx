import React from 'react';
import usePopularDestination from '../../../Hooks/usePopularDestination';
import ManageAccommodationCard from './ManageAccommodationCard';
import Loading from '../../../Shared/Loading';

const ManageAccommodation = () => {
    const [destinations, loading, refetch] = usePopularDestination();
    console.log(destinations)

    if(loading){
        return <Loading></Loading>
    }

    return (
        <div className='py-20'>
            <h2 className='text-4xl font-body font-semibold text-center pb-4'>Manage Accommodation</h2>
            <div className='mt-8'>
                <div className="overflow-x-auto">
                    <table className="table font-body">
                        {/* head */}
                        <thead className='bg-designColor text-white'>
                            <tr className='text-center text-[14px] rounded-lg'>
                                <th className='py-5'></th>
                                <th className='py-5'>Accommodation Name <br />& Accommodation id</th>
                                <th className='py-5'>Country Name <br />& Location</th>
                                <th className='py-5'>Price/person</th>
                                <th className='py-5'>Action</th>
                                <th className='py-5'>Update</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white'>
                            {
                                destinations.map((destination, index) => <ManageAccommodationCard key={destination._id} destination={destination} index={index} refetch={refetch}></ManageAccommodationCard>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageAccommodation;