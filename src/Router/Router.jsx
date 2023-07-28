import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Tours from "../Pages/Tours/Tours";
import TourDetails from "../Pages/TourDetails/TourDetails";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import SearchResultList from "../Pages/SearchResult/SearchResultList";

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
            },
            {
                path: "/tours/:id",
                element: <TourDetails></TourDetails>
            },
            {
                path: "/tours/search",
                element: <SearchResultList></SearchResultList>
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
]);

export default router;