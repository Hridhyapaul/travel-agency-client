import { Link, NavLink } from 'react-router-dom';
// import { motion } from "framer-motion"
import { FaUserAlt, FaUserCircle, FaBars } from "react-icons/fa";
import '../Header/Header.css'
// import logo from '../../assets/Images/logo.png'
import { useState } from 'react';
// import { useState } from 'react';
const Header = () => {
    const navLinks = [
        {
            path: '/',
            display: 'Home'
        },
        {
            path: '/about',
            display: 'About'
        },
        {
            path: '/tours',
            display: 'Tours'
        },
        {
            path: '/blog',
            display: 'Blog'
        },
        {
            path: '/contact',
            display: 'Contact'
        }
    ]

    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!isMenuOpen);
    };

    const user = true;

    return (
        <>
            <div className='bg-white bg-opacity-25 lg:py-4 fixed z-10 w-full'>
                <div className="lg:mt-0 lg:max-w-[1280px] mx-auto">
                    <div className="text-white font-semibold relative">
                        {/* Large Screen */}
                        <div className='lg:block hidden '>
                            <div className='flex justify-between items-center'>
                                <div className="w-[50%]">
                                    <h1 className='text-3xl font-bold'>Travel<span className='text-designColor'>.O</span></h1>
                                </div>

                                <div className="flex-shrink-0">
                                    <ul className="flex justify-center items-center">
                                        {
                                            navLinks.map((item, index) => (
                                                <li key={index} className='navigation'>
                                                    <NavLink to={item.path}>
                                                        {item.display}
                                                    </NavLink>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <div className='w-[50%] text-end'>
                                    {
                                        user ? (
                                            <div className="dropdown dropdown-end">
                                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                                    <div className="w-10 rounded-full ring ring-designColor ring-offset-base-100 ring-offset-2 ">
                                                        <div className='flex justify-center'>
                                                            <FaUserAlt className='items-center text-3xl text-white'></FaUserAlt>
                                                        </div>
                                                    </div>
                                                </label>
                                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-designColor rounded-box w-52 text-white">
                                                    
                                                    <li><a>Dashboard</a></li>
                                                    <li><a>Logout</a></li>
                                                </ul>
                                            </div>
                                        ) : (
                                            <div className="dropdown dropdown-end">
                                                <div tabIndex={0} className='w-10 cursor-pointer'>
                                                    <FaUserCircle className='text-[40px] text-white'></FaUserCircle>
                                                </div>
                                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                                    <li><Link to='/login'>Login</Link></li>
                                                    <li><Link to='/register'>Register</Link></li>
                                                </ul>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Mobile Screen */}
                        <div className="lg:hidden block bg-[#000000] bg-opacity-30 w-screen px-5 py-3">
                            <div className="flex justify-between items-center">
                                <h1 className='text-3xl font-bold'>Travel<span className='text-designColor'>.O</span></h1>

                                <div className='flex justify-end items-center gap-3'>
                                    <div className='text-end'>
                                        {
                                            user ? (
                                                <div className="dropdown dropdown-end">
                                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                                        <div className="w-10 rounded-full ring ring-designColor ring-offset-base-100 ring-offset-2 ">
                                                            <div className='flex justify-center'>
                                                                <FaUserAlt className='items-center text-3xl text-white'></FaUserAlt>
                                                            </div>
                                                        </div>
                                                    </label>
                                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                                        <li>
                                                            <a className="justify-between">
                                                                Profile
                                                                <span className="badge">New</span>
                                                            </a>
                                                        </li>
                                                        <li><a>Settings</a></li>
                                                        <li><a>Logout</a></li>
                                                    </ul>
                                                </div>
                                            ) : (
                                                <div className="dropdown dropdown-end">
                                                    <div tabIndex={0} className='w-10 cursor-pointer'>
                                                        <FaUserCircle className='text-[40px] text-white'></FaUserCircle>
                                                    </div>
                                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                                        <li><Link to='/login'>Login</Link></li>
                                                        <li><Link to='/register'>Register</Link></li>
                                                    </ul>
                                                </div>
                                            )
                                        }
                                    </div>

                                    <FaBars onClick={handleMenuToggle} className="text-[25px] text-designColor lg:hidden block"></FaBars>
                                </div>
                            </div>
                        </div>

                        <div className={`w-screen lg:hidden absolute h-content bg-designColor transition-all duration-500 text-center ${isMenuOpen ? 'top-[70px] right-0 left-0 transition-all duration-500 object-left opacity-100' : 'top-[70px] left-[500px] opacity-0'}`}>
                            <div className='flex justify-center'>
                                <ul className="text-center text-lightText my-10 font-body lg:hidden block">
                                    {
                                        navLinks.map((item, index) => (
                                            <li key={index} className='mobileNavigation'>
                                                <NavLink to={item.path} className='flex justify-center'>
                                                    {item.display}
                                                </NavLink>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;