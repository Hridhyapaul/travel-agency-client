import React from 'react';
import usePopularDestination from '../../../Hooks/usePopularDestination';
import ManageAccommodationCard from './ManageAccommodationCard';

const ManageAccommodation = () => {
    const [destinations, loading, refetch] = usePopularDestination();
    console.log(destinations)
    return (
        <div className='py-20'>
            <h2 className='text-4xl font-body font-semibold text-center pb-4'>Manage Accommodation</h2>
            <hr className='my-4' />
            <div className='mt-8'>
                <div className="overflow-x-auto">
                    <table className="table font-body">
                        {/* head */}
                        <thead>
                            <tr className='text-center text-[14px]'>
                                <th></th>
                                <th>Accommodation Name</th>
                                <th>Country Name</th>
                                <th>Location</th>
                                <th>Price/person</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                destinations.map((destination, index) => <ManageAccommodationCard key={destination._id} destination={destination} index={index}></ManageAccommodationCard>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageAccommodation;