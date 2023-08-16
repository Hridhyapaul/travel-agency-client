import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
// import Swal from 'sweetalert2';

const image_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const AddAccommodation = () => {
    const { register, handleSubmit, reset, control } = useForm();

    const onSubmit = async data => {
        console.log(data);
        try {
            // ===== Include Services =====
            const includedServices = data.services.split(',').map(service => service.trim());

            // ===== Tour plan =====
            const inputTourPlanLines = data.tourPlan.split('\n');

            const tourPlan = inputTourPlanLines.map((line, index) => {
                const dayObj = { day: index + 1, activities: [] };
                const activities = line.split(',').map(activity => activity.trim());
                dayObj.activities = activities;
                return dayObj;
            });

            // ===== Multiple images =====

            // Convert FileList to an array of files
            const imagesArray = Array.from(data.image);
            console.log(imagesArray)

            const promises = imagesArray.map(async (img) => {
                const formData = new FormData();
                formData.append('image', img);

                const response = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${image_hosting_token}`,
                    formData
                );
                console.log(response)
                return response.data.data.url;
            });

            const uploadedUrls = await Promise.all(promises);
            console.log('Uploaded URLs:', uploadedUrls);

            // Check if all uploads were successful
            const allUploadsSuccessful = uploadedUrls.every(url => url && url.trim() !== '' && url !== null);

            if (allUploadsSuccessful) {
                const classDetails = {
                    name: data.name,
                    image: uploadedUrls,
                    countryName: data.country,
                    location: data.location,
                    about: data.about,
                    numberOfDay: parseFloat(data.duration),
                    price: parseFloat(data.price),
                    details: data.details,
                    reviews: 'Under Review',
                    tourPlan: tourPlan,
                    includedServices: includedServices,
                };
                console.log(classDetails);
            }
        }
        catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-10">Add Accommodation</h1>
            <div className="w-[600px] bg-white rounded shadow-md p-12">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-8">

                        {/* ======== Accommodation Name ======== */}
                        <div className='col-span-2'>
                            <label htmlFor="name" className="block mb-1 font-medium">
                                Accommodation Name
                            </label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                placeholder='Enter Accommodation name'
                                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:ring-[#082A5E] focus:border-[#082A5E]"
                            />
                        </div>

                        {/* ======== Accommodation Image ======== */}
                        <div className='col-span-2'>
                            <label htmlFor="image" className="block mb-1 font-medium">
                                Accommodation Image
                            </label>
                            <input
                                type="file"
                                multiple
                                {...register("image", { required: true })}
                                className="file-input mt-3 file-input-sm w-full max-w-xs" />
                        </div>

                        {/* ======== Country Name ======== */}
                        <div className='col-span-1'>
                            <label htmlFor="password" className="block mb-1 font-medium">
                                Country Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    {...register("country", { required: true })}
                                    className="w-full py-2 border-b border-gray-300 focus:outline-none focus:ring-[#082A5E] focus:border-[#082A5E]"
                                />
                            </div>
                        </div>

                        {/* ======== Location Name ======== */}
                        <div className='col-span-1'>
                            <label htmlFor="confirmPassword" className="block mb-1 font-medium">
                                Location
                            </label>
                            <input
                                type="text"
                                placeholder='Accommodation Location'
                                {...register("location", { required: true })}
                                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:ring-[#082A5E] focus:border-[#082A5E]"
                            />
                        </div>

                        {/* ======== About Tour in one line ======== */}
                        <div className='col-span-2'>
                            <label htmlFor="confirmPassword" className="block mb-1 font-medium">
                                About
                            </label>
                            <input
                                type="text"
                                placeholder='About in one line'
                                {...register("about", { required: true })}
                                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:ring-[#082A5E] focus:border-[#082A5E]"
                            />
                        </div>

                        {/* ======== Tour Duration ======== */}
                        <div className='col-span-1'>
                            <label htmlFor="photoURL" className="block mb-1 font-medium">
                                Tour Duration
                            </label>
                            <input
                                type="number"
                                min="0" step="any"
                                {...register("duration", { required: true })}
                                placeholder='Enter Tour Duration'
                                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:ring-[#082A5E] focus:border-[#082A5E]"
                            />
                        </div>

                        {/* ======== Price ======== */}
                        <div className='col-span-1'>
                            <label htmlFor="price" className="block mb-1 font-medium">
                                Price
                            </label>
                            <input
                                {...register("price", { required: true })}
                                type="number" min="0" step="any"
                                placeholder='Price Per Person'
                                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:ring-[#082A5E] focus:border-[#082A5E]"
                            ></input>
                        </div>

                        {/* ======== Details ======== */}
                        <div className='col-span-2'>
                            <label htmlFor="duration" className="block mb-1 font-medium">
                                Details
                            </label>
                            <input
                                {...register("details", { required: true })}
                                type="text"
                                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:ring-[#082A5E] focus:border-[#082A5E]"
                            ></input>
                        </div>

                        {/* ======== Tour Plan ======== */}
                        <Controller
                            name="tourPlan"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <div className='col-span-2'>
                                    <label htmlFor="modules" className="block mb-1 font-medium">
                                        Tour Plan
                                    </label>
                                    <textarea
                                        {...field}
                                        placeholder='Enter tour plan'
                                        className="w-full py-2 border-b border-gray-300 focus:outline-none focus:ring-[#082A5E] focus:border-[#082A5E]"
                                        rows="4"
                                    // value={tourPlan}
                                    />
                                </div>
                            )}
                        />

                        {/* ======== Included Services ======== */}
                        <Controller
                            name="services"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <div className='col-span-2'>
                                    <label htmlFor="phoneNumber" className="block mb-1 font-medium">
                                        Included Services
                                    </label>
                                    <input
                                        type="text"
                                        {...field}
                                        placeholder='Enter category'
                                        className="w-full py-2 border-b border-gray-300 focus:outline-none focus:ring-[#082A5E] focus:border-[#082A5E]"
                                    />
                                </div>
                            )}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#082A5E] text-white rounded py-2 px-4 font-semibold transform hover:scale-105 duration-300 mt-8 mb-4"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddAccommodation;