import { FaUsers, FaWallet } from "react-icons/fa";
import useUsers from "../../../Hooks/useUsers";
import useRevenue from "../../../Hooks/useRevenue";

const AdminDashboard = () => {
    const [users] = useUsers()
    const [revenues] = useRevenue()

    const totalRevenue = revenues.reduce((acc, revenue) => acc + revenue.price, 0);

    return (
        <div>
            <div className="flex justify-between items-center gap-8 mt-8 font-body">
                <div className="w-[300px] h-[150px] bg-[#FBD3EA] px-5 shadow-lg rounded-lg border-b-4 border-[#DB2777] flex justify-center items-center gap-6">
                    <div className="w-[40%] flex justify-center">
                        <div className="bg-[#DB2777] h-[80px] w-[80px] px-4 py-4 rounded-full flex justify-center items-center">
                            <FaUsers className="text-white" size={40}></FaUsers>
                        </div>
                    </div>
                    <div className="w-[60%] flex justify-center items-center">
                        <div>
                            <p className="text-xl font-semibold">Revenue</p>
                            <h1 className="text-xl font-semibold text-center">320</h1>
                        </div>
                    </div>
                </div>
                <div className="w-[300px] h-[150px] bg-[#ACF4D2] px-5 shadow-lg rounded-lg border-b-4 border-[#059669] flex justify-center items-center gap-6">
                    <div className="w-[40%] flex justify-center">
                        <div className="bg-[#059669] h-[80px] w-[80px] px-4 py-4 rounded-full flex justify-center items-center">
                            <FaUsers className="text-white" size={40}></FaUsers>
                        </div>
                    </div>
                    <div className="w-[60%] flex justify-center items-center">
                        <div>
                            <p className="text-xl font-semibold">Total Users</p>
                            <h1 className="text-xl font-semibold text-center">{users.length}</h1>
                        </div>
                    </div>
                </div>
                <div className="w-[300px] h-[150px] bg-[#D4DDFE] px-5 shadow-lg rounded-lg border-b-4 border-[#4F46E5] flex justify-center items-center gap-6">
                    <div className="w-[40%] flex justify-center">
                        <div className="bg-[#4F46E5] h-[80px] w-[80px] px-4 py-4 rounded-full flex justify-center items-center">
                            <FaWallet className="text-white" size={40}></FaWallet>
                        </div>
                    </div>
                    <div className="w-[60%] flex justify-center items-center">
                        <div>
                            <p className="text-xl font-semibold">Revenue</p>
                            <h1 className="text-xl font-semibold text-center">${totalRevenue}</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white w-full h-[400px] mt-10 rounded-lg shadow-lg">

            </div>
        </div>
    );
};

export default AdminDashboard;