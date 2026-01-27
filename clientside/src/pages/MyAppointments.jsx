import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>
      <div>
        {
          appointments.length === 0 ? (
            <p className="text-center text-zinc-600 mt-12">
              You have no appointments booked.
            </p>
          ) : (
            <AnimatePresence>
              {appointments.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
                  key={index}
                >
                  <div>
                    <img
                      className="w-32 bg-indigo-50 aspect-square object-cover"
                      src={item.docData.image}
                      alt=""
                    />
                  </div>

                  <div className="flex-1 text-sm text-zinc-600">
                    <p className="text-neutral-800 font-semibold">
                      {item.docData.name}
                    </p>
                    <p>{item.docData.speciality}</p>
                    <p className="text-zinc-700 font-medium mt-1">Address:</p>
                    <p className="text-xs">{item.docData.address.line1}</p>
                    <p className="text-xs">{item.docData.address.line2}</p>
                    <p className="text-xs mt-1">
                      <span className="text-sm text-neutral-700 font-medium">
                        Date & Time:
                      </span>{" "}
                      {slotDateFormat(item.slotDate)} | {item.slotTime}
                    </p>
                  </div>

                  <div></div>

                  <div className="flex flex-col gap-2 justify-center">
                    {!item.cancelled && !item.isCompleted && (
                      <>
                        <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#656D4A] hover:text-white transition-all duration-300">
                          Pay Online
                        </button>

                        <button
                          onClick={() => cancelAppointment(item._id)}
                          className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                        >
                          Cancel appointment
                        </button>
                      </>
                    )}

                    {item.cancelled && !item.isCompleted && (
                      <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                        Appointment cancelled
                      </button>
                    )}

                    {item.isCompleted && (
                      <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                        Completed
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )
        }

      </div>
    </motion.div>
  );
};

export default MyAppointments;
