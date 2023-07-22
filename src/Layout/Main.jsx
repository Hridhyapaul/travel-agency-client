import { Outlet } from "react-router-dom";
// import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Banner from "../Components/Banner/Banner";

const Main = () => {
    return (
        <div>
            <Banner></Banner>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;