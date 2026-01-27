import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();

  const { token, setToken, userData, setUserData } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    setUserData(false);
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 bg-[#EDE0D4]/80 backdrop-blur-md transition-all duration-300 w-full flex items-center justify-between text-sm py-4 mb-5 border-b border-[#656D4A]/20 px-4 sm:px-[10%]">
      <motion.img
        // whileHover={{ scale: 1.05 }}
        // whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />
      <ul className="hidden lg:flex items-start gap-8 font-medium">
        {["HOME", "THERAPIES", "THERAPISTS", "ABOUT", "CONTACT"].map((item) => (
          <NavLink
            key={item}
            to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
            className={({ isActive }) =>
              `relative py-1 text-[#656D4A] group transition-colors ${isActive ? "font-semibold" : ""
              }`
            }
          >
            {item}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#656D4A] transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        ))}
      </ul>
      <div className="flex items-center gap-6">
        <img src={assets.dosha} alt="" className="w-10 cursor-pointer" onClick={() => navigate("/dosha")} />
        {token && userData ? (
          <div className="hidden sm:flex items-center gap-2 cursor-pointer group relative">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-10 h-10 rounded-full object-cover border border-[#656D4A]"
              src={userData.image}
              alt="profile"
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-12 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="min-w-48 bg-stone-100 rounded shadow-lg flex flex-col gap-4 p-4"
              >
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-[#656D4A] cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-[#656D4A] cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="hover:text-[#656D4A] cursor-pointer"
                >
                  Logout
                </p>
              </motion.div>
            </div>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="bg-[#656D4A] text-white px-8 py-3 rounded-full font-light hidden md:block shadow-md hover:bg-[#545b3e] transition-colors"
          >
            Create account
          </motion.button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 lg:hidden cursor-pointer"
          src={assets.menu_icon}
          alt=""
        />

        {/* ---------- Mobile Menu ---------- */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed w-full h-[calc(100vh-4rem)] right-0 top-0 bottom-0 z-[100] bg-white overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-6 border-b">
                <img className="w-36" src={assets.logo} alt="" />
                <img
                  className="w-7 cursor-pointer"
                  onClick={() => setShowMenu(false)}
                  src={assets.cross_icon}
                  alt=""
                />
              </div>
              <ul className="flex flex-col items-center gap-2 mt-10 px-2 text-lg font-medium">
                {["HOME", "THERAPIES", "THERAPISTS", "ABOUT", "CONTACT"].map(
                  (item) => (
                    <NavLink
                      key={item}
                      onClick={() => setShowMenu(false)}
                      to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                    >
                      <p className="px-4 py-2 rounded inline-block text-[#656D4A] hover:bg-stone-100 w-full text-center">
                        {item}
                      </p>
                    </NavLink>
                  )
                )}

                {/* Mobile Auth Links */}
                {token ? (
                  <>
                    <div className="w-1/2 h-px bg-[#656D4A]/20 my-2"></div>
                    <p onClick={() => { navigate('/my-profile'); setShowMenu(false); }} className="px-4 py-2 rounded inline-block text-[#656D4A] hover:bg-stone-100 w-full text-center cursor-pointer">My Profile</p>
                    <p onClick={() => { navigate('/my-appointments'); setShowMenu(false); }} className="px-4 py-2 rounded inline-block text-[#656D4A] hover:bg-stone-100 w-full text-center cursor-pointer">My Appointments</p>
                    <p onClick={() => { logout(); setShowMenu(false); }} className="px-4 py-2 rounded inline-block text-[#656D4A] hover:bg-stone-100 w-full text-center cursor-pointer">Logout</p>
                  </>
                ) : (
                  <button
                    onClick={() => { navigate('/login'); setShowMenu(false); }}
                    className="bg-[#656D4A] text-white px-8 py-3 rounded-full font-light shadow-md hover:bg-[#545b3e] transition-colors mt-4"
                  >
                    Create account
                  </button>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
