import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="md:mx-10"
    >
      <div className="text-center text-2xl pt-10 text-[#414833] font-semibold">
        <p>
          ABOUT US
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px] rounded-lg shadow-md"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-[#414833]">
          <p>
            Welcome to AyurSutra Panchakarma, your trusted partner in holistic wellness and Ayurvedic healing. At AyurSutra, we understand the importance of balancing body, mind, and spirit, and we are dedicated to helping you achieve optimal health through authentic Panchakarma therapies.
          </p>
          <p>
            AyurSutra is committed to excellence in Ayurvedic healthcare. We continuously enhance our treatments and services, integrating traditional wisdom with modern wellness practices to ensure a safe, effective, and rejuvenating experience. Whether you are seeking detoxification, stress relief, or overall wellness, AyurSutra is here to guide and support you on your journey to holistic health.
          </p>
          <b className="text-[#414833]">Our Vision</b>
          <p>
            Our vision at AyurSutra Panchakarma is to make authentic Ayurvedic healing accessible to everyone. We strive to create a serene and transformative wellness experience, bridging the gap between ancient wisdom and modern lifestyles, so you can achieve balance, vitality, and long-lasting well-being.
          </p>
        </div>
      </div>

      <div className="text-xl my-4 text-[#414833]">
        <p>
          WHY <span className="text-[#414833] font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="border border-[#414833] px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#414833] hover:text-white transition-all duration-300 text-[#656D4A] cursor-pointer rounded-lg shadow-sm"
        >
          <b>Authentic Panchakarma Treatments :</b>
          <p>
            Traditional therapies guided by experienced Ayurvedic practitioners.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="border border-[#414833] px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#414833] hover:text-white transition-all duration-300 text-[#656D4A]  cursor-pointer rounded-lg shadow-sm"
        >
          <b>Personalized Treatments :</b>
          <p>
            Tailored treatments based on your body type and health needs.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="border border-[#414833] px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#414833] hover:text-white transition-all duration-300 text-[#656D4A]  cursor-pointer rounded-lg shadow-sm"
        >
          <b>Certified Experts :</b>
          <p>
            Skilled Ayurvedic doctors and therapists ensuring safe and effective care.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
