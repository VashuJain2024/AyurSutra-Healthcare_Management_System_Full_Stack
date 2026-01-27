import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { motion, AnimatePresence } from "framer-motion";

const DoctorsList = () => {
    const { doctors, aToken, getAllDoctors, changeAvailability } =
        useContext(AdminContext);
    useEffect(() => {
        if (aToken) {
            getAllDoctors();
        }
    }, [aToken]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="m-5 max-h-[90vh] overflow-y-auto"
        >
            <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg font-medium"
            >
                All Therapists
            </motion.h1>
            <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
                {doctors.map((item, index) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(101, 109, 74, 0.3)" }}
                        className="border border-[#656D4A] rounded-xl max-w-56 overflow-hidden cursor-pointer group bg-white shadow-md"
                    >
                        <div className="overflow-hidden">
                            <img
                                className="bg-[#656D4A] transition-all duration-500 aspect-square w-full object-cover group-hover:scale-110"
                                src={item.image}
                                alt=""
                            />
                        </div>
                        <div className="p-4">
                            <p className="text-[#656D4A] text-lg font-medium">
                                {item.name}
                            </p>
                            <p className="text-[#656D4A] text-sm">{item.speciality}</p>
                            <div className="mt-2 flex items-center gap-2 text-sm cursor-pointer">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        onChange={() => changeAvailability(item._id)}
                                        type="checkbox"
                                        checked={item.available}
                                        className="hidden"
                                    />

                                    {/* Custom Animated Checkbox */}
                                    <motion.span
                                        animate={{
                                            backgroundColor: item.available ? "#16a34a" : "transparent",
                                            borderColor: item.available ? "#16a34a" : "#9ca3af",
                                        }}
                                        transition={{ duration: 0.2 }}
                                        className="w-5 h-5 flex items-center justify-center rounded border-2"
                                    >
                                        <AnimatePresence>
                                            {item.available && (
                                                <motion.span
                                                    initial={{ scale: 0, rotate: -180 }}
                                                    animate={{ scale: 1, rotate: 0 }}
                                                    exit={{ scale: 0, rotate: 180 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="text-white text-xs font-bold"
                                                >
                                                    ✔
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.span>

                                    <p className={`${item.available ? "text-green-600" : "text-gray-500"}`}>
                                        Available
                                    </p>
                                </label>
                            </div>

                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default DoctorsList;
