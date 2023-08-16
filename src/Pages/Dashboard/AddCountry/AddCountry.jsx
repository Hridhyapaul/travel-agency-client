import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';

const image_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const AddCountry = () => {

    const { register, handleSubmit, reset, control } = useForm();

    const onSubmit = async data => {
        console.log(data)
    }

    return (
        <div className='flex justify-center items-center py-20'>
            <div>
                <h1 className="text-3xl font-bold mb-10 text-center">Add Country Details</h1>
                <div className="w-[800px] bg-white rounded shadow-md p-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-8">

                            {/* ======== Country Name ======== */}
                            <div className='col-span-2'>
                                <label htmlFor="name" className="block mb-1 font-medium">
                                    Country Name
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: true })}
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
                                        {...register("slogan", { required: true })}
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
                                    {...register("image", { required: true })}
                                    className="file-input mt-3 file-input-sm w-full max-w-xs" />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-bodyColor text-white rounded py-2 px-4 font-semibold mt-8 mb-4"
                        >
                            Add Country
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCountry;