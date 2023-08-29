import { Link } from "react-router-dom";
import Container from "../../../Shared/Container";
import './About.css'
import videoPlayer from "../../../assets/Images/videoplayer.png";

const About = () => {
    return (
        <>
            <div className="bg-base-200 lg:py-28 py-10">
                <Container>

                    {/* <--------Start Mobile Header -------> */}
                    <div className="block lg:hidden font-body mb-10 lg:mb-0">
                        <h5 className="text-designColor font-semibold text-center">About Travel.O</h5>
                        <h1 className="text-bodyColor text-xl lg:text-4xl text-center font-bold mt-3">World Best Premier Travel <br /> Agency Since 2010</h1>
                    </div>
                    {/* <--------End Mobile Header -------> */}

                    <div className="lg:flex justify-between items-start gap-8">
                        <div className="lg:w-[50%] w-full lg:flex-col flex justify-center gap-2 lg:space-y-8">
                            <div className="flex lg:justify-end justify-center">
                                <img className="lg:h-[450px] lg:w-[60%] w-full object-cover bg-white lg:p-3 p-2 shadow-lg rounded-lg" src="https://i.ibb.co/3CY6NC4/andreas-dress-ltj9v-R2gl-HU-unsplash.jpg" alt="" />
                            </div>

                            <div className="lg:flex justify-between items-start gap-12 lg:space-y-0 space-y-3">
                                <div>
                                    <img className="w-full lg:h-[300px] h-[150px] object-cover lg:bg-white lg:p-3 lg:shadow-lg rounded-lg" src="https://i.ibb.co/z8Bwyfv/yura-lytkin-q-ZBZb-G0e-EU-unsplash.jpg" alt="" />
                                </div>
                                <div className="space-y-3">
                                    <p className="font-body text-bodyColor text-xl lg:text-2xl font-semibold">Find Your Best Destination</p>
                                    <div>
                                        <Link><img className="lg:w-20 w-14" src={videoPlayer} alt="" /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-[50%] font-body">
                            <div className="lg:block hidden font-body">
                                <h5 className="text-designColor text-xl font-semibold text-center">About Travel.O</h5>
                                <h1 className="text-bodyColor text-2xl lg:text-4xl text-center font-bold mt-3">World Best Premier Travel Agency Since 2010</h1>
                            </div>
                            <div className="mt-10">
                                <p className="text-bodyColor">
                                    Welcome to Travel.O , where wanderlust meets exceptional experiences. We are a dedicated team of travel enthusiasts, passionate about curating personalized trips that cater to your dreams and desires. <br /> <br />

                                    With a wide array of handpicked destinations around the globe, we offer a diverse range of travel options to suit every adventurer. Whether you seek thrilling adventures, relaxing getaways, cultural explorations, or luxurious escapes, we have the perfect journey awaiting you. Let us take the hassle out of trip planning and join us on a remarkable expedition that will create memories to last a lifetime. Embark on your next adventure with Travel.O and let the world unfold before your eyes. <br /> <br />

                                    <ul className="check-list space-y-1">
                                        <li>World-class service, your dream vacation.</li>
                                        <li>Global destinations, endless adventures await.</li>
                                        <li>Luxury accommodations, unparalleled comfort awaits.</li>
                                        <li>Seamless travel planning, stress-free experiences.</li>
                                    </ul>
                                </p>

                                <div className="mt-6">
                                    <Link><button className="px-5 py-3 bg-designColor text-white font-semibold font-body rounded-md">Find Tours</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default About;