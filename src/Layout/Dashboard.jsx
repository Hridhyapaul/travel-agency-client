import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { FaBuilding, FaCalendarCheck, FaEarthAmericas, FaEarthEurope, FaListUl, FaMountainCity, FaPlaneUp } from "react-icons/fa6";
import { FaHome, FaSignOutAlt, FaUsersCog } from "react-icons/fa";
import useAdmin from "../Hooks/useAdmin";
import useNormalUser from "../Hooks/useNormalUser";
import { HiChartPie, HiCurrencyDollar } from "react-icons/hi";
import { BiBookOpen, BiHome, BiMessageDetail, BiSolidMessageDetail } from "react-icons/bi";
import Loading from "../Shared/Loading";
import { LuContact, LuPackageSearch, LuWallet } from "react-icons/lu";
import { RiHotelLine } from "react-icons/ri";
import { TbBrandBlogger } from "react-icons/tb";
import { GrContact } from "react-icons/gr";
import { MdOutlinePayments } from "react-icons/md";

const Dashboard = () => {
    const { user, logOut, loading } = useAuth()
    const [isAdmin] = useAdmin();
    const [isTraveler] = useNormalUser();
    console.log(isAdmin)
    console.log(isTraveler)
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut(); // Call the logOut function to logout the user
        navigate("/login"); // Navigate to the login page after logout
    };

    if (loading) {
        return <Loading></Loading>
    }

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
                    <div className="py-10 w-fit mx-auto">
                        <Link to="/">
                            <div className="flex justify-center">
                                <h1 className='text-3xl font-bold'>Travel<span className='text-designColor'>.O</span></h1>
                            </div>
                        </Link>
                    </div>
                    <ul className="menu px-4 w-80 pb-20">
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

                                <li><NavLink to="/dashboard/user_messages">
                                    <BiMessageDetail size={18}></BiMessageDetail>
                                    <p className="ml-2">Contact Messages</p>
                                </NavLink></li>


                                <hr className="my-6" />

                                <li><NavLink to="/">
                                    <BiHome size={20}></BiHome>
                                    <p className="ml-2">Home</p>
                                </NavLink></li>
                                <li><NavLink to="/packages">
                                    <LuPackageSearch size={20}></LuPackageSearch>
                                    <p className="ml-2">Packages</p>
                                </NavLink></li>
                                <li><NavLink to="/destinations">
                                    <RiHotelLine size={20}></RiHotelLine>
                                    <p className="ml-2">Destinations</p>
                                </NavLink>
                                </li>
                                <li><NavLink to="/blog">
                                    <TbBrandBlogger size={20}></TbBrandBlogger>
                                    <p className="ml-2">Blogs</p>
                                </NavLink>
                                </li>
                                <li><NavLink to="/contact_us">
                                    <LuContact size={20}></LuContact>
                                    <p className="ml-2">Contact</p>
                                </NavLink>
                                </li>

                                <hr className="my-6" />
                                <div className="px-4 ">
                                    <p className="flex justify-start items-center gap-2 ">
                                        <FaSignOutAlt size={16}></FaSignOutAlt>
                                        <p onClick={handleLogout} className="ml-2 cursor-pointer">LogOut</p>
                                    </p>
                                </div>
                            </>
                        )}

                        {isTraveler && (
                            <>
                                <li><NavLink to="/dashboard/myBooking">
                                    <BiBookOpen size={20}></BiBookOpen>
                                    <p className="ml-2">My Booking</p>
                                </NavLink></li>
                                <li><NavLink to="/dashboard/payment">
                                    <LuWallet size={20}></LuWallet>
                                    <p className="ml-2">Payment</p>
                                </NavLink></li>
                                <li><NavLink to="/dashboard/paymentHistory">
                                    <MdOutlinePayments size={18}></MdOutlinePayments>
                                    <p className="ml-2">Payment History</p>
                                </NavLink></li>
                                <li><NavLink to="/dashboard/your_message">
                                    <BiMessageDetail size={18}></BiMessageDetail>
                                    <p className="ml-2">Your Message</p>
                                </NavLink></li>


                                <hr className="my-6" />

                                <li><NavLink to="/">
                                    <BiHome size={20}></BiHome>
                                    <p className="ml-2">Home</p>
                                </NavLink></li>
                                <li><NavLink to="/packages">
                                    <LuPackageSearch size={20}></LuPackageSearch>
                                    <p className="ml-2">Packages</p>
                                </NavLink></li>
                                <li><NavLink to="/destinations">
                                    <RiHotelLine size={20}></RiHotelLine>
                                    <p className="ml-2">Destinations</p>
                                </NavLink>
                                </li>
                                <li><NavLink to="/blog">
                                    <TbBrandBlogger size={20}></TbBrandBlogger>
                                    <p className="ml-2">Blogs</p>
                                </NavLink>
                                </li>
                                <li><NavLink to="/contact_us">
                                    <LuContact size={20}></LuContact>
                                    <p className="ml-2">Contact</p>
                                </NavLink>
                                </li>
                                <hr className="my-6" />
                                <div className="px-4 ">
                                    <p className="flex justify-start items-center gap-2 ">
                                        <FaSignOutAlt size={16}></FaSignOutAlt>
                                        <p onClick={handleLogout} className="ml-2 cursor-pointer">LogOut</p>
                                    </p>
                                </div>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default Dashboard;