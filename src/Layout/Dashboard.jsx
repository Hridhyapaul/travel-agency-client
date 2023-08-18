import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { FaCreditCard, FaListUl, FaPlaneUp } from "react-icons/fa6";
import { FaHome, FaMoneyCheckAlt, FaSignInAlt } from "react-icons/fa";
import useAdmin from "../Hooks/useAdmin";
import useNormalUser from "../Hooks/useNormalUser";

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
                        <div className="flex justify-center">
                            <h1 className='text-3xl font-bold'>Travel<span className='text-designColor'>.O</span></h1>
                        </div>
                    </div>
                    <ul className="menu px-4 w-80">
                        {/* Sidebar content here */}
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

                        <li><NavLink to="/dashboard/addAccommodation">
                            <FaCreditCard size={16}></FaCreditCard>
                            <p className="ml-2">Add Accommodation</p>
                        </NavLink></li>
                        <li><NavLink to="/dashboard/manageAccommodation">
                            <FaCreditCard size={16}></FaCreditCard>
                            <p className="ml-2">Manage Accommodation</p>
                        </NavLink></li>
                        <li><NavLink to="/dashboard/addCountry">
                            <FaCreditCard size={16}></FaCreditCard>
                            <p className="ml-2">Add Country</p>
                        </NavLink></li>
                        <li><NavLink to="/dashboard/manageCountry">
                            <FaCreditCard size={16}></FaCreditCard>
                            <p className="ml-2">Manage Country</p>
                        </NavLink></li>
                        <li><NavLink to="/dashboard/adminDashboard">
                            <FaCreditCard size={16}></FaCreditCard>
                            <p className="ml-2">Dashboard</p>
                        </NavLink></li>
                        <li><NavLink to="/dashboard/manageUsers">
                            <FaCreditCard size={16}></FaCreditCard>
                            <p className="ml-2">Manage Users</p>
                        </NavLink></li>
                        <li><NavLink to="/dashboard/paymentRecord">
                            <FaCreditCard size={16}></FaCreditCard>
                            <p className="ml-2">Payment Record</p>
                        </NavLink></li>
                        <li><NavLink to="/dashboard/bookingCollection">
                            <FaCreditCard size={16}></FaCreditCard>
                            <p className="ml-2">Booking Collection</p>
                        </NavLink></li>



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
                                <FaSignInAlt size={16}></FaSignInAlt>
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