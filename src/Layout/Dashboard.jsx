import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
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
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-white shadow-lg text-bodyColor text-[16px] font-body font-semibold pt-20">
                        {/* Sidebar content here */}
                        <li><NavLink to="/dashboard/myBooking">My Booking</NavLink></li>
                        <li><NavLink to="/dashboard/payment">Payment</NavLink></li>
                        <li><NavLink to="/dashboard/paymentHistory">Payment History</NavLink></li>
                        <hr className="my-6"/>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/login">Login</NavLink></li>
                        <li><NavLink to="/register">Register</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default Dashboard;