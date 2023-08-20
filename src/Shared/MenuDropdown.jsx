import { AiOutlineMenu } from 'react-icons/ai'
// import Avatar from './Avatar'
import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import useAuth from '../Hooks/useAuth'
import useAdmin from '../Hooks/useAdmin'
import useNormalUser from '../Hooks/useNormalUser'

const MenuDropdown = () => {
    const { user, logOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false)
    const [isAdmin] = useAdmin();
    const [isTraveler] = useNormalUser();
    const toggleOpen = useCallback(() => {
        setIsOpen(value => !value)
    }, [])
    return (
        <div className='relative'>
            <div>
                <div
                    onClick={toggleOpen}
                    className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Avatar></Avatar>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className='absolute font-body rounded-xl shadow-md w-[200px] md:w-[250px] bg-white py-4 overflow-hidden right-0 top-14 md:top-12 text-sm text-black'>
                    <div className='flex flex-col cursor-pointer'>

                        {user ? (
                            <>
                                <div className='px-4 py-1 space-y-2'>
                                    <p>{user.displayName}</p>
                                    <p>{user.email}</p>
                                </div>
                                <hr className='mx-4 my-1' />
                                {isAdmin && (
                                    <Link to="/dashboard/adminDashboard">
                                        <div className='mx-4 px-2 py-1 hover:bg-neutral-100 hover:rounded-lg transition font-semibold cursor-pointer'>
                                            Dashboard
                                        </div>
                                    </Link>
                                )}
                                {isTraveler && (
                                    <Link to="/dashboard/myBooking">
                                        <div className='mx-4 px-2 py-1 hover:bg-neutral-100 hover:rounded-lg transition font-semibold cursor-pointer'>
                                            Dashboard
                                        </div>
                                    </Link>
                                )}
                                <div
                                    onClick={logOut}
                                    className='mx-4 px-2 py-1 hover:bg-neutral-100 hover:rounded-lg transition font-semibold cursor-pointer'
                                >
                                    Logout
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to='/login'
                                    className='mx-4 px-2 py-1 hover:bg-neutral-100 hover:rounded-lg transition font-semibold cursor-pointer'
                                >
                                    Login
                                </Link>
                                <Link
                                    to='/register'
                                    className='mx-4 px-2 py-1 hover:bg-neutral-100 hover:rounded-lg transition font-semibold cursor-pointer'
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MenuDropdown
