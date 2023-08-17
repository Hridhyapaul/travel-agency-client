import React from 'react';
import useCountry from '../../../Hooks/useCountry';
import ManageCountryCard from './ManageCountryCard';

const ManageCountry = () => {
    const [countries, countryLoading , refetch] = useCountry();
    console.log(countries)
    return (
        <div className='py-20'>
            <h2 className='text-4xl font-body font-semibold text-center pb-4'>Manage Country</h2>
            <hr className='my-4' />
            <div className='mt-8'>
                <div className="overflow-x-auto">
                    <table className="table font-body">
                        {/* head */}
                        <thead>
                            <tr className='text-center text-[14px]'>
                                <th></th>
                                <th>Image</th>
                                <th>Country Name</th>
                                <th>Country Slogan</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
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