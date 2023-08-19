import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useAccommodationDetails from "../../../Hooks/useAccommodationDetails";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import './CSS/Details.css'
import Container from "../../../Shared/Container";
import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import { HiOutlineClock, HiOutlineMap, HiPencilAlt } from "react-icons/hi";
import { useForm } from 'react-hook-form';
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../../Shared/Loading";
import useAdmin from "../../../Hooks/useAdmin";
import useNormalUser from "../../../Hooks/useNormalUser";
import AccommodationUpdateModal from "./AccommodationUpdateModal";
import { useState } from "react";

const Details = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const [isTraveler] = useNormalUser();
    console.log(user)
    const navigate = useNavigate();
    const location = useLocation();
    const [rooms, refetch, loading] = useAccommodationDetails({ id })
    console.log(rooms)
    const { _id, countryName, image, name, numberOfDay, price, reviews, details, location: place, includedServices, tourPlan } = rooms;

    const totalRatings = reviews?.reduce((sum, review) => sum + review?.rating, 0);
    const averageRating = totalRatings / reviews?.length;

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const customStyles = {
        itemShapes: ThinRoundedStar,
        activeFillColor: '#f59e0b',
        inactiveFillColor: '#ECEEEF',
    };

    if (loading) {
        return <Loading></Loading>; // or display an error message
    }

    const onSubmit = data => {
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

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <>
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

                <div className="mt-[600px]">
                    <Container>
                        <div className={`${isAdmin ? '' : 'grid grid-cols-6 gap-8'}`}>
                            <div className="col-span-4 font-body text-bodyColor">

                                <div className="flex justify-start items-center gap-2">
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

                                <div className="space-y-4">
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
                                                                onClick={() => setIsEditModalOpen(true)}
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
                                <div className="space-y-4 mt-10">
                                    <h1 className="text-3xl font-semibold">Traveler Review for {name}</h1>
                                    <div className="bg-white px-8 py-8 rounded-lg space-y-8">
                                        {
                                            reviews?.map((review, index) => (
                                                <div key={index} className="bg-bgColor px-6 py-6 rounded-lg space-y-3">
                                                    <div className="bg-white px-4 py-2 rounded-lg flex justify-start items-center gap-2">
                                                        <Rating
                                                            style={{ maxWidth: 90 }}
                                                            value={review.rating}
                                                            itemStyles={customStyles}
                                                            readOnly
                                                            className=""
                                                        />
                                                        <p className="text-[14px]">({review.rating.toFixed(1)})</p>
                                                    </div>
                                                    <h1 className="text-xl font-semibold">{review.reviewerName}</h1>
                                                    <p>{review.reviewText}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>

                            <AccommodationUpdateModal handleOpenEditModal={() => setIsEditModalOpen(true)}
                                setIsEditModalOpen={setIsEditModalOpen}
                                isOpen={isEditModalOpen}></AccommodationUpdateModal>

                            {/* Right Column */}
                            {!isAdmin && (
                                <>
                                    <div className="col-span-2">
                                        <div>
                                            <div className="w-full bg-white rounded shadow-md p-12">
                                                <form onSubmit={handleSubmit(onSubmit)}>
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
                                    </div>
                                </>
                            )}
                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default Details;