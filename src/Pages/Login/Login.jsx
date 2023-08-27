import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import useAuth from "../../Hooks/useAuth";
import { useForm } from 'react-hook-form';
import SocialLogin from "../../Shared/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import Header from "../../Components/Header/Header";
import Container from "../../Shared/Container";
import { Helmet } from "react-helmet-async";
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
    const { signIn } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/"

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = data => {
        console.log(data)
        signIn(data.email, data.password)
            .then(result => {
                const signedUser = result.user;
                console.log(signedUser)
                reset();
                Swal.fire({
                    title: 'Welcome back! You have successfully logged in.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error.message)
                if (error.message === 'Firebase: Error (auth/user-not-found).') {
                    toast.error("We couldn't find an account with the information you provided.")
                }
                else if (error.message === 'Firebase: Error (auth/wrong-password).') {
                    toast.error("The password you entered is incorrect.")
                }
            })
    }

    return (
        <>
            <Helmet>
                <title>Travel.O | Login</title>
            </Helmet>
            <div>
                <div>
                    <Header isStatic={true} isBgColor={true}></Header>
                </div>
                <Container>
                    <div className="flex justify-center items-center gap-12 my-20 mx-10">
                        {/* Image */}
                        <div className="w-[50%]">
                            <div className="relative">
                                <img className="h-[400px] w-full object-cover rounded-lg" src="https://i.ibb.co/C2zBBNm/vitaly-sacred-Fqi950jksl8-unsplash.jpg" alt="" />

                                <div className="bg-bodyColor bg-opacity-50 rounded-lg absolute inset-0 w-full h-[400px]"></div>

                                <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                                    <div className="bg-white px-5 py-2 rounded-lg">
                                        <h1 className="text-[28px] text-center text-bodyColor font-bold">Login Form</h1>

                                        <div className='flex justify-center mt-3 mb-2'>
                                            <p className='text-[16px]'>Not a member? <Link to='/register' className='text-white bg-designColor px-3 py-1 rounded-full font-semibold'>Register now</Link></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="w-[50%] flex flex-col items-center justify-center">
                            <div className="w-full">
                                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                                    {/* Email Input */}

                                    <div>
                                        <div className="flex justify-between items-center">
                                            <label htmlFor="email" className="block text-gray-800 font-medium mb-4">
                                                Email
                                            </label>

                                            {errors.email && <p className="mb-4 text-[#CC0000]">Email field is required</p>}
                                        </div>
                                        <label className="relative">
                                            <input
                                                {...register("email", { required: true })}
                                                type="email"
                                                // placeholder="Enter your email" 
                                                className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg outline-none focus:outline-none focus:ring-bodyColor focus:border-bodyColor transition duration-200" />

                                            <span className="absolute left-0 -top-[1px] mx-3 px-2 transition duration-200 input-text">
                                                Enter your email
                                            </span>
                                        </label>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <label htmlFor="password" className="block text-gray-800 font-medium mb-4">
                                                Password
                                            </label>

                                            {errors.password && <p className="mb-4 text-[#CC0000]">Password is required</p>}
                                        </div>
                                        <div className="relative">
                                            <label>
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    {...register("password", { required: true })}
                                                    className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg outline-none focus:outline-none focus:ring-bodyColor focus:border-bodyColor transition duration-200"
                                                // placeholder="Enter your password"
                                                />
                                                <span className="absolute left-0 top-[9px] mx-3 px-2 transition duration-200 input-text">
                                                    Enter your password
                                                </span>
                                            </label>
                                            <button
                                                type="button"
                                                className="absolute top-4 right-2 text-gray-500 text-[18px]"
                                                onClick={togglePasswordVisibility}
                                            >
                                                {showPassword ? (
                                                    <HiOutlineEyeOff></HiOutlineEyeOff>
                                                ) : (
                                                    <HiOutlineEye></HiOutlineEye>
                                                )}
                                            </button>


                                        </div>
                                    </div>
                                    <label className="label py-0">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                    <button
                                        type="submit"
                                        className="w-full bg-designColor text-white rounded-full py-2 px-4 font-semibold duration-300"
                                    >
                                        Login
                                    </button>
                                </form>
                                <div className='mt-5'>
                                    <SocialLogin></SocialLogin>
                                </div>
                            </div>
                            <Toaster
                                position="top-right"
                                reverseOrder={false}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default Login;