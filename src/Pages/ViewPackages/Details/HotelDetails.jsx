import { Outlet } from "react-router-dom";
import Footer from "../../../Components/Footer/Footer";
import Header from "../../../Components/Header/Header";
import { Helmet } from "react-helmet-async";

const HotelDetails = () => {
    return (
        <div>
            <Helmet>
                <title>Travel.O | Destinations Details</title>
            </Helmet>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default HotelDetails;