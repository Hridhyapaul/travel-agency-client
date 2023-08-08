import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import avatarImg from "../assets/Images/placeholder.jpg"
import { FaCreditCard, FaListUl, FaPlaneUp } from "react-icons/fa6";
import { FaHome, FaMoneyCheckAlt, FaSignInAlt } from "react-icons/fa";

const Dashboard = () => {
    const { user, logOut } = useAuth()
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-bgColor px-6 flex flex-col items-center justify-start">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <div className="overflow-x-auto">
                        <Outlet></Outlet>
                    </div>

                </div>
                <div className="drawer-side bg-white shadow-lg text-bodyColor text-[16px] font-body font-semibold">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <div className="bg-bodyColor py-10">
                        <div className="flex justify-center">
                            <img src={user && user?.photoURL ? user?.photoURL : avatarImg} alt="profile" className='h-30 rounded-full' />
                        </div>

                        <div className="text-center mt-4 font-body text-white">
                            <h1>{user?.displayName}</h1>
                            <h1>{user?.email}</h1>
                        </div>
                    </div>
                    <ul className="menu px-4 w-80 pt-10">
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
                        <li><NavLink to="/dashboard/adminDashboard">
                            <FaCreditCard size={16}></FaCreditCard>
                            <p className="ml-2">Dashboard</p>
                        </NavLink></li>
                        <li><NavLink to="/dashboard/manageUsers">
                            <FaCreditCard size={16}></FaCreditCard>
                            <p className="ml-2">Manage Users</p>
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