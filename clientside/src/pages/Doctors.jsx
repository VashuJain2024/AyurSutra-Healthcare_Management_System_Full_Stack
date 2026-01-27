import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <p className="text-gray-600">Browse through the therapists specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-primary text-white" : ""
            }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex" : "hidden sm:flex"
            }`}
        >
          {["Basti", "Vamana", "Nasya", "Virechana", "Raktmokshana"].map((spec) => (
            <p
              key={spec}
              onClick={() =>
                speciality === spec
                  ? navigate("/therapists")
                  : navigate(`/therapists/${spec}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer hover:bg-[#545b3e] hover:text-white ${speciality === spec
                ? "bg-[#545b3e] text-white"
                : ""
                }`}
            >
              {spec}
            </p>
          ))}
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          <AnimatePresence>
            {filterDoc.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}

                onClick={() => navigate(`/appointment/${item._id}`)}
                className="border border-[#414833] rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg hover:translate-y-[-10px] transition-all duration-500"
                key={item._id || index}
              >
                <img className="aspect-square object-cover" src={item.image} alt="" />
                <div className="p-4">
                  <div
                    className={`flex items-center gap-2 text-sm text-center ${item.available ? "text-green-500" : "text-gray-500"
                      }`}
                  >
                    <p
                      className={`w-2 h-2 ${item.available ? "bg-green-500" : "bg-gray-500"
                        } rounded-full`}
                    ></p>
                    <p>{item.available ? "Available" : "Not Available"}</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                  <p className="text-gray-600 text-sm ">{item.speciality}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Doctors;
