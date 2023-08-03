import { NavLink, Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";

const Dashboard = () => {
    return (
        <div>
            <Header isStatic={true} isBgColor={true}></Header>

            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-bgColor flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <div>
                        <Outlet></Outlet>
                    </div>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-white shadow-lg text-bodyColor text-[16px] font-body font-semibold pt-20">
                        {/* Sidebar content here */}
                        <li><NavLink to="/dashboard/myBooking">My Booking</NavLink></li>
                        <li><NavLink to="/dashboard/payment">Payment</NavLink></li>
                    </ul>

                </div>
            </div>
        </div>

    );
};

export default Dashboard;