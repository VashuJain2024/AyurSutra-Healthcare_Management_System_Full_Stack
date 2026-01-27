import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="md:mx-10"
    >
      <div className="text-center text-2xl pt-10 text-[#414833] font-semibold">
        <p>CONTACT US</p>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <motion.img
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full md:max-w-[360px] rounded-lg shadow-md"
          src={assets.contact_image}
          alt=""
        />
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col justify-center items-start gap-6 text-[#414833]"
        >
          <p className="font-semibold text-lg">OUR OFFICE</p>
          <p>
            AyurSutra Headquarters <br />
            2nd Floor, Green Park Market <br />
            New Delhi - 110016, India
          </p>
          <p>
            Tel: +91-9999887766<br />
            Email: support@ayursutra.in
          </p>
          <p className="font-semibold text-lg">
            WORK WITH US
          </p>
          <p>
            Be a part of our mission to make Ayurveda accessible to everyone.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-[#414833] px-8 py-3 rounded-full text-sm hover:bg-[#414833] hover:text-white transition-all duration-500 shadow-md"
          >
            Join Our Team
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
