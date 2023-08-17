import React from 'react';

const ManageCountryCard = ({country:countryName, index, refetch}) => {
    const {country, countryImage, slogan} = countryName;
    console.log(country)
    return (
        <tr className='font-body'>
            <th className='text-center'>
                <p>{index + 1}</p>
            </th>
            <td className='text-center'>
                <img className='h-20 w-20 object-cover rounded-lg' src={countryImage} alt="" />
            </td>
            <td className='text-center'>
                <p>{country}</p>
            </td>
            <td className='text-center'>
                <p>{slogan}</p>
            </td>
        </tr>
    );
};

export default ManageCountryCard;