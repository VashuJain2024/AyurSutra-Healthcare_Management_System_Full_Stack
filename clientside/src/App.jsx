import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Therapies from "./pages/Therapies";
import NotFound from "./pages/NotFound";
import Dosha from "./pages/Dosha";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const location = useLocation();

  const currentPath = location.pathname.endsWith("/") && location.pathname !== "/"
    ? location.pathname.slice(0, -1)
    : location.pathname;

  const validPaths = [
    "/",
    "/therapies",
    "/therapists",
    "/about",
    "/contact",
    "/login",
    "/my-profile",
    "/my-appointments",
    "/dosha",
  ];

  const isValid =
    validPaths.includes(currentPath) ||
    currentPath.startsWith("/therapists/") ||
    currentPath.startsWith("/appointment/");

  const hideLayout = !isValid;



  return (
    <div className={`${hideLayout ? "bg-white" : "bg-[#EDE0D4]"} min-h-screen font-outfit`}>
      <ToastContainer />

      {!hideLayout && <Navbar />}

      <div className="px-[10%]">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/therapies" element={<Therapies />} />
          <Route path="/therapists" element={<Doctors />} />
          <Route path="/therapists/:speciality" element={<Doctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dosha" element={<Dosha />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/appointment/:docId" element={<Appointment />} />

          {/* Not Found Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {!hideLayout && <Footer />}
      </div>
    </div>
  );
};

export default App;
