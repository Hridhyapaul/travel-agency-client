import { Outlet } from "react-router-dom";
import Footer from "../../../Components/Footer/Footer";
import Header from "../../../Components/Header/Header";

const HotelDetails = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default HotelDetails;