import { Link, NavLink } from "react-router-dom";
import { FaUserAlt, FaUserCircle, FaBars } from "react-icons/fa";
import "../Header/Header.css";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import MenuDropdown from "../../Shared/MenuDropdown";
import Avatar from "../../Shared/Avatar";
import useAdmin from "../../Hooks/useAdmin";
import useNormalUser from "../../Hooks/useNormalUser";
const Header = ({ isStatic, isBgColor }) => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [isTraveler] = useNormalUser();

  const handleLogout = () => {
    logOut(); // Call the logOut function to logout the user
  };

  const navLinks = [
    {
      path: "/",
      display: "Home",
    },
    {
      path: "/packages",
      display: "Packages",
    },
    {
      path: "/destinations",
      display: "Destinations",
    },
    {
      path: "/blog",
      display: "Blog",
    },
    {
      path: "/contact_us",
      display: "Contact",
    },
  ];

  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleMobileNavClick = () => {
    setMenuOpen(false);
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Set the scroll position threshold
      if (scrollPosition >= 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    // Add the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`lg:py-4 ${
          isStatic ? "" : "fixed"
        } z-[100] w-full transition-all duration-500 ${
          isScrolled
            ? "bg-bodyColor"
            : isBgColor
            ? "bg-bodyColor"
            : "bg-black bg-opacity-25"
        } blurContainer`}
      >
        <div className="lg:mt-0 lg:max-w-[1280px] mx-auto">
          <div className="text-white font-semibold relative">
            {/* Large Screen */}
            <div className="lg:block hidden ">
              <div className="flex justify-between items-center">
                <div className="w-[50%]">
                  <h1 className="text-3xl font-bold">
                    <Link to="/">
                      Travel<span className="text-designColor">.O</span>
                    </Link>
                  </h1>
                </div>

                <div className="flex-shrink-0">
                  <ul className="flex justify-center items-center">
                    {navLinks.map((item, index) => (
                      <li
                        key={index}
                        className={`navigation ${
                          isScrolled ? "scrolledNavigation" : ""
                        }`}
                      >
                        <NavLink to={item.path}>{item.display}</NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-[50%] text-end">
                  <div className="flex justify-end">
                    <MenuDropdown></MenuDropdown>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Screen design Start */}
            <div className="lg:hidden block bg-[#000000] bg-opacity-30 w-screen px-5 py-3">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">
                  <Link to="/">
                    Travel<span className="text-designColor">.O</span>
                  </Link>
                </h1>

                <div className="flex justify-end items-center gap-3">
                  <div className="text-end">
                    {user ? (
                      <div className="dropdown dropdown-end">
                        <label
                          tabIndex={0}
                          className="btn btn-ghost btn-circle avatar"
                        >
                          <div className="w-10 rounded-full border-2 border-white ">
                            <div className="flex justify-center">
                              <Avatar></Avatar>
                            </div>
                          </div>
                        </label>
                        <ul
                          tabIndex={0}
                          className="menu text-black menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          <div className="px-4 py-1 space-y-2">
                            <p>{user.displayName}</p>
                            <p>{user.email}</p>
                          </div>
                          <hr className="mx-4 my-1" />
                          {isAdmin && (
                            <Link to="/dashboard/adminDashboard">
                              <div className="mx-4 px-2 py-1 hover:bg-neutral-100 hover:rounded-lg transition font-semibold cursor-pointer">
                                Dashboard
                              </div>
                            </Link>
                          )}
                          {isTraveler && (
                            <Link to="/dashboard/myBooking">
                              <div className="mx-4 px-2 py-1 hover:bg-neutral-100 hover:rounded-lg transition font-semibold cursor-pointer">
                                Dashboard
                              </div>
                            </Link>
                          )}
                          <div
                            onClick={handleLogout}
                            className="mx-4 px-2 py-1 hover:bg-neutral-100 hover:rounded-lg transition font-semibold cursor-pointer"
                          >
                            Logout
                          </div>
                        </ul>
                      </div>
                    ) : (
                      <div className="dropdown dropdown-end">
                        <div tabIndex={0} className="w-10 cursor-pointer">
                          <FaUserCircle className="text-[40px] text-white"></FaUserCircle>
                        </div>
                        <ul
                          tabIndex={0}
                          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          <li>
                            <Link to="/login">Login</Link>
                          </li>
                          <li>
                            <Link to="/register">Register</Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <FaBars
                    onClick={handleMenuToggle}
                    className="text-[25px] text-white lg:hidden block"
                  ></FaBars>
                </div>
              </div>
            </div>

            <div
              className={`w-screen lg:hidden absolute h-content bg-designColor transition-all duration-500 text-center ${
                isMenuOpen
                  ? "top-[70px] right-0 left-0 transition-all duration-500 object-left opacity-100"
                  : "top-[70px] left-[500px] opacity-0"
              }`}
            >
              <div className="flex justify-center">
                <ul className="text-center text-lightText my-10 font-body lg:hidden block">
                  {navLinks.map((item, index) => (
                    <li key={index} className="mobileNavigation">
                      <NavLink
                        to={item.path}
                        className="flex justify-center"
                        onClick={handleMobileNavClick}
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Mobile screen design End  */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
