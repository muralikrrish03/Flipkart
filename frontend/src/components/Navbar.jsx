import { TiShoppingCart } from "react-icons/ti";
import React, { useEffect, useState } from "react";
import logo from "../assets/flipkart.png";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { IoBagAddOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { RiAdminLine } from "react-icons/ri";

const Navbar = ({
  setViewSlider,
  setNewPro,
  authData,
  setAuthData,
  viewSlider,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(null);
  const [cartCount, setCartCount] = useState(
    JSON.parse(localStorage.getItem("cards"))?.length || 0
  );

  useEffect(() => {
    const fetchUser = () => {
      fetch(import.meta.env.VITE_AUTH_URL + "/me", { credentials: "include" })
        .then((res) => {
          if (!res.ok) throw new Error("Not authenticated");
          return res.json();
        })
        .then((data) => {
          setAuthData(data);
          setAuth(data.user.role);
          setNewPro(data.user.role);
        })
        .catch((err) => {
          console.error("Auth error:", err);
          setAuthData(null);
        })
        .finally(() => setLoading(false));
    };

    fetchUser();
    const interval = setInterval(fetchUser, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [setNewPro]);

  if (loading) return <div>Loading...</div>;

  const handleLogout = () => {
    fetch(import.meta.env.VITE_AUTH_URL + "/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      setAuthData(null);
      navigate("/login");
    });
  };

  return (
    <div className="h-20 shadow-[0px_0px_10px_black]  mt-3 w-140 lg:w-[90vw] mx-auto rounded-full flex justify-between">
      <Link to="/" className="flex items-center  ">
        <img className="size-15 ml-2  lg:size-20" src={logo} alt="Flipkart logo" />
        <i className="font-bold  hidden  lg:block  relative mb-2 text-blue-500 text-4xl underline">
          Flipkart
        </i>
      </Link>

      <Search setViewSlider={setViewSlider} viewSlider={viewSlider} />

      <div
        className={`${
          auth === "admin" ? "w-120" : "140"
        } flex justify-around gap-x-4 mr-3 items-center`}
      >
        {auth === "admin" && (
          <Link
            to="/newproduct"
            className="px-2 lg:px-5 py-1 rounded-full relative border-3 bg-blue-500 text-white flex items-center gap-x-2 shadow-[0px_0px_1px_black]"
          >
            <IoBagAddOutline />
            Add
          </Link>
        )}

        <Link
          to="/Card"
          className="px-2 lg:px-5 py-1 rounded-full relative border-3 bg-blue-500 text-white flex items-center shadow-[0px_0px_1px_black]"
        >
          <TiShoppingCart className="my-auto mr-3" /> Card
          <span className="bg-yellow-400 w-7 text-center absolute border-3 bottom-6 rounded-full right-0">
            {cartCount}
          </span>
        </Link>

        {authData?.user?.role === "admin" ? (
          <Link
            to="/admin"
            className="px-2 lg:px-5 py-1 rounded-full relative border-3 bg-blue-500 text-white flex items-center gap-x-2 shadow-[0px_0px_1px_black]"
          >
            <RiAdminLine />
            Admin
          </Link>
        ) : (
          <Link
            to="/login"
            className="px-1 lg:px-4 py-1 rounded-full border-3 bg-blue-500 text-white flex items-center shadow-[0px_0px_1px_black]"
          >
            <CgProfile className="my-auto size-5 mr-2" />
            {authData?.user?.username || "Account"}
          </Link>
        )}

        <Link
          onClick={handleLogout}
          className="px-3 py-1 bg-blue-500 border-3 text-white rounded-full shadow-[0px_0px_1px_black] flex items-center gap-x-1"
        >
          Logout
          <CiLogin className="mt-1" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
