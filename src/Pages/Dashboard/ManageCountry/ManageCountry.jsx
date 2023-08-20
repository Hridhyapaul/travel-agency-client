import React, { useState } from 'react';
import useCountry from '../../../Hooks/useCountry';
import ManageCountryCard from './ManageCountryCard';
import Loading from '../../../Shared/Loading';
import { HiOutlineSearch } from 'react-icons/hi';

const ManageCountry = () => {
    const [countries, countryLoading, refetch] = useCountry();
    console.log(countries)

    const [query, setQuery] = useState("")

    if (countryLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='py-20'>
            <h2 className='text-4xl font-body font-semibold text-center pb-4'>Manage Country</h2>

            {/*Start Search Input */}
            <div className="relative w-[400px] mx-auto mt-5">
                <input
                    type="text"
                    onChange={(event) => setQuery(event.target.value)}
                    className="w-full pr-4 pl-12 py-2 border border-hoverColor rounded-md focus:ring focus:ring-designColor focus:border-designColor"
                    placeholder="Search Country Name"
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
                            <tr className='text-center text-[14px]'>
                                <th className='py-6'></th>
                                <th className='py-6'>Image</th>
                                <th className='py-6'>Country Name</th>
                                <th className='py-6'>Country Slogan</th>
                                <th className='py-6'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white'>
                            {
                                countries
                                    .filter(place => place.country.toLowerCase().includes(query.toLowerCase()))
                                    .map((country, index) => <ManageCountryCard key={country._id} country={country} index={index} refetch={refetch}></ManageCountryCard>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageCountry;