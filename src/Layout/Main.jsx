import { Outlet } from "react-router-dom";
// import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
// import { useEffect, useState } from "react";
// import Loader from "../Shared/Loader";

const Main = () => {

    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 2000);
    // }, []);
    return (
        <div>
            <div>
                <Header></Header>
                <Outlet></Outlet>
                <Footer></Footer>
            </div >
        </div >
    );
};

export default Main;