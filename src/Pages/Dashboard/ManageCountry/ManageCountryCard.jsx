import React, { useState } from 'react';
import { HiPencilAlt, HiX } from 'react-icons/hi';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const image_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const ManageCountryCard = ({ country: countryName, index, refetch }) => {
    const { _id, country, countryImage, slogan } = countryName;
    console.log(country)

    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

    const [showEditModal, setShowEditModal] = useState(false);

    const handleOpenEditModal = () => {
        setShowEditModal(true);
    };

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`
    const onSubmit = async data => {
        console.log(data)

        let imgURL = countryImage;
        let previousSlogan = slogan

        if (data.image.lenght > 0) {
            const formData = new FormData();
            formData.append('image', data.image[0])
            const response = await axios.post(
                img_hosting_url,
                formData
            );
            console.log(response)
            if (response.data.success) {
                imgURL = response.data.data.display_url;
            }
        }

        const updatedCountry = {
            country: data.name.charAt(0).toUpperCase() + data.name.slice(1),
            slogan: data.slogan === '' ? previousSlogan : data.slogan,
            countryImage: imgURL
        }
        console.log(updatedCountry)
        try {
            const res = await axios.put(`http://localhost:5000/countries/${_id}`, updatedCountry, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(res.data)

            if (res.data.modifiedCount > 0) {
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'You have successfully added Country!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setShowEditModal(false);
            }
        } catch (error) {
            console.error('Error adding country:', error);
        }

    }

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
            <td className='space-x-2'>
                <button onClick={() => handleDeleteDestination(_id, country)} className="btn btn-circle bg-bodyColor text-lightText hover:bg-bodyColor">
                    <HiX className='h-5 w-5'></HiX>
                </button>
                <button onClick={handleOpenEditModal} className="btn btn-circle bg-bodyColor text-lightText hover:bg-bodyColor">
                    <HiPencilAlt className='h-5 w-5'></HiPencilAlt>
                </button>
            </td>

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 z-30 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="relative w-[800px] bg-white rounded shadow-md p-12">
                        <div className='absolute z-30 top-2 right-2 cursor-pointer m-2' onClick={() => setShowEditModal(false)}>
                            <div className='bg-bodyColor h-8 w-8 rounded-full flex justify-center items-center p-2'>
                                <HiX className='text-white' size={22}></HiX>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-2 gap-8">

                                {/* ======== Country Name ======== */}
                                <div className='col-span-2'>
                                    <label htmlFor="name" className="block mb-1 font-medium">
                                        Country Name
                                    </label>
                                    <input
                                        type="text"
                                        {...register("name")}
                                        placeholder='Country name'
                                        className="w-full py-2 border-2 pl-3 rounded-lg border-gray-300 focus:outline-none focus:ring-[#082A5E] focus:border-[#082A5E]"
                                    />
                                </div>

                                {/* ======== Country Essence ======== */}
                                <div className='col-span-2'>
                                    <label htmlFor="slogan" className="block mb-1 font-medium">
                                        Essence
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder='Motto of Country'
                                            {...register("slogan")}
                                            className="w-full py-2 border-2 pl-3 rounded-lg border-gray-300 focus:outline-none focus:ring-bodyColor focus:border-bodyColor"
                                        />
                                    </div>
                                </div>

                                {/* ======== Country Image ======== */}
                                <div className='col-span-2'>
                                    <label htmlFor="image" className="block mb-1 font-medium">
                                        Country Image
                                    </label>
                                    <input
                                        type="file"
                                        {...register("image")}
                                        className="file-input mt-3 file-input-sm w-full max-w-xs" />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-bodyColor text-white rounded py-2 px-4 font-semibold mt-8"
                            >
                                Update Country
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </tr>
    );
};

export default ManageCountryCard;