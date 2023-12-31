import { HiOutlineX } from "react-icons/hi";
import useBook from "../../../Hooks/useBook";
import Container from "../../../Shared/Container";
import PaymentInject from "./PaymentInject";
import noData from "../../../assets/Images/Nodata.jpg";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading";

const Payment = () => {
    const [axiosSecure] = useAxiosSecure();
    const [booking, refetch, loading] = useBook();
    console.log(booking)

    if (loading) {
        return <Loading></Loading>
    }

    const totalAmount = booking.reduce((total, item) => {
        return total + item.price * item.tickets;
    }, 0);

    const handleAccommodationDelete = (id) => {
        console.log(id)

        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this request",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .delete(`/bookingRequest/${id}`)
                    .then(res => res.data)
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'This request has been deleted',
                                'success'
                            )
                        }
                    })
            }

        })
    }

    return (
        <div className="mt-20 pb-20 mx-20">
            <Container>
                <div className="font-body">

                    <h1 className="text-4xl text-center text-bodyColor font-semibold font-body">
                        {
                            booking.length > 0
                                ? "Your Booking Requests are Presented Here"
                                : "You currently Have no Booking Requests"
                        }
                    </h1>

                    <div className=" bg-white rounded-lg shadow-lg px-6 py-6 mt-10 text-center">
                        {totalAmount === 0 ? (
                            <h1 className="text-3xl font-semibold text-bodyColor">No Payment Required</h1>
                        ) : (
                            <h1 className="text-3xl font-semibold text-bodyColor">
                                The Total is <span className="text-designColor">${totalAmount}</span>
                            </h1>
                        )}

                    </div>
                </div>
                {booking.length > 0 ? (
                    <div className="grid grid-cols-2 gap-6 mt-10">
                        {/* Left Area */}
                        <div className="col-span-1">
                            <div className="grid grid-cols-1 gap-8">
                                {booking.map((item, index) => (
                                    <div key={index} className="bg-white shadow-lg rounded-lg px-6 py-4 font-body relative">
                                        <h1 className="text-xl font-semibold">{item.accommodation}</h1>
                                        <h1 className="text-lg font-semibold">({item.country})</h1>
                                        <p>Booking Request Date: {item.date}</p>
                                        <p>You will be charged <span className="text-lg font-semibold">${item.price}</span>/accommodation</p>
                                        <p>You are interested in reserving <span className="text-lg font-semibold">0{item.tickets}</span> tickets</p>
                                        <hr className="my-4" />

                                        <div className="">
                                            <p className="text-lg font-medium">Payable price <span className="text-designColor">${item.price * item.tickets}</span></p>
                                        </div>
                                        <div className="absolute top-4 right-4 cursor-pointer">
                                            <div onClick={() => handleAccommodationDelete(item._id)} className="w-[30px] h-[30px] rounded-full bg-bodyColor flex justify-center items-center">
                                                <HiOutlineX className="text-white text-xl"></HiOutlineX>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="col-span-1">
                            <PaymentInject totalAmount={totalAmount}></PaymentInject>
                        </div>
                    </div>
                ) : (
                    <div className="mt-10">
                        <img className="rounded-lg" src={noData} alt="" />
                    </div>
                )}

            </Container>
        </div>
    );
};

export default Payment;