import React, { useState } from "react";
import pcicon from "../assets/pcicon.png";
import { Link, useNavigate } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

function Header() {
  const [showParts, setShowParts] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileParts, setMobileParts] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 shadow-xl bg-black">
        {/* TOP BAR */}
        <div className="flex justify-between items-center text-white p-4 max-w-[1400px] mx-auto">
          <div className="flex gap-4 items-center">
            <Link to="/">
              <img className="w-14 h-14" src={pcicon} alt="logo" />
            </Link>

            <Link to="/" className="font-bold text-xl">
              Buildify_<span className="text-yellow-400">PC</span>
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-10 items-center">
            <Link to="/">Home</Link>
            <Link to="/cart">
              <FaCartArrowDown size={26} />
            </Link>

            {!isLoggedIn ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) : (
              <>
                <span className="text-blue-400">
                  Hi, {user?.name}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-600 px-4 py-1 rounded"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <IoMdClose /> : <GiHamburgerMenu />}
          </button>
        </div>

        {/* PARTS BAR */}
        <div className="hidden md:block bg-[#475569] text-white">
          <div className="flex gap-16 max-w-[1400px] mx-auto py-4">
            <div
              className="relative"
              onMouseEnter={() => setShowParts(true)}
              onMouseLeave={() => setShowParts(false)}
            >
              <button>PC Parts ▼</button>

              {showParts && (
                <div className="absolute bg-[#1f2937] p-6 rounded-xl w-[850px]">
                  <div className="grid grid-cols-4 gap-6">
                    <Link to="/Cpu">CPUs</Link>
                    <Link to="/Cpucooler">CPU Coolers</Link>
                    <Link to="/motherboard">Motherboards</Link>
                    <Link to="/storage">Storage</Link>
                  </div>
                </div>
              )}
            </div>

            
            <Link to="/Completebuild">Completed Builds</Link>
            <Link to="/trend">Trend</Link>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div className="md:hidden bg-[#1f2937] text-white p-6 flex flex-col gap-4">
            <button
              onClick={() => setMobileParts(!mobileParts)}
              className="flex justify-between"
            >
              PC Parts {mobileParts ? "▲" : "▼"}
            </button>

            {mobileParts && (
              <div className="pl-4 flex flex-col gap-2">
                <Link to="/Cpu">CPUs</Link>
                <Link to="/Cpucooler">CPU Coolers</Link>
                <Link to="/motherboard">Motherboards</Link>
                <Link to="/storage">Storage</Link>
              </div>
            )}

            <Link to="/cart">Cart</Link>

            {!isLoggedIn ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) : (
              <>
                <span>Hi, {user?.name}</span>
                <button
                  onClick={logout}
                  className="bg-red-600 py-1 rounded"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* HEADER SPACER */}
      <div className="h-[148px]" />
    </>
  );
}

export default Header;
