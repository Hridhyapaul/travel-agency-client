import React from 'react';
import { HiX } from "react-icons/hi";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ManageAccommodationCard = ({ destination, index, refetch }) => {
    console.log(destination)
    const { countryName, _id, location, name, price } = destination;

    const [axiosSecure] = useAxiosSecure();

    const handleDeleteDestination = (id, destinationName) => {
        console.log(id)
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete ${destinationName}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/destinations/${id}`)
                    .then(res => res.data)
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                `${destinationName} has been deleted`,
                                'success'
                            )
                        }
                    })
            }

        })
    }
    return (
        <tr>
            <th>
                <p>{index + 1}</p>
            </th>
            <td>
                <p className='text-center'>{name}</p>
                <hr className='my-2' />
                <div className="text-sm opacity-50">{_id}</div>
            </td>
            <td className='text-center'>
                <p>{countryName}</p>
                <hr className='my-2' />
                <div className="badge badge-ghost">{location}</div>
            </td>
            <td><p className='text-center'>${price}</p></td>
            <td>
                <button onClick={() => handleDeleteDestination(_id, name)} className="btn btn-circle bg-bodyColor text-lightText hover:bg-bodyColor">
                    <HiX className='h-5 w-5 text-white'></HiX>
                </button>
            </td>
            <th>
                <Link to={`/accommodation/${_id}`}>
                    <button className="btn btn-ghost btn-xs" style={{ textTransform: 'capitalize' }}>details</button>
                </Link>
            </th>
        </tr>
    );
};

export default ManageAccommodationCard;