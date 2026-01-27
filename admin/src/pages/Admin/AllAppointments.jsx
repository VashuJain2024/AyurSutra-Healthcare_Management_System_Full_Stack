import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { motion, AnimatePresence } from "framer-motion";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

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
        transition={{ delay: 0.2 }}
        className="mb-3 text-lg font-medium"
      >
        All Appointments
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-[#EDE0D4] border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto border-[#656D4A]"
      >
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-[#656D4A] bg-[#CBC3B1] sticky top-0 z-10">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        <AnimatePresence>
          {appointments.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              whileHover={{ backgroundColor: "#CBC3B1" }}
              className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-[#656D4A] hover:bg-[#CBC3B1] transition-colors"
              key={item._id}
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
              <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
              <p>
                {slotDateFormat(item.slotDate)}, {item.slotTime}
              </p>
              <div className="flex items-center gap-2">
                <img
                  className="w-10 rounded-full aspect-square object-cover"
                  src={item.docData.image}
                  alt=""
                />{" "}
                <p>{item.docData.name}</p>
              </div>
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
                <motion.img
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => cancelAppointment(item._id)}
                  className="w-8 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default AllAppointments;
