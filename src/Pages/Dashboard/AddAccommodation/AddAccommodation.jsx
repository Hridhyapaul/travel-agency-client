import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2';

const image_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const AddAccommodation = () => {
    const { register, handleSubmit, reset, control } = useForm();

    const onSubmit = async data => {
        console.log(data);
        try {
            // ===== Include Services =====
            const includedServices = data.services.split(';').map(service => service.trim());

            // ===== Tour plan =====
            const inputTourPlanLines = data.tourPlan.split('\n');

            const tourPlan = inputTourPlanLines.map((line, index) => {
                const dayObj = { day: index + 1, activities: [] };
                const activities = line.split(';').map(activity => activity.trim());
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
                const accommodationDetails = {
                    name: data.name,
                    image: uploadedUrls,
                    countryName: data.country,
                    location: data.location,
                    about: data.about,
                    numberOfDay: parseFloat(data.duration),
                    price: parseFloat(data.price),
                    details: data.details,
                    reviews: [],
                    tourPlan: tourPlan,
                    includedServices: includedServices,
                };
                console.log(accommodationDetails);

                try {
                    const res = await axios.post('http://localhost:5000/destinations', accommodationDetails, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (res.data.insertedId) {
                        reset();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'You have successfully added a Accommodation!',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                } catch (error) {
                    console.error('Error adding accommodation:', error);
                }
            }
        }
        catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center font-body py-20">
            <div>
                <h1 className="text-3xl font-bold mb-10 text-center">Add Accommodation</h1>
                <div className="w-[800px] bg-white rounded shadow-md p-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-8">

                            {/* ======== Accommodation Name ======== */}
                            <div className='col-span-1'>
                                <label htmlFor="name" className="block mb-1 font-medium">
                                    Accommodation Name
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: true })}
                                    placeholder='Accommodation name'
                                    className="w-full py-2 border-2 pl-3 rounded-lg border-gray-300 focus:outline-none focus:ring-[#082A5E] focus:border-[#082A5E]"
                                />
                            </div>

                            {/* ======== Country Name ======== */}
                            <div className='col-span-1'>
                                <label htmlFor="countryName" className="block mb-1 font-medium">
                                    Country Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder='Country'
                                        {...register("country", { required: true })}
                                        className="w-full py-2 border-2 pl-3 rounded-lg border-gray-300 focus:outline-none focus:ring-bodyColor focus:border-bodyColor"
                                    />
                                </div>
                            </div>

                            {/* ======== Accommodation Image ======== */}
                            <div className='col-span-1'>
                                <label htmlFor="image" className="block mb-1 font-medium">
                                    Accommodation Image
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    {...register("image", { required: true })}
                                    className="file-input mt-3 file-input-sm w-full max-w-xs" />
                            </div>

                            {/* ======== Location Name ======== */}
                            <div className='col-span-1'>
                                <label htmlFor="location" className="block mb-1 font-medium">
                                    Accommodation Location
                                </label>
                                <input
                                    type="text"
                                    placeholder='Location'
                                    {...register("location", { required: true })}
                                    className="w-full py-2 border-2 pl-3 rounded-lg border-gray-300 focus:outline-none focus:ring-bodyColor focus:border-bodyColor"
                                />
                            </div>

                            {/* ======== About Tour in one line ======== */}
                            <div className='col-span-2'>
                                <label htmlFor="about" className="block mb-1 font-medium">
                                    Accommodation Summary
                                </label>
                                <input
                                    type="text"
                                    placeholder='Summarize in 5-6 letters'
                                    {...register("about", { required: true })}
                                    className="w-full py-2 border-2 pl-3 rounded-lg border-gray-300 focus:outline-none focus:ring-bodyColor focus:border-bodyColor"
                                />
                            </div>

                            {/* ======== Tour Duration ======== */}
                            <div className='col-span-1'>
                                <label htmlFor="tourDuration" className="block mb-1 font-medium">
                                    Tour Duration
                                </label>
                                <input
                                    type="number"
                                    min="0" step="any"
                                    {...register("duration", { required: true })}
                                    placeholder='Enter Tour Duration'
                                    className="w-full py-2 border-2 px-3 rounded-lg border-gray-300 focus:outline-none focus:ring-bodyColor focus:border-bodyColor"
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
                                    className="w-full py-2 border-2 px-3 rounded-lg border-gray-300 focus:outline-none focus:ring-bodyColor focus:border-bodyColor"
                                ></input>
                            </div>

                            {/* ======== Details ======== */}
                            <div className='col-span-2'>
                                <label htmlFor="information" className="block mb-1 font-medium">
                                    Accommodation Information
                                </label>
                                <textarea
                                    {...register("details", { required: true })}
                                    type="text"
                                    placeholder='Provide Accommodation Details'
                                    className="w-full py-2 border-2 px-3 rounded-lg border-gray-300 focus:outline-none focus:ring-bodyColor focus:border-bodyColor"
                                    rows="6"
                                ></textarea>
                            </div>

                            {/* ======== Tour Plan ======== */}
                            <Controller
                                name="tourPlan"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <div className='col-span-2'>
                                        <label htmlFor="tourPlan" className="block mb-1 font-medium">
                                            Itinerary Details
                                        </label>
                                        <textarea
                                            type="text"
                                            {...field}
                                            placeholder='Outline Travel Plan'
                                            className="w-full py-2 border-2 px-3 rounded-lg border-gray-300 focus:outline-none focus:ring-bodyColor focus:border-bodyColor"
                                            rows="6"
                                        // value={tourPlan}
                                        />
                                        <p className="mt-2 text-sm text-gray-500">
                                            Format each day's activities with a new line and separate activities with semicolons (;), e.g.,
                                            <br />
                                            Day 1: Activity A; Activity B; Activity C
                                            <br />
                                            Day 2: Activity D; Activity E; Activity F
                                            <br />
                                            Day 3: Activity G; Activity H; Activity I
                                        </p>
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
                                        <label htmlFor="services" className="block mb-1 font-medium">
                                            Provide Services
                                        </label>
                                        <textarea
                                            type="text"
                                            {...field}
                                            placeholder='List of Provided Services'
                                            className="w-full py-2 border-2 px-3 rounded-lg border-gray-300 focus:outline-none focus:ring-bodyColor focus:border-bodyColor"
                                            rows="6"
                                        />
                                        <p className="mt-2 text-sm text-gray-500">
                                            Separate each service with a semicolon (;), e.g., Service A; Service B; Service C
                                        </p>
                                    </div>
                                )}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-bodyColor text-white rounded py-2 px-4 font-semibold mt-8 mb-4"
                        >
                            Add Accommodation
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAccommodation;