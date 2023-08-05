import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ViewPackages from "../Pages/ViewPackages/viewPackages";
import Packages from "../Pages/ViewPackages/Packages";
import HotelDetails from "../Pages/ViewPackages/Details/HotelDetails";
import Details from "../Pages/ViewPackages/Details/Details";
import Dashboard from "../Layout/Dashboard";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import MyBooking from "../Pages/Dashboard/MyBooking/MyBooking";
import Tours from "../Pages/Tours/Tours";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/tours",
                element: <Tours></Tours>
            }
        ]
    },
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/register",
        element: <Register></Register>
    },
    {
        path: "/packages/:text",
        element: <ViewPackages></ViewPackages>,
        children: [
            {
                path: "",
                element: <Packages></Packages>,
            }
        ]
    },
    {
        path: "/accommodation/:id",
        element: <HotelDetails></HotelDetails>,
        children: [
            {
                path: "",
                element: <Details></Details>,
            }
        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: "payment",
                element: <Payment></Payment>
            },
            {
                path: "paymentHistory",
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: "myBooking",
                element: <MyBooking></MyBooking>
            }
        ]
    }
]);

export default router;