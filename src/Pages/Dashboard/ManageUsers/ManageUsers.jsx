import useUsers from "../../../Hooks/useUsers";
import Container from "../../../Shared/Container";
import ManageUsersCard from "./ManageUsersCard";

const ManageUsers = () => {
    const [users, , refetch] = useUsers()
    return (
        <div className="mt-20 pb-20 mx-20">
            <Container>
                <div>
                    <h2 className='text-4xl font-body font-semibold text-center pb-4'>User Management</h2>
                    <div className='mt-8'>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra font-body">
                                {/* head */}
                                <thead className="bg-designColor text-white">
                                    <tr className='text-center text-[14px]'>
                                        <th className="py-6"></th>
                                        <th className="py-6">Image</th>
                                        <th className="py-6">Name</th>
                                        <th className="py-6">Email</th>
                                        <th className="py-6">Role</th>
                                        <th className="py-6">Manage Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((user, index) => <ManageUsersCard key={history._id} user={user} index={index} refetch={refetch}></ManageUsersCard>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </Container>
        </div>
    );
};

export default ManageUsers;