import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);

  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="m-5"
      >
        <div className="flex flex-wrap gap-3">
          {[
            { icon: assets.doctor_icon, value: dashData.doctors, label: "Therapists" },
            { icon: assets.appointments_icon, value: dashData.appointments, label: "Appointments" },
            { icon: assets.patients_icon, value: dashData.patients, label: "Patients" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex items-center gap-2 bg-[#EDE0D4] p-4 min-w-52 rounded border-2 border-[#656D4A] cursor-pointer shadow-md hover:shadow-xl transition-shadow"
            >
              <img className="w-14" src={stat.icon} alt="" />
              <div>
                <p className="text-xl font-semibold text-gray-600">
                  {stat.value}
                </p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-[#EDE0D4]"
        >
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-[#656D4A]">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Appointments</p>
          </div>

          <div className="pt-4 border border-t-0 border-[#656D4A] max-h-[60vh] overflow-y-auto">
            <AnimatePresence>
              {dashData.latestAppointments.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ backgroundColor: "#CBC3B1" }}
                  className="flex items-center px-6 py-3 hover:bg-[#CBC3B1] transition-colors"
                  key={item._id}
                >
                  <img
                    className="rounded-full w-10 aspect-square object-cover"
                    src={item.docData.image}
                    alt=""
                  />
                  <div className="flex-1 text-sm ml-2">
                    <p className="text-gray-800 font-medium">
                      {item.docData.name}
                    </p>
                    <p className="text-gray-600">
                      {slotDateFormat(item.slotDate)}
                    </p>
                  </div>
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
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt=""
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    )
  );
};

export default Dashboard;
