import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaFacebookSquare, FaInstagramSquare, FaTelegram, FaTwitter, FaTwitterSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import Container from "../../Shared/Container";

const Footer = () => {
    return (
        <div className="bg-bodyColor text-white font-body py-12">
            <Container>
                <div className="">
                    <div className="lg:text-3xl text-2xl font-semibold text-center mb-4">Explore the World</div>
                    <p className="lg:text-lg mb-4 text-center">
                        Discover new destinations and create unforgettable memories with us.
                    </p>
                    <div>
                        <Link to="/">
                            <h1 className='lg:text-3xl text-2xl font-bold text-center'>Travel<span className='text-designColor'>.O</span></h1>
                        </Link>
                    </div>
                    <ul className="lg:flex lg:text-start text-center lg:space-y-0 space-y-2 justify-center gap-6 mt-4">
                        <li>
                            <Link to="" className="lg:text-lg hover:text-gray-300 transition duration-300">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/packages" className="lg:text-lg hover:text-gray-300 transition duration-300">
                                Packages
                            </Link>
                        </li>
                        <li>
                            <Link to="/tours" className="lg:text-lg hover:text-gray-300 transition duration-300">
                                Destinations
                            </Link>
                        </li>
                        <li>
                            <Link to="/blog" className="lg:text-lg hover:text-gray-300 transition duration-300">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="lg:text-lg hover:text-gray-300 transition duration-300">
                                Contact
                            </Link>
                        </li>
                    </ul>

                    <div className="socialIcon mt-8">
                        <div className="flex justify-center space-x-4">
                            <a href="#" className="text-lg hover:text-gray-300 transition duration-300">
                                <FaFacebook></FaFacebook>
                            </a>
                            <a href="#" className="text-lg hover:text-gray-300 transition duration-300">
                                <FaTwitter></FaTwitter>
                            </a>
                            <a href="#" className="text-lg hover:text-gray-300 transition duration-300">
                                <FaTelegram></FaTelegram>
                            </a>
                        </div>
                    </div>
                    <hr className="border-1 border-lightText w-full my-8" />
                </div>
                <div className="flex justify-center items-center">
                    <div className="travelCompany">
                        <p className="text-center text-sm">
                            &copy; {new Date().getFullYear()} Travel.O Company. All rights reserved.
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Footer;