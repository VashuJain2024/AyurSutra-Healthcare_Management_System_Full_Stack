import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PatientAppointment = () => {
    const { id } = useParams();
    const { currentPatient, getPatientData, getAppointmentById } = useContext(DoctorContext);
    const { calculateAge } = useContext(AppContext);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const openRecord = (record) => {
        setSelectedRecord(record);
    };

    const closeRecordView = () => {
        setSelectedRecord(null);
    };

    const handleEditRecord = (record) => {
        // console.log("Edit record:", record);
        // Implement edit logic here
    };

    const handleDeleteRecord = (recordId) => {
        // console.log("Delete record:", recordId);
        // Implement delete logic here
    };

    useEffect(() => {
        const fetchPatient = async () => {
            if (id) {
                const userId = await getAppointmentById(id);
                if (userId) {
                    getPatientData(userId);
                }
            }
        };
        fetchPatient();
    }, [id, getAppointmentById, getPatientData]);

    return (
        <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 sm:p-6">

            {/* ROW 1: Patient Details Header */}
            {currentPatient && (
                <div className="flex flex-col md:flex-row gap-6 bg-white border border-[#656D4A]/20 rounded-2xl p-6 shadow-sm">
                    <div className="flex-shrink-0">
                        <img
                            src={currentPatient.image || assets.upload_area}
                            alt=""
                            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-[#EDE0D4]"
                        />
                    </div>
                    <div className="flex-grow flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#454d35]">
                                {currentPatient.name}
                            </h2>
                            <span className="px-3 py-1 bg-[#656D4A]/10 text-[#656D4A] text-xs font-semibold rounded-full uppercase tracking-wider">
                                {currentPatient.gender}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-[#4b5a3a]/80 text-sm md:text-base">
                            <p className="flex items-center gap-2">
                                <span className="font-semibold text-[#4b5a3a]">Age:</span>
                                {calculateAge(currentPatient.dob)} Years
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-semibold text-[#4b5a3a]">Phone:</span>
                                {currentPatient.phone}
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-semibold text-[#4b5a3a]">Email:</span>
                                <span className='truncate max-w-[200px]'>{currentPatient.email}</span>
                            </p>
                            <p className="flex items-center gap-2 col-span-1 sm:col-span-2">
                                <span className="font-semibold text-[#4b5a3a]">Address:</span>
                                {currentPatient.address && typeof currentPatient.address === 'object'
                                    ? `${currentPatient.address.line1}, ${currentPatient.address.line2}`
                                    : "Not Provided"}
                            </p>
                            <p className="flex items-center gap-2 mt-2 col-span-1 sm:col-span-2">
                                <span className="font-semibold text-[#4b5a3a] bg-[#EDE0D4] px-2 py-0.5 rounded">Dosha:</span>
                                <span>
                                    Vata: {currentPatient.vata || 0} |
                                    Pitta: {currentPatient.pitta || 0} |
                                    Kapha: {currentPatient.kapha || 0}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* ROW 2: Medical History Horizontal List */}
            <div className="w-full">
                <div className="flex justify-between items-end mb-4 border-b border-[#656D4A] pb-2">
                    <h3 className="text-xl font-semibold text-[#656D4A]">
                        Medical History
                    </h3>
                    <span className="text-xs text-[#656D4A]/60 font-medium">
                        {currentPatient && currentPatient.medicalHistory ? currentPatient.medicalHistory.length : 0} Records Found
                    </span>
                </div>

                {(currentPatient && currentPatient.medicalHistory && currentPatient.medicalHistory.length > 0) ? (
                    <div className="flex overflow-x-auto gap-4 pb-6 custom-scrollbar scroll-smooth snap-x text-left">
                        {currentPatient.medicalHistory.map((item, index) => (
                            <div
                                key={index}
                                className={`snap-center flex-shrink-0 w-[280px] md:w-[320px] bg-white border border-[#656D4A]/20 rounded-xl p-5 hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col justify-between h-[200px] ${selectedRecord === item ? 'ring-2 ring-[#656D4A] bg-[#656D4A]/5' : ''}`}
                                onClick={() => openRecord(item)}
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-xs font-bold bg-[#656D4A] text-white px-2.5 py-1 rounded-md uppercase tracking-wide">
                                            {item.date ? item.date.split('T')[0] : "No Date"}
                                        </span>
                                        {item.reports && item.reports.length > 0 && (
                                            <div className="text-[#656D4A]" title="Has Attachment">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                    <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 0 0-3.182 0l-10.94 10.94a3.75 3.75 0 1 0 5.304 5.303l7.693-7.693a.75.75 0 0 1 1.06 1.06l-7.693 7.693a5.25 5.25 0 1 1-7.424-7.424l10.939-10.94a3.75 3.75 0 1 1 5.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 0 1 5.91 15.66l7.81-7.81a.75.75 0 0 1 1.061 1.06l-7.81 7.81a.75.75 0 0 0 1.054 1.068L18.97 6.84a2.25 2.25 0 0 0 0-3.182Z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <h4 className="font-bold text-lg text-[#2a3321] truncate mb-1" title={item.condition}>
                                        {item.condition || "Unnamed Condition"}
                                    </h4>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                                        Dr. {item.doctor}
                                    </p>
                                </div>

                                <div className="border-t border-[#656D4A]/10 pt-3 mt-auto flex justify-between items-center opacity-70 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs font-medium text-[#656D4A]">View Details</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#656D4A]">
                                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 bg-[#656D4A]/5 rounded-xl border-2 border-dashed border-[#656D4A]/20">
                        <p className="text-[#656D4A] font-medium text-lg">
                            No medical history records found.
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            Patient has no past records recorded.
                        </p>
                    </div>
                )}
            </div>


            {/* ROW 3: Record Details View */}
            {currentPatient && currentPatient.medicalHistory && currentPatient.medicalHistory.length > 0 && selectedRecord && (
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
}

export default PatientAppointment
