import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          console.log(data.token);

        } else {
          toast.error(data.message);
        }
      }
    } catch (error) { }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#656D4A] via-[#7a8355] to-[#656D4A] relative overflow-hidden"
      >
        {/* Decorative circles */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-white">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-4">AyurSutra</h1>
            <p className="text-xl text-white/90 mb-8">Admin & Therapist Portal</p>
            <div className="w-20 h-1 bg-white/50 mx-auto mb-8"></div>
            <p className="text-white/80 text-lg max-w-md">
              Manage appointments, therapists, and patient care with our comprehensive admin system.
            </p>
          </motion.div>

          {/* Animated stats */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-8 mt-16"
          >
            {[
              { label: "Therapists", value: "50+" },
              { label: "Patients", value: "1000+" },
              { label: "Appointments", value: "5000+" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-white/70 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#EDE0D4] p-8">
        <motion.form
          onSubmit={onSubmitHandler}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-full max-w-md"
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-[#656D4A]/20"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-500">Sign in to continue</p>
            </motion.div>

            {/* Role Toggle */}
            <div className="flex gap-2 mb-6 bg-[#EDE0D4] p-1 rounded-lg">
              {["Admin", "Doctor"].map((role) => (
                <motion.button
                  key={role}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setState(role)}
                  className={`flex-1 py-2 rounded-md font-medium transition-all ${state === role
                      ? "bg-[#656D4A] text-white shadow-md"
                      : "text-gray-600 hover:text-gray-800"
                    }`}
                >
                  {role}
                </motion.button>
              ))}
            </div>

            {/* Email Input */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-4"
            >
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#656D4A] transition-all"
                type="email"
                placeholder="Enter your email"
                required
              />
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#656D4A] transition-all"
                type="password"
                placeholder="Enter your password"
                required
              />
            </motion.div>

            {/* Login Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(101, 109, 74, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#656D4A] to-[#7a8355] text-white py-3 rounded-lg font-semibold shadow-lg transition-all"
            >
              Sign In
            </motion.button>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center text-sm text-gray-600"
            >
              {state === "Admin" ? (
                <p>
                  Therapist Login?{" "}
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="text-[#656D4A] font-semibold cursor-pointer hover:underline"
                    onClick={() => setState("Doctor")}
                  >
                    Click here
                  </motion.span>
                </p>
              ) : (
                <p>
                  Admin Login?{" "}
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="text-[#656D4A] font-semibold cursor-pointer hover:underline"
                    onClick={() => setState("Admin")}
                  >
                    Click here
                  </motion.span>
                </p>
              )}
            </motion.div>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
};

export default Login;
