import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Header = () => {
  return (
    <div
      className="relative rounded-lg overflow-hidden flex flex-col md:flex-row flex-wrap px-6 md:px-10 lg:px-20"
      style={{
        backgroundImage: `url(${assets.HomeBg})`, // 👈 Background Image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay effect for readability */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* ------- Content Area ------- */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 pb-5 md:pt-[15vw] md:pb-20 md:mb-[-30px]"
      >

        {/* Heading */}
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
          Book Appointment <br /> With Trusted Therapists
        </p>

        {/* Sub Text with image */}
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted therapists,
            <br className="hidden sm:block" />
            schedule your appointment hassle-free.
          </p>
        </div>

        {/* CTA Button */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#speciality"
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Book appointment
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </motion.a>
      </motion.div>

    </div>
  )
}

export default Header
