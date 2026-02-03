import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Banner = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);
  // console.log(userData);

  return (
    <div className="flex bg-[#656D4A] rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10">
      {/* ---------- Left Side -------- */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5"
      >
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
          <p>Book Appointment</p>
          <p className="mt-4">With 100+ Trusted Therapists</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (userData) {
              navigate("/my-profile");
            } else {
              navigate("/login");
            }
            scrollTo(0, 0);
          }}
          className="bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 shadow-md hover:shadow-lg transition-all"
        >
          {userData ? "My Profile" : "Create account"}
        </motion.button>
      </motion.div>

      {/* ---------- Right Side -------- */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="hidden md:block md:w-1/2 lg:w-[370px] relative"
      >
        <img
          className="w-full absolute bottom-0 right-0 max-w-md"
          src={assets.therapist_banner}
          alt=""
        />
      </motion.div>
    </div>
  );
};

export default Banner;
