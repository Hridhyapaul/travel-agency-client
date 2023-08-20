import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaFacebookSquare, FaInstagramSquare, FaTelegram, FaTwitter, FaTwitterSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import Container from "../../Shared/Container";

const Footer = () => {
    return (
        <div className="bg-bodyColor text-white font-body py-12">
            <Container>
                <div className="flex flex-col items-center">
                    <div className="text-3xl font-semibold mb-4">Explore the World</div>
                    <p className="text-lg mb-4 text-center">
                        Discover new destinations and create unforgettable memories with us.
                    </p>
                    <div>
                        <Link to="/">
                            <h1 className='text-3xl font-bold'>Travel<span className='text-designColor'>.O</span></h1>
                        </Link>
                    </div>
                    <div className="flex space-x-6 mt-4">
                        <Link to="" className="text-lg hover:text-gray-300 transition duration-300">
                            About Us
                        </Link>
                        <Link to="/packages" className="text-lg hover:text-gray-300 transition duration-300">
                            Packages
                        </Link>
                        <Link to="/tours" className="text-lg hover:text-gray-300 transition duration-300">
                            Destinations
                        </Link>
                        <Link to="/blog" className="text-lg hover:text-gray-300 transition duration-300">
                            Blog
                        </Link>
                        <Link to="/contact" className="text-lg hover:text-gray-300 transition duration-300">
                            Contact
                        </Link>
                    </div>

                    <div className="socialIcon mt-8">
                        <div className="flex space-x-4">
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
                        <p className="text-center">
                            &copy; {new Date().getFullYear()} Travel.O Company. All rights reserved.
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Footer;