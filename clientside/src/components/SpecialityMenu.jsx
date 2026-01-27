import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-16 pb-12 sm:pt-24 text-gray-800' id='speciality'>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-3xl font-medium'
      >
        Find by Speciality
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='sm:w-1/3 text-center text-sm'
      >
        Simply browse through our extensive list of trusted therapists, schedule your appointment hassle-free.
      </motion.p>
      <div className='flex sm:justify-center gap-6 pt-5 w-full overflow-hidden'>
        {specialityData.map((item, index) => (
          <Link onClick={() => scrollTo(0, 0)} key={index} to={`/therapists/${item.speciality}`}>
            <motion.div
              whileHover={{ scale: 1.1, translateY: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0'
            >
              <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
              <p>{item.speciality}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
