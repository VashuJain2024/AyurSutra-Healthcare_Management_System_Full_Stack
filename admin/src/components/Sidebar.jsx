import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";
import { motion } from "framer-motion";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const adminMenuItems = [
    { to: "/admin-dashboard", icon: assets.home_icon, label: "Dashboard" },
    { to: "/all-appointments", icon: assets.appointment_icon, label: "Appointments" },
    { to: "/add-therapist", icon: assets.add_icon, label: "Add Therapist" },
    { to: "/therapists-list", icon: assets.people_icon, label: "Therapists List" }
  ];

  const doctorMenuItems = [
    { to: "/doctor-dashboard", icon: assets.home_icon, label: "Dashboard" },
    { to: "/doctor-appointments", icon: assets.appointment_icon, label: "Appointments" },
    { to: "/doctor-profile", icon: assets.people_icon, label: "Profile" }
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="min-h-screen bg-[#EDE0D4] border-r border-[#656D4A]"
    >
      {aToken && (
        <ul className="text-[#515151] mt-5">
          {adminMenuItems.map((item, index) => (
            <NavLink
              key={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all ${isActive ? "bg-[#656D4A] bg-opacity-25 border-r-4 border-[#656D4A]" : "hover:bg-[#CBC3B1]"
                }`
              }
              to={item.to}
            >
              {({ isActive }) => (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 w-full"
                >
                  <motion.img
                    animate={{ rotate: isActive ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                    src={item.icon}
                    alt=""
                  />
                  <p className="hidden md:block">{item.label}</p>
                </motion.div>
              )}
            </NavLink>
          ))}
        </ul>
      )}

      {dToken && (
        <ul className="text-[#515151] mt-5">
          {doctorMenuItems.map((item, index) => (
            <NavLink
              key={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all ${isActive ? "bg-[#CBC3B1] border-r-4 border-[#656D4A]" : "hover:bg-[#CBC3B1]/50"
                }`
              }
              to={item.to}
            >
              {({ isActive }) => (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 w-full"
                >
                  <motion.img
                    animate={{ rotate: isActive ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                    src={item.icon}
                    alt=""
                  />
                  <p className="hidden md:block">{item.label}</p>
                </motion.div>
              )}
            </NavLink>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default Sidebar;
