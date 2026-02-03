import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      // console.log(error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, [dToken]);

  return (
    profileData && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-4 m-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              className="bg-[#EDE0D4] aspect-square object-cover w-full sm:max-w-64 rounded-lg shadow-lg"
              src={profileData.image}
              alt=""
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 border border-[#656D4A] rounded-lg p-8 py-7 bg-[#EDE0D4] shadow-lg"
          >
            {/* ------- Doc Info: name, degree, experience ------- */}

            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700 border-b border-[#656D4A] pb-2">
              {profileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600 border-b border-[#656D4A] pb-2">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>
              <button className="py-0.5 px-2 my-2 border text-xs rounded-full border-[#656D4A]">
                {profileData.experience}
              </button>
            </div>

            {/* ------- Doc About ------- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About:
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {profileData.about}
              </p>
            </div>

            <p className="text-gray-600 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-800">
                {currency}{" "}
                <AnimatePresence mode="wait">
                  {isEdit ? (
                    <motion.input
                      key="edit-fees"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      type="number"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          fees: e.target.value,
                        }))
                      }
                      value={profileData.fees}
                      className="border border-[#656D4A] rounded bg-transparent p-1 focus:outline-none focus:border-[#656D4A] focus:ring-1 focus:ring-[#656D4A]"
                    />
                  ) : (
                    <motion.span
                      key="view-fees"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {profileData.fees}
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </p>

            <div className="flex gap-2 py-2">
              <p>Address:</p>
              <p className="text-sm">
                <AnimatePresence mode="wait">
                  {isEdit ? (
                    <motion.span
                      key="edit-address"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <input
                        type="text"
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            address: { ...prev.address, line1: e.target.value },
                          }))
                        }
                        value={profileData.address.line1}
                        className="border border-[#656D4A] rounded bg-transparent p-1 mb-1 w-full focus:outline-none focus:border-[#656D4A] focus:ring-1 focus:ring-[#656D4A]"
                      />
                      <br />
                      <input
                        type="text"
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            address: { ...prev.address, line2: e.target.value },
                          }))
                        }
                        value={profileData.address.line2}
                        className="border border-[#656D4A] rounded bg-transparent p-1 w-full focus:outline-none focus:border-[#656D4A] focus:ring-1 focus:ring-[#656D4A]"
                      />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="view-address"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {profileData.address.line1}
                      <br />
                      {profileData.address.line2}
                    </motion.span>
                  )}
                </AnimatePresence>
              </p>
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm cursor-pointer">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  onChange={() =>
                    isEdit &&
                    setProfileData((prev) => ({
                      ...prev,
                      available: !prev.available,
                    }))
                  }
                  checked={profileData.available}
                  type="checkbox"
                  className="hidden"
                  name=""
                  id=""
                />

                {/* Custom Animated Checkbox */}
                <motion.span
                  animate={{
                    backgroundColor: profileData.available ? "#16a34a" : "transparent",
                    borderColor: profileData.available ? "#16a34a" : "#9ca3af",
                  }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5 flex items-center justify-center rounded border-2"
                >
                  <AnimatePresence>
                    {profileData.available && (
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

                <p className={`${profileData.available ? "text-green-600" : "text-gray-500"}`}>
                  Available
                </p>
              </label>
            </div>

            <AnimatePresence mode="wait">
              {isEdit ? (
                <motion.button
                  key="save-btn"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  whileHover={{ scale: 1.05, backgroundColor: "#656D4A", color: "#ffffff" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={updateProfile}
                  className="px-4 py-1 border border-[#656D4A] text-sm rounded-full mt-5 transition-all shadow-md"
                >
                  Save
                </motion.button>
              ) : (
                <motion.button
                  key="edit-btn"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  whileHover={{ scale: 1.05, backgroundColor: "#656D4A", color: "#ffffff" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEdit(true)}
                  className="px-4 py-1 border border-[#656D4A] text-sm rounded-full mt-5 transition-all shadow-md"
                >
                  Edit
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    )
  );
};

export default DoctorProfile;
