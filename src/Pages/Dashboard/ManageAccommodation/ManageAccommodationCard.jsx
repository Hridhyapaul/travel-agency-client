import React from 'react';

const ManageAccommodationCard = ({ destination, index }) => {
    console.log(destination)
    const { countryName, _id, location, name, price } = destination;
    return (
        <tr>
            <th>
                <p>{index + 1}</p>
            </th>
            <td>
                <p className='text-center'>${name}</p>
                <hr className='my-2' />
                <div className="text-sm opacity-50">{_id}</div>
            </td>
            <td className='text-center'>
                <p>${countryName}</p>
                <hr className='my-2' />
                <div className="badge badge-ghost">{location}</div>
            </td>
            <td><p className='text-center'>${price}</p></td>
            <td>
                <button className="btn btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </td>
            <th>
                <button className="btn btn-ghost btn-xs" style={{ textTransform: 'capitalize' }}>details</button>
            </th>
        </tr>
    );
};

export default ManageAccommodationCard;