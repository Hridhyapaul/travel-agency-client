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
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ManageCountry from "../Pages/Dashboard/ManageCountry/ManageCountry";
import PackagesPage from "../Pages/PackagesPage/PackagesPage";
import Contact from "../Pages/Contact/Contact";
import ContactMessageByUser from "../Pages/Dashboard/ContactMessageByUser/ContactMessageByUser";
import AllContactMessages from "../Pages/Dashboard/AllContactMessages/AllContactMessages";
import Blog from "../Pages/Blog/Blog";
import AdminRoute from "./AdminRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/destinations",
                element: <Tours></Tours>
            },
            {
                path: "/packages",
                element: <PackagesPage></PackagesPage>
            },
            {
                path: "/contact_us",
                element: <Contact></Contact>
            },
            {
                path: "/blog",
                element: <Blog></Blog>
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
                element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
            },
            {
                path: "myBooking",
                element: <PrivateRoute><MyBooking></MyBooking></PrivateRoute>
            },

            {
                path: "your_message",
                element: <PrivateRoute><ContactMessageByUser></ContactMessageByUser></PrivateRoute>
            },

            // Admin Dashboard Route....
            {
                path: "addAccommodation",
                element: <PrivateRoute><AdminRoute><AddAccommodation></AddAccommodation></AdminRoute></PrivateRoute>
            },
            {
                path: "manageAccommodation",
                element: <PrivateRoute><AdminRoute><ManageAccommodation></ManageAccommodation></AdminRoute></PrivateRoute>
            },
            {
                path: "addCountry",
                element: <PrivateRoute><AdminRoute><AddCountry></AddCountry></AdminRoute></PrivateRoute>
            },
            {
                path: "manageCountry",
                element: <PrivateRoute><AdminRoute><ManageCountry></ManageCountry></AdminRoute></PrivateRoute>
            },
            {
                path: "adminDashboard",
                element: <PrivateRoute><AdminRoute><AdminDashboard></AdminDashboard></AdminRoute></PrivateRoute>
            },
            {
                path: "manageUsers",
                element: <PrivateRoute><AdminRoute><ManageUsers></ManageUsers></AdminRoute></PrivateRoute>
            },
            {
                path: "paymentRecord",
                element: <PrivateRoute><AdminRoute><AllPaymentHistory></AllPaymentHistory></AdminRoute></PrivateRoute>
            },
            {
                path: "bookingCollection",
                element: <PrivateRoute><AdminRoute><AllBookingCollection></AllBookingCollection></AdminRoute></PrivateRoute>
            },
            {
                path: "user_messages",
                element: <PrivateRoute><AdminRoute><AllContactMessages></AllContactMessages></AdminRoute></PrivateRoute>
            }
        ]
    }
]);

export default router;