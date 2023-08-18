import { useState } from 'react';
import avatar from '../../../assets/Images/placeholder.jpg'
import Swal from 'sweetalert2';

const ManageUsersCard = ({ user, index, refetch }) => {
    console.log(user)
    const { _id, email, name, photo, role } = user

    const [isMadeAdmin, setIsMadeAdmin] = useState(false);
    const [isMadeUser, setIsMadeUser] = useState(false)

    const handleMakeAdmin = (id, userName) => {
        console.log(id)
        setIsMadeAdmin(true);
        setIsMadeUser(true)
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: 'Admin' })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${userName} has been successfully changed to "Admin"`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
    };

    const handleMakeUser = (id, userName) => {
        setIsMadeUser(true)
        setIsMadeAdmin(true)
        console.log(id)
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: 'Traveler' })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${userName} has been successfully changed to "Traveler"`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
    }

    return (
        <tr>
            <th>
                <p>{index + 1}</p>
            </th>
            <td className="text-center">
                <img className="h-[50px] w-[50px] rounded-full" src={photo || avatar} alt={name} />
            </td>

            <td><p className='text-center'>{name}</p></td>

            <td>
                <p className='text-center'>{email}</p>
            </td>

            <td>
                <p className='text-center'>{role}</p>
            </td>

            <td>
                <div>
                    <button
                        onClick={() => handleMakeAdmin(_id, name)}
                        disabled={isMadeAdmin}
                        className={`${isMadeAdmin ? 'bg-designColor text-black bg-opacity-50 opacity-50 cursor-not-allowed py-1 px-3 rounded-lg font-bold mt-2' : 'bg-designColor text-white py-1 px-3 rounded-lg font-semibold mt-2 transform hover:scale-105 duration-300'} `}
                    >
                        Make Admin
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => handleMakeUser(_id, name)}
                        disabled={isMadeUser}
                        className={`${isMadeUser ? 'bg-designColor text-black bg-opacity-50 opacity-50 cursor-not-allowed py-1 px-3 rounded-lg font-bold mt-2' : 'bg-designColor text-white py-1 px-3 rounded-lg font-semibold mt-2 transform hover:scale-105 duration-300'} `}
                    >
                        Make Traveler
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default ManageUsersCard;