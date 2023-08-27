import { FaUsers, FaWallet } from "react-icons/fa";
import useUsers from "../../../Hooks/useUsers";
import useRevenue from "../../../Hooks/useRevenue";
import usePopularDestination from "../../../Hooks/usePopularDestination";
import useAllBooking from "../../../Hooks/useAllBooking";
import AdminBarChart from "./AdminBarChart";
import AdminPieCharts from "./AdminPieCharts";
import { FaBed, FaCity } from "react-icons/fa6";
import AdminPieChartsTwo from "./AdminPieChartsTwo";

const AdminDashboard = () => {
    const [allUsers] = useUsers()
    const [allPayments] = useRevenue()
    const [destinations] = usePopularDestination()
    const [bookings] = useAllBooking()

    const indonesiaBookings = bookings.filter(booking => booking.countryName === 'Indonesia');

    console.log(indonesiaBookings)

    const totalRevenue = allPayments.reduce((acc, revenue) => acc + revenue.price, 0);

    return (
        <div className="mt-8 mb-20">
            <div className="grid grid-cols-3 gap-8 font-body">

                {/* ======Total revenue====== */}
                <div className="col-span-1 w-[300px] h-[150px] bg-[#FBD3EA] px-5 shadow-lg rounded-lg border-b-4 border-[#DB2777] flex justify-center items-center gap-6">
                    <div className="w-[40%] flex justify-center">
                        <div className="bg-[#DB2777] h-[80px] w-[80px] px-4 py-4 rounded-full flex justify-center items-center">
                            <FaWallet className="text-white" size={40}></FaWallet>
                        </div>
                    </div>
                    <div className="w-[60%] flex justify-center items-center">
                        <div className="text-center">
                            <p className="text-2xl font-semibold">${totalRevenue}</p>
                            <h1 className="text-xl font-semibold text-center">Revenue</h1>
                        </div>
                    </div>
                </div>

                {/* ======Total Users====== */}
                <div className="col-span-1 w-[300px] h-[150px] bg-[#ACF4D2] px-5 shadow-lg rounded-lg border-b-4 border-[#059669] flex justify-center items-center gap-6">
                    <div className="w-[40%] flex justify-center">
                        <div className="bg-[#059669] h-[80px] w-[80px] px-4 py-4 rounded-full flex justify-center items-center">
                            <FaUsers className="text-white" size={40}></FaUsers>
                        </div>
                    </div>
                    <div className="w-[60%] flex justify-center items-center">
                        <div className="text-center">
                            <p className="text-2xl font-semibold">{allUsers.length < 10 ? `0${allUsers.length}` : allUsers.length}</p>
                            <h1 className="text-xl font-semibold text-center">Total Users</h1>
                        </div>
                    </div>
                </div>

                {/* ======Total Accommodation====== */}
                <div className="col-span-1 w-[300px] h-[150px] bg-[#D4DDFE] px-5 shadow-lg rounded-lg border-b-4 border-[#4F46E5] flex justify-center items-center gap-6">
                    <div className="w-[40%] flex justify-center">
                        <div className="bg-[#4F46E5] h-[80px] w-[80px] px-4 py-4 rounded-full flex justify-center items-center">
                            <FaCity className="text-white" size={40}></FaCity>
                        </div>
                    </div>
                    <div className="w-[60%] flex justify-center items-center">
                        <div className="text-center">
                            <p className="text-xl font-semibold">{destinations.length}</p>
                            <h1 className="text-xl font-semibold text-center">Accommodation</h1>
                        </div>
                    </div>
                </div>

                {/* ======Total Booking ====== */}
                <div className="col-span-1 w-[300px] h-[150px] bg-[#FDE893] px-5 shadow-lg rounded-lg border-b-4 border-[#D97706] flex justify-center items-center gap-6">
                    <div className="w-[40%] flex justify-center">
                        <div className="bg-[#D97706] h-[80px] w-[80px] px-4 py-4 rounded-full flex justify-center items-center">
                            <FaWallet className="text-white" size={40}></FaWallet>
                        </div>
                    </div>
                    <div className="w-[60%] flex justify-center items-center">
                        <div className="text-center">
                            <p className="text-2xl font-semibold">{bookings.length < 10 ? `0${bookings.length}` : bookings.length}</p>
                            <h1 className="text-xl font-semibold text-center">Booking</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white font-body w-full mt-10 rounded-lg shadow-lg">
                <div className="py-6 grid grid-cols-2 gap-8">
                    <div className="col-span-2 flex justify-center">
                        <div>
                            <h1 className="text-2xl font-semibold text-center">Total Revenue by Accommodation</h1>
                            <div className="mt-4">
                                <AdminBarChart></AdminBarChart>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-center">Revenue Percentage by Country</h1>
                        <div className="mt-4">
                            <AdminPieCharts></AdminPieCharts>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-center">Sold Tickets Percentage by Country</h1>
                        <div className="mt-4">
                            <AdminPieChartsTwo></AdminPieChartsTwo>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;