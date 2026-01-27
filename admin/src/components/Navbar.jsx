import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-[#EDE0D4] border-[#656D4A] shadow-sm"
    >
      <div className="flex items-center gap-2 text-xs">
        <motion.img
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-36 sm:w-40 cursor-pointer"
          src={assets.logo}
          alt=""
        />
        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="border px-2.5 py-0.5 rounded-full border-[#656D4A] text-gray-600 bg-white shadow-sm"
        >
          {aToken ? "Admin" : "Therapist"}
        </motion.p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "#545b3e" }}
        whileTap={{ scale: 0.95 }}
        onClick={logout}
        className="bg-[#656D4A] text-white text-sm px-10 py-2 rounded-full shadow-md transition-colors"
      >
        Logout
      </motion.button>
    </motion.div>
  );
};

export default Navbar;
