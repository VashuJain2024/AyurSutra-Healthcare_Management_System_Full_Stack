import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const openRecord = (record) => {
    setSelectedRecord(record);
    setTimeout(() => {
      const element = document.getElementById("record-details-view");
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        element.style.paddingTop = "100px";
      }
    }, 100);
  };

  const closeRecordView = () => {
    setSelectedRecord(null);
  };


  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };

  // Medical Records
  const [formData, setFormData] = useState({
    condition: "",
    description: "",
    symptoms: "",
    doctor: "",
    reports: "",
    date: "",
    notesRight: "",
    painScale: "",
    painDuration: "",
  });

  const [editRecordId, setEditRecordId] = useState(null);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Medical Record:", formData);

    try {
      const form = new FormData();
      form.append("condition", formData.condition);
      form.append("description", formData.description);
      form.append("symptoms", formData.symptoms);
      form.append("doctor", formData.doctor);
      form.append("reports", formData.reports);
      form.append("date", formData.date);
      form.append("notesRight", formData.notesRight);
      form.append("painScale", formData.painScale);
      form.append("painDuration", formData.painDuration);

      // console.log("Form Data:", editRecordId);
      const url = editRecordId
        ? backendUrl + "/api/user/update-record"
        : backendUrl + "/api/user/add-record";

      if (editRecordId) {
        form.append("recordId", editRecordId);
      }

      const { data } = await axios.post(
        url,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setEditRecordId(null);
        setFormData({
          condition: "",
          description: "",
          symptoms: "",
          doctor: "",
          reports: "",
          date: "",
          notesRight: "",
          painScale: "",
          painDuration: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };

  const handleDeleteRecord = async (recordId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/delete-record",
        { recordId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        // If deleting currently edited record, reset form
        if (editRecordId === recordId) {
          setEditRecordId(null);
          setFormData({
            condition: "",
            description: "",
            symptoms: "",
            doctor: "",
            reports: "",
            date: "",
            notesRight: "",
            painScale: "",
            painDuration: "",
          });
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };

  const handleEditRecord = (item) => {
    setEditRecordId(item._id);
    setFormData({
      condition: item.condition,
      description: item.description,
      symptoms: Array.isArray(item.symptoms) ? item.symptoms.join(", ") : item.symptoms,
      doctor: item.doctor,
      reports: item.reports[0] || "", // For display/logic
      date: item.date ? item.date.split('T')[0] : "",
      notesRight: item.notes || "",
      painScale: item.painScale || "",
      painDuration: item.painDuration || "",
    });
    // Scroll to form
    document.getElementById("medical-record-form").scrollIntoView({ behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditRecordId(null);
    setFormData({
      condition: "",
      description: "",
      symptoms: "",
      doctor: "",
      reports: "",
      date: "",
      notesRight: "",
      painScale: "",
      painDuration: "",
    });
  };


  return (
    userData && (
      <div className="max-w-[95%] xl:max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 flex flex-col gap-6 md:gap-10">

        {/* ROW 1: Profile Card + Add Record Form */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">

          {/* Profile Card (Left) */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-full bg-transparent border-2 border-[#656D4A] shadow-xl rounded-2xl p-6 md:p-8 text-[#656D4A]"
            >
              <div className="flex flex-col items-center gap-4 mb-4">
                {isEdit ? (
                  <label htmlFor="image" className="relative cursor-pointer group">
                    <div className="relative">
                      <img
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover opacity-75 group-hover:opacity-50 transition-opacity border-4 border-[#656D4A]"
                        src={image ? URL.createObjectURL(image) : userData.image}
                        alt=""
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          className="w-8 md:w-10 opacity-0 group-hover:opacity-100 transition-opacity"
                          src={image ? "" : assets.upload_icon}
                          alt=""
                        />
                      </div>
                    </div>
                    <input
                      onChange={(e) => setImage(e.target.files[0])}
                      type="file"
                      id="image"
                      hidden
                    />
                  </label>
                ) : (
                  <img className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-md border-4 border-[#656D4A]" src={userData.image} alt="" />
                )}

                {isEdit ? (
                  <input
                    className="text-xl md:text-2xl font-semibold text-center mt-2 bg-transparent border border-[#656D4A] rounded-lg px-3 py-2 focus:outline-none focus:bg-[#656D4A]/10 transition-colors w-full text-[#656D4A] placeholder-gray-400"
                    type="text"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                ) : (
                  <p className="font-semibold text-xl md:text-2xl text-[#656D4A]">
                    {userData.name}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 font-medium tracking-wide border-b border-[#656D4A] pb-1 mb-2 uppercase text-xs">Contact Information</p>
                  <div className="grid grid-cols-[1fr_3fr] gap-y-2 gap-x-4 text-xs md:text-sm">
                    <p className="font-medium text-gray-600">Email id:</p>
                    <p className="text-[#656D4A] truncate">{userData.email}</p>

                    <p className="font-medium text-gray-600">Phone:</p>
                    {isEdit ? (
                      <input
                        className="bg-transparent border border-[#656D4A] rounded px-2 py-1 focus:outline-none focus:bg-[#656D4A]/10 w-full max-w-xs text-[#656D4A]"
                        type="text"
                        value={userData.phone}
                        onChange={(e) =>
                          setUserData((prev) => ({ ...prev, phone: e.target.value }))
                        }
                      />
                    ) : (
                      <p className="text-[#656D4A]">{userData.phone}</p>
                    )}

                    <p className="font-medium text-gray-600">Address:</p>
                    {isEdit ? (
                      <div className="space-y-2 w-full">
                        <input
                          className="bg-transparent border border-[#656D4A] rounded px-2 py-1 focus:outline-none focus:bg-[#656D4A]/10 w-full text-[#656D4A]"
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              address: { ...prev.address, line1: e.target.value },
                            }))
                          }
                          value={userData.address.line1}
                          type="text"
                          placeholder="Line 1"
                        />
                        <input
                          className="bg-transparent border border-[#656D4A] rounded px-2 py-1 focus:outline-none focus:bg-[#656D4A]/10 w-full text-[#656D4A]"
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              address: { ...prev.address, line2: e.target.value },
                            }))
                          }
                          value={userData.address.line2}
                          type="text"
                          placeholder="Line 2"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-600 leading-relaxed">
                        {userData.address.line1}
                        <br />
                        {userData.address.line2}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 font-medium tracking-wide border-b border-[#656D4A] pb-1 mb-2 uppercase text-xs">Basic Information</p>
                  <div className="grid grid-cols-[1fr_3fr] gap-y-2 gap-x-4 text-xs md:text-sm">
                    <p className="font-medium text-gray-600">Gender:</p>
                    {isEdit ? (
                      <select
                        className="bg-transparent border border-[#656D4A] rounded px-2 py-1 focus:outline-none focus:bg-[#656D4A]/10 text-[#656D4A]"
                        onChange={(e) =>
                          setUserData((prev) => ({ ...prev, gender: e.target.value }))
                        }
                        value={userData.gender}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    ) : (
                      <p className="text-[#656D4A]">{userData.gender}</p>
                    )}
                    <p className="font-medium text-gray-600">Birthday:</p>
                    {isEdit ? (
                      <input
                        className="bg-transparent border border-[#656D4A] rounded px-2 py-1 focus:outline-none focus:bg-[#656D4A]/10 text-[#656D4A]"
                        type="date"
                        onChange={(e) =>
                          setUserData((prev) => ({ ...prev, dob: e.target.value }))
                        }
                        value={userData.dob}
                      />
                    ) : (
                      <p className="text-[#656D4A]">{userData.dob}</p>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 font-medium tracking-wide border-b border-[#656D4A] pb-1 mb-2 uppercase text-xs">Dosha Information</p>
                  <div className="grid grid-cols-[1fr_3fr] gap-y-2 gap-x-4 text-xs md:text-sm">
                    <p className="font-medium text-gray-600">Vata:</p>
                    <p className="text-[#656D4A]">{userData.vata || "0"}</p>

                    <p className="font-medium text-gray-600">Pitta:</p>
                    <p className="text-[#656D4A]">{userData.pitta || "0"}</p>

                    <p className="font-medium text-gray-600">Kapha:</p>
                    <p className="text-[#656D4A]">{userData.kapha || "0"}</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-center">
                {isEdit ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#656D4A] text-white px-8 py-2.5 rounded-full shadow-md hover:bg-[#545b3e] transition-all w-full sm:w-auto font-medium"
                    onClick={updateUserProfileData}
                  >
                    Save Information
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-[#656D4A] text-[#656D4A] px-8 py-2.5 rounded-full hover:bg-[#656D4A] hover:text-white transition-all w-full sm:w-auto font-medium"
                    onClick={() => setIsEdit(true)}
                  >
                    Edit Profile
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Form Side (Right) - Now beside Profile */}
          <div className="w-full lg:w-2/3 h-full">
            <div className="bg-[#f2e6d8] rounded-2xl shadow-xl p-6 md:p-8 border border-[#d4dec1] h-full" id="medical-record-form">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl md:text-2xl font-semibold underline text-[#4b5a3a]">
                  {editRecordId ? "Edit Medical Record" : "Add New Medical Record"}
                </h2>
                {editRecordId && (
                  <button onClick={cancelEdit} className="text-sm text-gray-500 hover:text-gray-700 underline">
                    Cancel Edit
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {/* LEFT FORM COLUMN */}
                  <div className="space-y-4">
                    <Input label="Condition" name="condition" value={formData.condition} onChange={handleChange} required placeholder="Asthama, Diabetes, etc." />
                    <Input label="Description of Issue" name="description" value={formData.description} onChange={handleChange} required placeholder="Asthama from 2 years" />
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Symptoms (comma separated) <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="symptoms"
                        value={formData.symptoms}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-transparent border border-[#656D4A] rounded px-3 py-2 focus:outline-none focus:bg-[#656D4A]/10 text-[#656D4A] placeholder-gray-400 placeholder:text-sm transition-colors"
                        placeholder="Pain, stiffness, anxiety, fatigue"
                        required
                      />
                    </div>

                    <Input label="Doctor/Therapist" name="doctor" value={formData.doctor} onChange={handleChange} required placeholder="Dr. John Doe" />
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Reports {!editRecordId && <span className="text-red-500">*</span>}
                      </label>
                      <div
                        onClick={() => document.getElementById("reports-input").click()}
                        className={`w-full bg-transparent border border-[#656D4A] rounded px-3 py-2 text-sm cursor-pointer transition-colors ${formData.reports ? "text-[#656D4A]" : "text-gray-400"
                          } hover:bg-[#656D4A]/5`}
                      >
                        {formData.reports ? (formData.reports.name || "Update Report") : "Upload Reports"}
                      </div>
                      <input
                        type="file"
                        id="reports-input"
                        name="reports"
                        onChange={handleChange}
                        required={!editRecordId}
                        hidden
                      />
                    </div>
                  </div>

                  {/* RIGHT FORM COLUMN */}
                  <div className="space-y-4">
                    <Input
                      type="text"
                      label="Date of Record"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      placeholder="DD-MM-YYYY"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => !e.target.value && (e.target.type = "text")}
                    />
                    <Input label="Diagnosis/Current Medications/Allergies" name="notesRight" value={formData.notesRight} onChange={handleChange} />

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Additional Information
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="number"
                          min="0"
                          max="10"
                          name="painScale"
                          placeholder="Pain Scale (0-10)"
                          value={formData.painScale}
                          onChange={handleChange}
                          className="w-1/2 bg-transparent border border-[#656D4A] rounded px-3 py-2 focus:outline-none focus:bg-[#656D4A]/10 text-[#656D4A] placeholder-gray-400 placeholder:text-sm transition-colors"
                        />

                        <input
                          type="text"
                          name="painDuration"
                          placeholder="Pain Duration (in days)"
                          value={formData.painDuration}
                          onChange={handleChange}
                          className="w-1/2 bg-transparent border border-[#656D4A] rounded px-3 py-2 focus:outline-none focus:bg-[#656D4A]/10 text-[#656D4A] placeholder-gray-400 placeholder:text-sm transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end mt-8">
                  <button
                    type="submit"
                    className="bg-[#4b5a3a] hover:bg-[#3e4b30] text-white px-8 py-2.5 rounded-full shadow transition-all font-medium"
                  >
                    {editRecordId ? "Update Record" : "Submit Record"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>


        {/* ROW 2: Medical History Horizontal List */}
        <div className="w-full">
          <h3 className="text-xl font-semibold mb-6 border-b border-[#656D4A] pb-2 text-[#656D4A]">
            Medical History
          </h3>

          {(userData.medicalHistory || []).length > 0 ? (
            <div className="flex overflow-x-auto gap-4 md:gap-6 pb-6 custom-scrollbar scroll-smooth snap-x text-left">
              {(userData.medicalHistory || []).map((item, index) => (
                <div
                  key={index}
                  className="snap-center md:snap-start min-w-[85vw] sm:min-w-[300px] md:min-w-[350px] bg-white/40 border-2 border-[#656D4A]/30 rounded-xl p-5 hover:bg-[#656D4A]/10 transition-colors cursor-pointer group flex flex-col justify-between shadow-md"
                  onClick={() => openRecord(item)}
                >
                  <div className="mb-3">
                    <div className="flex justify-start items-center gap-2 mb-2">
                      <span className="text-xs font-bold bg-[#656D4A] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">{item.date ? item.date.split('T')[0] : "No Date"}</span>
                    </div>
                    <h4 className="font-bold text-lg text-[#4b5a3a] truncate">{item.condition || "Unnamed Condition"}</h4>
                    <p className="text-sm text-gray-600 mt-1 truncate">Doctor/Therapist: {item.doctor}</p>
                  </div>

                  <div className="flex justify-end gap-2 mt-2 opacity-60 group-hover:opacity-100 transition-opacity border-t border-[#656D4A]/20 pt-3">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleEditRecord(item); }}
                      className="flex items-center gap-1 text-[#656D4A] hover:bg-[#656D4A] hover:text-white px-3 py-1.5 rounded-md transition-colors text-sm"
                    >
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteRecord(item._id); }}
                      className="flex items-center gap-1 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-md transition-colors text-sm"
                    >
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-[#656D4A]/5 rounded-xl border border-dashed border-[#656D4A]">
              <p className="text-[#656D4A]/80 italic text-lg">
                No medical history found. Add a record above.
              </p>
            </div>
          )}
        </div>

        {/* ROW 3: Record Details View */}
        {userData.medicalHistory && userData.medicalHistory.length > 0 && selectedRecord && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border-2 border-[#656D4A]"
            id="record-details-view"
          >
            <div className="flex justify-between items-center mb-6 border-b border-[#656D4A]/20 pb-4">
              <h3 className="text-lg md:text-2xl font-semibold text-[#4b5a3a]">
                Record Details
              </h3>
              <button
                onClick={closeRecordView}
                className="text-[#656D4A] hover:bg-[#656D4A]/10 p-2 rounded-full transition-colors flex items-center gap-2"
                title="Close Details"
              >
                <span className="text-sm font-medium uppercase tracking-wider hidden md:inline">Close</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Row 1 */}
              <div className="border border-[#656D4A] rounded-lg p-4 bg-white/40">
                <p className="font-semibold text-gray-700 text-sm mb-1 uppercase tracking-wider">Condition</p>
                <p className="text-[#656D4A] font-medium text-lg truncate" title={selectedRecord.condition}>
                  {selectedRecord.condition || "---"}
                </p>
              </div>

              <div className="border border-[#656D4A] rounded-lg p-4 bg-white/40">
                <p className="font-semibold text-gray-700 text-sm mb-1 uppercase tracking-wider">Date</p>
                <p className="text-[#656D4A] font-medium">
                  {selectedRecord.date ? selectedRecord.date.split('T')[0] : "---"}
                </p>
              </div>

              <div className="border border-[#656D4A] rounded-lg p-4 bg-white/40">
                <p className="font-semibold text-gray-700 text-sm mb-1 uppercase tracking-wider">Doctor</p>
                <p className="text-[#656D4A] font-medium truncate" title={selectedRecord.doctor}>
                  {selectedRecord.doctor || "---"}
                </p>
              </div>

              {/* Row 2 */}
              <div className="border border-[#656D4A] rounded-lg p-4 bg-white/40">
                <p className="font-semibold text-gray-700 text-sm mb-1 uppercase tracking-wider">Pain Scale</p>
                <p className="text-[#656D4A] font-medium">
                  {selectedRecord.painScale ? `${selectedRecord.painScale}/10` : "---"}
                </p>
              </div>

              <div className="border border-[#656D4A] rounded-lg p-4 bg-white/40">
                <p className="font-semibold text-gray-700 text-sm mb-1 uppercase tracking-wider">Pain Duration</p>
                <p className="text-[#656D4A] font-medium">
                  {selectedRecord.painDuration || "---"}
                </p>
              </div>

              <div className="border border-[#656D4A] rounded-lg p-4 bg-white/40">
                <p className="font-semibold text-gray-700 text-sm mb-1 uppercase tracking-wider">Diagnosis/Notes</p>
                <p className="text-[#656D4A] font-medium truncate" title={selectedRecord.notes}>
                  {selectedRecord.notes || "---"}
                </p>
              </div>

              {/* Rows for Long Text - Spanning columns for readability while keeping box style */}
              <div className="border border-[#656D4A] rounded-lg p-4 bg-white/40 md:col-span-2 lg:col-span-1">
                <p className="font-semibold text-gray-700 text-sm mb-1 uppercase tracking-wider">Symptoms</p>
                <p className="text-[#656D4A] text-sm leading-relaxed max-h-24 overflow-y-auto custom-scrollbar">
                  {selectedRecord.symptoms
                    ? (Array.isArray(selectedRecord.symptoms) ? selectedRecord.symptoms.join(", ") : selectedRecord.symptoms)
                    : "---"
                  }
                </p>
              </div>

              <div className="border border-[#656D4A] rounded-lg p-4 bg-white/40 md:col-span-full lg:col-span-2">
                <p className="font-semibold text-gray-700 text-sm mb-1 uppercase tracking-wider">Description</p>
                <p className="text-[#656D4A] text-sm leading-relaxed max-h-24 overflow-y-auto custom-scrollbar">
                  {selectedRecord.description || "---"}
                </p>
              </div>

              {/* Row 4 - File/Reports - Large Div */}
              <div className="col-span-full border-2 border-dashed border-[#656D4A]/50 rounded-xl p-6 bg-white/20 flex flex-col items-center justify-center min-h-[300px] gap-4 hover:bg-white/40 transition-colors cursor-default relative overflow-hidden">
                <p className="font-semibold text-gray-700 text-sm uppercase tracking-wider mb-2 z-10 bg-white/80 px-2 py-1 rounded">Project/Report File</p>

                {selectedRecord.reports ? (
                  (() => {
                    let fileUrl = "";
                    if (Array.isArray(selectedRecord.reports)) {
                      fileUrl = selectedRecord.reports[0] || "";
                    } else if (typeof selectedRecord.reports === 'string') {
                      fileUrl = selectedRecord.reports;
                    }

                    if (!fileUrl) return <span className="text-gray-500 italic">No valid file found.</span>;

                    return (
                      <div className="flex flex-col items-center gap-3 text-[#656D4A] bg-[#656D4A]/10 px-6 py-4 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        <span className="font-medium text-lg">Attached Report</span>
                        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="mt-2 bg-[#656D4A] text-white px-4 py-2 rounded-full text-sm hover:bg-[#545b3e] transition-colors">
                          Download / View File
                        </a>
                      </div>
                    );
                  })()
                ) : (
                  <div className="text-gray-400 flex flex-col items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 opacity-50">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    <span className="text-lg font-medium">No file attached</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    )
  );
};

const Input = ({
  label,
  type = "text",
  name,
  value = "",
  onChange,
  required = false,
  placeholder = "",
  min,
  max,
  ...props
}) => {

  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={type}
        name={name}
        {...({ value })}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full bg-transparent border border-[#656D4A] rounded px-3 py-2 focus:outline-none focus:bg-[#656D4A]/10 text-[#656D4A] placeholder-gray-400 placeholder:text-sm transition-colors"
        {...props}
      />
    </div>
  );
};




export default MyProfile;
