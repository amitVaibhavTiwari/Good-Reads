import FillButton from "../../../Components/Button/FillButton";
import { IoSunnyOutline } from "react-icons/io5";
import { BsList } from "react-icons/bs";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../GlobalContext";
import { useCookies } from "react-cookie";

const navlinks = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "About",
    link: "/",
  },
  {
    label: "Browse",
    link: "/",
  },
  {
    label: "Community",
    link: "/",
  },
  {
    label: "My books",
    link: "/",
  },
];

const Navbar = () => {
  const { theme, dispatch, currentlyLoggedInUser } = useGlobalContext();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [active, setActive] = useState(false);

  //   useEffect to make navbar sticky on top and to change its color
  useEffect(() => {
    const isActive = () => {
      window.scrollY > 10 ? setActive(true) : setActive(false);
    };
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, [active]);

  const handleLogout = async () => {
    removeCookie("jwt");
    dispatch({
      type: "SET_CURRENTLY_LOGGED_IN_USER",
      payload: false,
    });
  };

  return (
    <nav
      className={`p-4  fit-width z-10 lg:py-6 ${
        active
          ? "bg-transparent fixed top-0 backdrop-blur-md w-full"
          : "bg-lime-100"
      }`}
    >
      <div className="flex items-center justify-between mx-auto">
        <Logo />

        {/* Navlinks */}
        <div>
          <ul className="hidden md:flex md:text-base md:items-center md:gap-4 lg:gap-8">
            {navlinks.map((navlink) => {
              return (
                <li key={navlink.label}>
                  <a className="hover:underline" href={navlink.link}>
                    {navlink.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {currentlyLoggedInUser ? (
            <button
              onClick={() => handleLogout()}
              className="text-sm font-medium hover:underline hover:font-semibold"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-medium hover:underline hover:font-semibold"
            >
              Login
            </button>
          )}
          <FillButton
            handleClick={() => navigate("/add/new")}
            title={"Add new"}
          />
          <div className="text-base">
            <IoSunnyOutline />
          </div>
          <div
            onClick={() => setIsSidebarOpen(true)}
            className="text-xl md:hidden"
          >
            <BsList />
          </div>
        </div>
      </div>

      {/* Sidebar visible on mobile devices only */}

      {/* sidebar parent covering whole screen */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`w-screen absolute top-0 bottom-0 right-0 transition-all ease-in-out delay-300 md:hidden  ${
          isSidebarOpen ? "left-0" : "left-[-2000px]"
        }`}
      >
        {/* Actual sidebar */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            return null;
          }}
          className="w-[60vw] px-4 py-5 bg-lime-200 min-h-screen md:hidden"
        >
          <Logo />

          {/* sidebar links */}
          <div>
            <ul className="mt-14 text-sm flex flex-col gap-5">
              {navlinks.map((navlink) => {
                return (
                  <li key={navlink.label}>
                    <a href={navlink.link}>{navlink.label}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
