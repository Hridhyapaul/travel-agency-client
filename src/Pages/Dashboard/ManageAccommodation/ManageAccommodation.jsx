import React, { useState } from 'react';
import usePopularDestination from '../../../Hooks/usePopularDestination';
import ManageAccommodationCard from './ManageAccommodationCard';
import Loading from '../../../Shared/Loading';
import { HiOutlineSearch } from 'react-icons/hi';

const ManageAccommodation = () => {
    const [destinations, loading, refetch] = usePopularDestination();
    console.log(destinations)

    const [query, setQuery] = useState("")

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='py-20'>
            <h2 className='text-4xl font-body font-semibold text-center pb-4'>Manage Accommodation</h2>

            {/*Start Search Input */}
            <div className="relative w-[400px] mx-auto mt-5">
                <input
                    type="text"
                    onChange={(event) => setQuery(event.target.value)}
                    className="w-full pr-4 pl-12 py-2 border border-hoverColor rounded-md focus:ring focus:ring-designColor focus:border-designColor"
                    placeholder="Search Accommodation Name"
                />
                <button className="absolute top-0 left-0 h-full px-3 flex items-center bg-designColor text-white rounded-l-md focus:outline-none focus:ring focus:ring-hoverColor">
                    <HiOutlineSearch className='text-xl'></HiOutlineSearch>
                </button>
            </div>
            {/* End Search Input */}
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
                                destinations
                                .filter(destination => destination.name.toLowerCase().includes(query.toLowerCase()))
                                .map((destination, index) => <ManageAccommodationCard key={destination._id} destination={destination} index={index} refetch={refetch}></ManageAccommodationCard>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageAccommodation;