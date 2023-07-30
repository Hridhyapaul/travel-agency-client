import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ViewPackages from "../Pages/ViewPackages/viewPackages";
import Packages from "../Pages/ViewPackages/Packages";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
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
        path: "/viewPackages",
        element: <ViewPackages></ViewPackages>,
        children: [
            {
                path: ":id",
                element: <Packages></Packages>,
            }
        ]
    },
]);

export default router;