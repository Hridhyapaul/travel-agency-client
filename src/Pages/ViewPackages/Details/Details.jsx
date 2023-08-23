import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useAccommodationDetails from "../../../Hooks/useAccommodationDetails";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import './CSS/Details.css'
import Container from "../../../Shared/Container";
import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import { HiOutlineClock, HiOutlineMap, HiPencilAlt, HiX } from "react-icons/hi";
import { useForm, Controller } from 'react-hook-form';
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../../Shared/Loading";
import useAdmin from "../../../Hooks/useAdmin";
import { useEffect, useState } from "react";
import axios from "axios";
import ReviewInput from "./ReviewInput";
import TravelerReview from "./TravelerReview";
import useNormalUser from "../../../Hooks/useNormalUser";

const Details = () => {
    const { id } = useParams();
    const { user } = useAuth();
    console.log(user)
    const [isAdmin] = useAdmin();
    const [isTraveler] = useNormalUser();
    const navigate = useNavigate();
    const location = useLocation();
    const [rooms, refetch, loading] = useAccommodationDetails({ id })
    console.log(rooms)
    const { _id, countryName, image, name, numberOfDay, price, reviews, details, location: place, includedServices, tourPlan, about } = rooms;

    const totalRatings = reviews?.reduce((sum, review) => sum + review?.rating, 0);

    let averageRating = 0
    if (reviews?.length > 0) {
        averageRating = totalRatings / reviews?.length;
    }


    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();

    const customStyles = {
        itemShapes: ThinRoundedStar,
        activeFillColor: '#f59e0b',
        inactiveFillColor: '#ECEEEF',
    };

    // ===== Start getting Booking data =====
    const handleBookingSubmit = data => {
        console.log(data)
        if (user && user.email) {
            const bookingInput = { country: countryName, accommodation: name, accommodation_id: _id, price: price, name: data.name, email: data.email, phoneNumber: data.phone, tickets: parseInt(data.ticket), date: data.date, message: data.message }

            console.log(bookingInput)
            fetch('http://localhost:5000/booking', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(bookingInput)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.insertedId) {
                        reset()
                        refetch()
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your booking requests are being reviewed. To confirm your booking, click on the "Pay for Booking" button',
                            showConfirmButton: false,
                            timer: 3500
                        })
                    }
                })
        } else {
            Swal.fire({
                title: 'Please login to book this accommodation',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }
    // <===== End getting Booking data =====>

    // <===== Start getting update accommodation data =====>
    const [showEditModal, setShowEditModal] = useState(false);

    const handleOpenEditModal = () => {
        setShowEditModal(true);
    };

    const handleUpdateSubmit = async data => {
        console.log(data)

        let uploadedUrls = image;
        let updateName = name;
        let updateAbout = about;
        let updateCountryName = countryName;
        let updateDetails = details;
        let updateIncludedServices = includedServices;
        let updateLocation = place;
        let updateNumberOfDay = numberOfDay;
        let updatePrice = price;
        let updateTourPlan = tourPlan;


        // <===== Multiple images =====>

        // Convert FileList to an array of files
        if (data.image.lenght > 0) {
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
        }

        if (data.name !== "") {
            updateName = data.name;
        }

        if (data.about !== "") {
            updateAbout = data.about;
        }

        if (data.country !== "") {
            updateCountryName = data.country;
        }

        if (data.details !== "") {
            updateDetails = data.details;
        }

        if (data.duration !== "") {
            updateNumberOfDay = parseFloat(data.duration);
        }

        if (data.price !== "") {
            updatePrice = parseFloat(data.price);
        }

        // ===== Include Services =====
        if (data.services !== "") {
            updateIncludedServices = data.services.split(';').map(service => service.trim());
        }

        // ===== Tour plan =====
        const inputTourPlanLines = data.tourPlan.split('\n');

        if (data.tourPlan !== "") {
            updateTourPlan = inputTourPlanLines.map((line, index) => {
                const dayObj = { day: index + 1, activities: [] };
                const activities = line.split(';').map(activity => activity.trim());
                dayObj.activities = activities;
                return dayObj;
            });
        }


        // Check if all uploads were successful
        const allUploadsSuccessful = uploadedUrls.every(url => url && url.trim() !== '' && url !== null);

        if (allUploadsSuccessful) {
            const accommodationDetails = {
                name: updateName,
                image: uploadedUrls,
                countryName: updateCountryName,
                location: updateLocation,
                about: updateAbout,
                numberOfDay: updateNumberOfDay,
                price: updatePrice,
                details: updateDetails,
                reviews: reviews,
                tourPlan: updateTourPlan,
                includedServices: updateIncludedServices,
            };

            console.log(accommodationDetails);

            try {
                const res = await axios.put(`http://localhost:5000/destinations/${_id}`, accommodationDetails, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log(res.data)

                if (res.data.modifiedCount > 0) {
                    reset();
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'You have successfully updated accommodation!',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setShowEditModal(false);
                }
            } catch (error) {
                console.error('Error adding country:', error);
            }
        }

    }

    // Add an effect to disable body scrolling when the modal is open
    useEffect(() => {
        if (showEditModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup the effect
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showEditModal]);
    // <===== End getting update accommodation data =====>

    if (loading) {
        return <Loading></Loading>; // or display an error message
    }

    return (
        <div className="bg-bgColor">
            <div>
                <Carousel className="main-slide text-center h-7">
                    {
                        image.map((item, index) => (
                            <img key={index} src={item} alt="" />
                        ))
                    }
                </Carousel>
            </div>

            <div className="mt-[600px] pb-24">
                <Container>
                    <div className={`${isAdmin ? '' : 'grid grid-cols-6 gap-8'}`}>
                        <div className="col-span-4 font-body text-bodyColor">

                            <div className="bg-white w-fit px-4 py-2 rounded-lg">
                                <div className="flex justify-start items-center gap-2 text-bodyColor">
                                    <Rating
                                        style={{ maxWidth: 90 }}
                                        value={averageRating}
                                        itemStyles={customStyles}
                                        readOnly
                                        className=""
                                    />
                                    <p className="text-[14px]">{averageRating.toFixed(1)}</p>
                                    <p className="text-[14px]">({reviews.length < 10 ? `0${reviews.length}` : reviews.length} Reviews)</p>
                                </div>
                            </div>

                            <div className="space-y-4 mt-2">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h1 className="text-4xl font-semibold">{name}</h1>
                                        <p className="font-semibold "><span className="text-[24px] text-designColor">${price}</span>{" "} <span className="text-[18px]">/ Per person</span></p>
                                    </div>
                                    {
                                        isAdmin && (
                                            <>
                                                <div>
                                                    <div className="flex justify-end">
                                                        <button
                                                            onClick={handleOpenEditModal}
                                                            className="flex justify-center items-center bg-bodyColor px-4 py-2 rounded-lg text-lightText font-semibold space-x-2">
                                                            <HiPencilAlt></HiPencilAlt> <p>Update Accommodation</p>
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                </div>


                                <div className="space-y-8 bg-white px-6 py-4 rounded-lg">
                                    {/* Overview and details */}
                                    <div className="space-y-2">
                                        <h1 className="text-3xl font-semibold">Overview</h1>
                                        <p>{details}</p>
                                    </div>

                                    {/* Location & Tour duration */}
                                    <div className="bg-bgColor flex justify-center items-center px-6 py-4 font-medium rounded-lg">
                                        <div className="w-[40%] text-center flex justify-center items-center gap-2"><HiOutlineClock className="text-lg text-designColor"></HiOutlineClock> 0{numberOfDay} Days</div>
                                        <div className="w-[60%] text-center flex justify-center items-center gap-2 border-l-[2px]"><HiOutlineMap className="text-lg text-designColor"></HiOutlineMap> {place}</div>
                                    </div>

                                    {/* Services */}
                                    <div className="space-y-2">
                                        <h1 className="text-3xl font-semibold">Service of {name}</h1>
                                        <ul className="check-list space-y-1">
                                            {
                                                includedServices.map((service, index) => (
                                                    <li key={index}>{service}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>

                                    {/* Tour Plan */}
                                    <div className="space-y-2">
                                        <h1 className="text-3xl font-semibold">Tour Plan</h1>
                                        <div className="space-y-6">
                                            {
                                                tourPlan.map((plan, index) => (
                                                    <div key={index} className="flex justify-start items-start gap-4">
                                                        <div className="h-[60px] w-[60px] rounded-full bg-designColor border-[5px] border-white shadow-lg flex justify-center items-center">
                                                            <p className="text-lg font-semibold text-white">0{plan.day}</p>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <h3 className="text-xl font-semibold">Day {plan.day}</h3>
                                                            <ul className="space-y-[1px] list-disc list-inside">{plan.activities.map((list, index) => (
                                                                <li key={index}>{list}</li>
                                                            ))}</ul>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Review */}
                            <TravelerReview reviews={reviews} name={name}></TravelerReview>
                        </div>
                        {/* Right Column */}
                        {!isAdmin && (
                            <>
                                <div className="col-span-2">
                                    <div>
                                        <div className="w-full bg-white rounded shadow-md p-12">
                                            <form onSubmit={handleSubmit(handleBookingSubmit)}>
                                                <div className="space-y-8">

                                                    {/* Name field */}
                                                    <div>
                                                        <label htmlFor="name" className="block mb-1 font-medium">
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            {...register("name", { required: true })}
                                                            placeholder='Enter Your Name'
                                                            value={user?.displayName}
                                                            className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-designColor"

                                                        />
                                                        {errors.name && <p className="mt-2 text-[#CC0000]">Name field is required</p>}
                                                    </div>

                                                    {/* Email field */}
                                                    <div>
                                                        <label htmlFor="email" className="block mb-1 font-medium">
                                                            Email
                                                        </label>
                                                        <input
                                                            type="email"
                                                            {...register("email", { required: true })}
                                                            placeholder='Enter Your Email'
                                                            value={user?.email}
                                                            className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-designColor"

                                                        />
                                                        {errors.email && <p className="mt-2 text-[#CC0000]">Email field is required</p>}
                                                    </div>

                                                    {/* Phone number field */}
                                                    <div>
                                                        <label htmlFor="phone" className="block mb-1 font-medium">
                                                            Phone
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                type="tel"
                                                                {...register("phone", {
                                                                    required: true,
                                                                })}
                                                                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-designColor"
                                                                placeholder="Phone Number"
                                                            />
                                                            {errors.phone && <p className="mt-2 text-[#CC0000]">Phone field is required</p>}
                                                        </div>
                                                    </div>

                                                    {/* Tickets field */}
                                                    <div>
                                                        <label htmlFor="ticket" className="block mb-1 font-medium">
                                                            Number of Tickets
                                                        </label>
                                                        <input
                                                            type="text"
                                                            {...register("ticket", { required: true })}
                                                            placeholder='Tickets'
                                                            className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-designColor"
                                                        />
                                                        {errors.ticket && <p className="mt-2 text-[#CC0000]">Ticket field is required</p>}
                                                    </div>

                                                    {/* Booking date field */}
                                                    <div>
                                                        <label htmlFor="date" className="block mb-1 font-medium">
                                                            Booking Date
                                                        </label>
                                                        <input
                                                            type="date"
                                                            {...register("date", { required: true })}
                                                            placeholder=''
                                                            className="w-full py-2 border-b border-gray-300 focus:outline-none  focus:border-designColor"

                                                        />
                                                        {errors.date && <p className="mt-2 text-[#CC0000]">Date field is required</p>}
                                                    </div>

                                                    {/* Message */}
                                                    <div>
                                                        <label htmlFor="message" className="block mb-1 font-medium">
                                                            Message
                                                        </label>
                                                        <textarea
                                                            {...register("message")}
                                                            placeholder='Enter Message'
                                                            className="w-full py-2 border-b border-gray-300 focus:outline-none  focus:border-designColor"
                                                        ></textarea>
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="bg-designColor w-full  text-white rounded py-2 px-4 font-semibold mt-8 mb-4"
                                                >
                                                    Book Tour
                                                </button>

                                            </form>
                                        </div>

                                        <Link to="/dashboard/payment">
                                            <button
                                                type="submit"
                                                className="bg-designColor w-full  text-white rounded py-2 px-4 font-semibold mt-8 mb-4"
                                            >
                                                Pay for Booking
                                            </button>
                                        </Link>

                                    </div>


                                    <hr className="my-6" />
                                    <div className="mt-6">
                                        <ReviewInput destinationId={_id} refetch={refetch}></ReviewInput>
                                    </div>

                                </div>
                            </>
                        )}
                    </div>
                </Container>
            </div>

            {showEditModal && (

                <div className="modal-overlay">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <div onClick={() => setShowEditModal(false)} className='bg-bodyColor h-8 w-8 rounded-full flex justify-center items-center cursor-pointer p-2'>
                                <HiX className='text-white' size={22}></HiX>
                            </div>
                        </div>
                        {/* Modal Body */}
                        <div className="modal-body">
                            <form onSubmit={handleSubmit(handleUpdateSubmit)}>
                                <div className="grid grid-cols-2 gap-8">

                                    {/* ======== Accommodation Name ======== */}
                                    <div className='col-span-1'>
                                        <label htmlFor="name" className="block mb-1 font-medium">
                                            Accommodation Name
                                        </label>
                                        <input
                                            type="text"
                                            {...register("name")}
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
                                                {...register("country")}
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
                                            {...register("image")}
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
                                            {...register("location")}
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
                                            {...register("about")}
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
                                            {...register("duration")}
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
                                            {...register("price")}
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
                                            {...register("details")}
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
                                        // rules={{ required: true }}
                                        defaultValue=""
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
                                        // rules={{ required: true }}
                                        defaultValue=""
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
                                    Update Accommodation
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Details;