import React from 'react';
import useCountry from '../../../Hooks/useCountry';
import ManageCountryCard from './ManageCountryCard';
import Loading from '../../../Shared/Loading';

const ManageCountry = () => {
    const [countries, countryLoading, refetch] = useCountry();
    console.log(countries)

    if (countryLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='py-20'>
            <h2 className='text-4xl font-body font-semibold text-center pb-4'>Manage Country</h2>
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
                                countries.map((country, index) => <ManageCountryCard key={country._id} country={country} index={index} refetch={refetch}></ManageCountryCard>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageCountry;