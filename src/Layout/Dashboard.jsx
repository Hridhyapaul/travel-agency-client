import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { FaBuilding, FaCalendarCheck, FaCreditCard, FaEarthAmericas, FaEarthEurope, FaListUl, FaMountainCity, FaPlaneUp } from "react-icons/fa6";
import { FaHome, FaMoneyCheckAlt, FaSignOutAlt, FaUsersCog } from "react-icons/fa";
import useAdmin from "../Hooks/useAdmin";
import useNormalUser from "../Hooks/useNormalUser";
import { HiChartPie, HiCurrencyDollar } from "react-icons/hi";

const Dashboard = () => {
    const { user, logOut } = useAuth()
    const [isAdmin] = useAdmin();
    const [isTraveler] = useNormalUser();
    console.log(isAdmin)
    console.log(isTraveler)
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-bgColor flex flex-col items-center justify-start">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <div>
                        <Outlet></Outlet>
                    </div>

                </div>
                <div className="drawer-side bg-white shadow-lg text-bodyColor text-[16px] font-body font-semibold">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <div className="py-10">
                        <Link to="/">
                            <div className="flex justify-center">
                                <h1 className='text-3xl font-bold'>Travel<span className='text-designColor'>.O</span></h1>
                            </div>
                        </Link>
                    </div>
                    <ul className="menu px-4 w-80">
                        {/* Sidebar content here */}

                        {isAdmin && (
                            <>
                                <li><NavLink to="/dashboard/adminDashboard">
                                    <HiChartPie size={20}></HiChartPie>
                                    <p className="ml-2">Dashboard</p>
                                </NavLink></li>

                                <li><NavLink to="/dashboard/addAccommodation">
                                    <FaMountainCity size={16}></FaMountainCity>
                                    <p className="ml-2">Add Accommodation</p>
                                </NavLink></li>

                                <li><NavLink to="/dashboard/manageAccommodation">
                                    <FaBuilding size={18}></FaBuilding>
                                    <p className="ml-2">Manage Accommodation</p>
                                </NavLink></li>

                                <li><NavLink to="/dashboard/addCountry">
                                    <FaEarthAmericas size={16}></FaEarthAmericas>
                                    <p className="ml-2">Add Country</p>
                                </NavLink></li>

                                <li><NavLink to="/dashboard/manageCountry">
                                    <FaEarthEurope size={16}></FaEarthEurope>
                                    <p className="ml-2">Manage Country</p>
                                </NavLink></li>

                                <li><NavLink to="/dashboard/manageUsers">
                                    <FaUsersCog size={18}></FaUsersCog>
                                    <p className="ml-2">Manage Users</p>
                                </NavLink></li>

                                <li><NavLink to="/dashboard/paymentRecord">
                                    <HiCurrencyDollar size={20}></HiCurrencyDollar>
                                    <p className="ml-2">Payment Record</p>
                                </NavLink></li>

                                <li><NavLink to="/dashboard/bookingCollection">
                                    <FaCalendarCheck size={16}></FaCalendarCheck>
                                    <p className="ml-2">Booking Collection</p>
                                </NavLink></li>
                            </>
                        )}

                        {isTraveler && (
                            <>
                                <li><NavLink to="/dashboard/myBooking">
                                    <FaListUl size={16}></FaListUl>
                                    <p className="ml-2">My Booking</p>
                                </NavLink></li>
                                <li><NavLink to="/dashboard/payment">
                                    <FaMoneyCheckAlt size={16}></FaMoneyCheckAlt>
                                    <p className="ml-2">Payment</p>
                                </NavLink></li>
                                <li><NavLink to="/dashboard/paymentHistory">
                                    <FaCreditCard size={16}></FaCreditCard>
                                    <p className="ml-2">Payment History</p>
                                </NavLink></li>
                                <li><NavLink to="/dashboard/your_message">
                                    <FaCreditCard size={16}></FaCreditCard>
                                    <p className="ml-2">Your Message</p>
                                </NavLink></li>
                            </>
                        )}

                        <hr className="my-6" />

                        <li><NavLink to="/">
                            <FaHome size={16}></FaHome>
                            <p className="ml-2">Home</p>
                        </NavLink></li>
                        <li><NavLink to="/tours">
                            <FaPlaneUp size={16}></FaPlaneUp>
                            <p className="ml-2">Tours</p>
                        </NavLink>
                        </li>
                        <hr className="my-6" />
                        <div className="px-4 ">
                            <p className="flex justify-start items-center gap-2 ">
                                <FaSignOutAlt size={16}></FaSignOutAlt>
                                <p onClick={logOut} className="ml-2 cursor-pointer">LogOut</p>
                            </p>
                        </div>
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default Dashboard;