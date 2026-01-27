import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl m-5"
    >
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-3 text-lg font-medium"
      >
        All Appointments
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-[#EDE0D4] border border-[#656D4A] rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-auto"
      >
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr_1fr] gap-1 py-3 px-6 border-b border-[#656D4A] bg-[#CBC3B1] sticky top-0 z-10">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
          <p>Progress</p>
        </div>

        <AnimatePresence>
          {appointments.reverse().map((item, index) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              whileHover={{ backgroundColor: "#CBC3B1" }}
              className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b border-[#656D4A] hover:bg-[#CBC3B1] transition-colors hover:cursor-pointer"
              key={item._id}
              onClick={() => navigate(`/doctor/appointment/${item._id}`)}
            >
              <p className="max-sm:hidden">{index + 1}</p>
              <div className="flex items-center gap-2">
                <img
                  className="w-10 rounded-full aspect-square object-cover"
                  src={item.userData.image}
                  alt=""
                />{" "}
                <p>{item.userData.name}</p>
              </div>
              <div>
                <p className="text-xs inline border border-[#656D4A] px-2 rounded-full">
                  {item.payment ? "Online" : "CASH"}
                </p>
              </div>
              <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
              <p>
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>
              <p>
                {currency}
                {item.amount}
              </p>
              {item.cancelled ? (
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-red-400 text-xs font-medium"
                >
                  Cancelled
                </motion.p>
              ) : item.isCompleted ? (
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-green-500 text-xs font-medium"
                >
                  Completed
                </motion.p>
              ) : (
                <div className="flex gap-2">
                  <motion.img
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => cancelAppointment(item._id)}
                    className="w-8 cursor-pointer"
                    src={assets.cancel_icon}
                    alt=""
                  />
                  <motion.img
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => completeAppointment(item._id)}
                    className="w-8 cursor-pointer"
                    src={assets.tick_icon}
                    alt=""
                  />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default DoctorAppointments;
