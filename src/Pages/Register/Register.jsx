import { useEffect, useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { Toaster, toast } from 'react-hot-toast'
import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Container from "../../Shared/Container";
import Header from "../../Components/Header/Header";
import SocialLogin from "../../Shared/SocialLogin";

const Register = () => {

    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const { createUser, updateUserProfile } = useAuth();
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();

    const password = watch("password");
    const confirm = watch("confirm");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        setIsSubmitDisabled(password !== confirm);
    }, [password, confirm]);

    const onSubmit = data => {
        console.log(data)

        createUser(data.email, data.password)
            .then(result => {
                const createUser = result.user;
                console.log(createUser);

                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        const registeredUser = { name: data.name, email: data.email, photo: data.photo, role: 'Traveler' }
                        console.log('User profile updated')
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(registeredUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                    })
            })
            .catch(error => {
                console.log(error.message)
                if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                    toast.error('The provided email is already registered.')
                }
            })
    }

    return (
        <>
            <div>
                <div className="static">
                    <Header isStatic={true} isBgColor={true}></Header>
                </div>
                <Container>
                    <div className="flex justify-center items-center gap-8 my-20 mx-10">
                        {/* Left Image */}
                        <div className="w-[50%]">
                            <div className="relative">
                                <img className="h-screen w-full object-cover rounded-lg" src="https://i.ibb.co/C2zBBNm/vitaly-sacred-Fqi950jksl8-unsplash.jpg" alt="" />

                                <div className="bg-bodyColor bg-opacity-50 rounded-lg absolute inset-0 w-full h-screen"></div>

                                <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                                    <div className="bg-white px-5 py-2 rounded-lg">
                                        <h1 className="text-[28px] text-center text-bodyColor font-bold">Registration Form</h1>

                                        <div className='flex justify-center mt-3 mb-2'>
                                            <p className='text-[16px]'>Already have an account? <Link to='/login' className='text-white bg-designColor px-3 py-1 rounded-full font-semibold'>Login</Link></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="w-[50%] flex flex-col items-center justify-center">
                            <div className="w-full">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">

                                        {/* Name Input*/}
                                        <div className='col-span-1'>
                                            <div className="flex justify-between items-center">
                                                <label htmlFor="name" className="block mb-4 font-medium">
                                                    Name
                                                </label>

                                                {errors.name && <p className="mb-4 text-[#CC0000]">Name field is required</p>}
                                            </div>

                                            <label className="relative">
                                                <input
                                                    type="text"
                                                    {...register("name", { required: true })}
                                                    // placeholder='Enter Your Name'
                                                    className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg outline-none focus:outline-none focus:ring-bodyColor focus:border-bodyColor transition duration-200"
                                                />
                                                <span className="absolute left-0 -top-[1px] mx-3 px-2 transition duration-200 input-text">
                                                    Enter Your Name
                                                </span>
                                            </label>
                                        </div>

                                        {/* Email Input*/}
                                        <div className='col-span-1'>
                                            <div className="flex justify-between items-center">
                                                <label htmlFor="email" className="block mb-4 font-medium">
                                                    Email
                                                </label>

                                                {errors.email && <p className="mb-4 text-[#CC0000]">Email field is required</p>}
                                            </div>
                                            <label className="relative">
                                                <input
                                                    type="email"
                                                    {...register("email", { required: true })}
                                                    className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg outline-none focus:outline-none focus:ring-bodyColor focus:border-bodyColor transition duration-200"
                                                />
                                                <span className="absolute left-0 -top-[1px] mx-3 px-2 transition duration-200 input-text">
                                                    Enter Your Email
                                                </span>
                                            </label>
                                        </div>

                                        {/* Password Input*/}
                                        <div className='col-span-2'>
                                            <div className="flex justify-between items-center">
                                                <label htmlFor="password" className="block mb-4 font-medium">
                                                    Password
                                                </label>

                                                {errors.password?.type === 'required' && <p className="mb-4 text-[#CC0000]">Password is required</p>}
                                                {errors.password?.type === 'minLength' && <p className="mb-4 text-[#CC0000]">Password must be 6 character</p>}
                                                {errors.password?.type === 'pattern' && <p className="mb-4 text-[#CC0000]">Password must have one uppercase, one lowercase, one number & one special character</p>}
                                            </div>

                                            <div className="relative">
                                                <label>
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        {...register("password", {
                                                            required: true,
                                                            minLength: 6,
                                                            pattern: /(?=.*\d)(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[-!@#$&*])/
                                                        })}
                                                        className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg outline-none focus:outline-none focus:ring-bodyColor focus:border-bodyColor transition duration-200"
                                                    // placeholder="Enter your password"
                                                    />
                                                    <span className="absolute left-0 top-[9px] mx-3 px-2 transition duration-200 input-text">
                                                        Enter your password
                                                    </span>
                                                </label>
                                                <button
                                                    type="button"
                                                    className="absolute top-[14px] right-2 text-gray-500 text-[18px]"
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

                                        {/* Confirm Password Input*/}
                                        <div className='col-span-2'>
                                            <div className="flex justify-between items-center">
                                                <label htmlFor="confirmPassword" className="block mb-4 font-medium">
                                                    Confirm Password
                                                </label>

                                                {errors.confirm && <p className="mb-4 text-[#CC0000]">Confirm password is required</p>}
                                            </div>
                                            <label className="relative">
                                                <input
                                                    type="password"
                                                    {...register("confirm", { required: true })}
                                                    // placeholder='Enter Confirm Password'
                                                    className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg outline-none focus:outline-none focus:ring-bodyColor focus:border-bodyColor transition duration-200"
                                                />
                                                <span className="absolute left-0 -top-[1px] mx-3 px-2 transition duration-200 input-text">
                                                    Enter Your Email
                                                </span>
                                            </label>
                                        </div>

                                        {/* Photo Url Input*/}
                                        <div className='col-span-1'>
                                            <label htmlFor="photoURL" className="block mb-4 font-medium">
                                                Photo URL
                                            </label>
                                            <label className="relative">
                                                <input
                                                    type="text"
                                                    {...register("photo")}
                                                    // placeholder='Enter Photo URL'
                                                    className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg outline-none focus:outline-none focus:ring-bodyColor focus:border-bodyColor transition duration-200"
                                                />
                                                <span className="absolute left-0 -top-[1px] mx-3 px-2 transition duration-200 input-text">
                                                    Enter Photo URL
                                                </span>
                                            </label>
                                        </div>

                                        {/* Phone Number Input*/}
                                        <div className='col-span-1'>
                                            <label htmlFor="phoneNumber" className="block mb-4 font-medium">
                                                Phone Number
                                            </label>

                                            <label className="relative">
                                                <input
                                                    type="tel"
                                                    {...register("phone")}
                                                    // placeholder='Enter Phone Number'
                                                    className="w-full px-4 py-2 border-2 border-gray-400 rounded-lg outline-none focus:outline-none focus:ring-bodyColor focus:border-bodyColor transition duration-200"

                                                />
                                                <span className="absolute left-0 -top-[1px] mx-3 px-2 transition duration-200 input-text">
                                                    Enter Phone Number
                                                </span>
                                            </label>
                                        </div>

                                        {/* Gender Input */}
                                        <div className='col-span-1'>
                                            <label className="block mb-1 font-medium">Gender</label>
                                            <div className="flex items-center space-x-4">
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        {...register("gender")}
                                                        value="male"
                                                        className="form-radio focus:ring-[#082A5E] focus:border-[#082A5E]"
                                                    />
                                                    <span className="ml-2">Male</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        {...register("gender")}
                                                        value="female"
                                                        className="form-radio focus:ring-[#082A5E] focus:border-[#082A5E]"
                                                    />
                                                    <span className="ml-2">Female</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        {...register("gender")}
                                                        value="other"
                                                        className="form-radio focus:ring-[#082A5E] focus:border-[#082A5E]"
                                                    />
                                                    <span className="ml-2">Other</span>
                                                </label>
                                            </div>
                                        </div>


                                    </div>
                                    <button
                                        type="submit"
                                        className={`${isSubmitDisabled ? 'bg-designColor bg-opacity-50 opacity-50' : 'bg-designColor'} w-full  text-white rounded-full py-2 px-4 font-semibold mt-8 mb-4`}
                                        disabled={isSubmitDisabled}
                                    >
                                        Register
                                    </button>
                                </form>
                                <SocialLogin></SocialLogin>
                            </div>
                            <Toaster
                                position="bottom-left"
                                reverseOrder={false}
                            />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default Register;