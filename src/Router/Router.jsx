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
import AddAccommodation from "../Pages/Dashboard/AddAccommodation/AddAccommodation";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard.jsx/AdminDashboard";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import AllPaymentHistory from "../Pages/Dashboard/AllPaymentRecord/AllPaymentHistory";
import AllBookingCollection from "../Pages/Dashboard/AllBookingCollection/AllBookingCollection";
import AddCountry from "../Pages/Dashboard/AddCountry/AddCountry";
import ManageAccommodation from "../Pages/Dashboard/ManageAccommodation/ManageAccommodation";
import PrivateRoute from "./PrivateRoute";
import ManageCountry from "../Pages/Dashboard/ManageCountry/ManageCountry";

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
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },
            {
                path: "paymentHistory",
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: "myBooking",
                element: <MyBooking></MyBooking>
            },
            {
                path: "addAccommodation",
                element: <AddAccommodation></AddAccommodation>
            },
            {
                path: "manageAccommodation",
                element: <ManageAccommodation></ManageAccommodation>
            },
            {
                path: "addCountry",
                element: <AddCountry></AddCountry>
            },
            {
                path: "manageCountry",
                element: <ManageCountry></ManageCountry>
            },
            {
                path: "adminDashboard",
                element: <AdminDashboard></AdminDashboard>
            },
            {
                path: "manageUsers",
                element: <ManageUsers></ManageUsers>
            },
            {
                path: "paymentRecord",
                element: <AllPaymentHistory></AllPaymentHistory>
            },
            {
                path: "bookingCollection",
                element: <AllBookingCollection></AllBookingCollection>
            }
        ]
    }
]);

export default router;