import React from 'react';
import { HiX } from 'react-icons/hi';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ManageCountryCard = ({ country: countryName, index, refetch }) => {
    const { _id, country, countryImage, slogan } = countryName;
    console.log(country)

    const [axiosSecure] = useAxiosSecure();

    const handleDeleteDestination = (id, countryName) => {
        console.log({ id, countryName })
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete ${countryName}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/countries/${id}`)
                    .then(res => res.data)
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                `${countryName} has been deleted`,
                                'success'
                            )
                        }
                    })
            }

        })
    }

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
                <hr className='my-2' />
                <div className="text-sm opacity-50">{_id}</div>
            </td>
            <td className='text-center'>
                <p>{slogan}</p>
            </td>
            <td>
                <button onClick={() => handleDeleteDestination(_id, country)} className="btn btn-circle bg-bodyColor text-lightText hover:bg-bodyColor">
                    <HiX className='h-5 w-5'></HiX>
                </button>
            </td>
        </tr>
    );
};

export default ManageCountryCard;