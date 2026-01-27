import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* ------------ Left Section ------------ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-[#656D4A] leading-6">
            At AyurSutra, we embrace the power of Ayurveda to improve your everyday health. Browse experienced therapists, book hassle-free appointments, and take meaningful steps toward natural healing. Modern care, backed by centuries of wisdom.
          </p>
        </motion.div>

        {/* ------------ Center Section ------------ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-xl font-medium mb-5 text-[#656D4A]">COMPANY</p>
          <ul className="flex flex-col gap-2 text-[#656D4A]">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </motion.div>

        {/* ------------ Right Section ------------ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-xl font-medium mb-5 text-[#656D4A]">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-[#656D4A]">
            <li>+91-9999887766</li>
            <li>support@ayursutra.in</li>
          </ul>
        </motion.div>
      </div>

      {/* ------------ Copyright Text ------------ */}
      <div>
        <hr className="border-none h-[1px] bg-[#656D4A]" />
        <p className="py-5 text-sm text-center text-[#656D4A]">
          Copyright © 2025 Team VEDA - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
