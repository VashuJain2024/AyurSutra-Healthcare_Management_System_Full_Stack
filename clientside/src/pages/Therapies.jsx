import React from "react";
import therapies from "../assets/data/therapies";

const TherapyCard = ({ img, title, desc, onClick }) => (
    <div className="border border-[#414833] rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
        <img src={img} alt={title} className="w-full h-48 object-cover" />
        <div className="flex flex-col gap-2 justify-stretch text-[#414833] text-sm">
            <b className="text-center text-xl">{title}</b>
            <p className="text-xs opacity-80 text-center">{desc}</p>
            <button
                onClick={onClick}
                className="bg-[#414833] text-white text-xs py-2 rounded-b-lg hover:bg-white hover:text-[#414833] transition"
            >
                MORE INFO
            </button>
        </div>
    </div>
);

const Therapies = () => {
    const [selectedTherapy, setSelectedTherapy] = React.useState(null);

    const openModal = (item) => setSelectedTherapy(item);
    const closeModal = () => setSelectedTherapy(null);

    return (
        <div className="text-[#414833] px-4 sm:px-10 lg:px-20 py-10 space-y-16">

            {/* Modal */}
            <Modal data={selectedTherapy} onClose={closeModal} />

            {/* ---------------- Purvakarma ---------------- */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-lg md:text-xl">Purvakarma (Preparatory Therapies)</h2>
                    <p className="text-sm opacity-70 hidden sm:block">Prepares the body for detox</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                    {therapies.purvakarma.map((item, i) => (
                        <TherapyCard key={i} {...item} onClick={() => openModal(item)} />
                    ))}
                </div>
            </div>


            {/* ---------------- Pradhana Karma ---------------- */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-lg md:text-xl">Pradhana Karma</h2>
                    <p className="text-sm opacity-70 hidden sm:block">Main Panchakarma Therapies – 5 Karmas</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {therapies.pradhana.map((item, i) => (
                        <TherapyCard key={i} {...item} onClick={() => openModal(item)} />
                    ))}
                </div>
            </div>


            {/* ---------------- Kerala Panchakarma ---------------- */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-lg md:text-xl">
                        Special Kerala Panchakarma Therapies
                    </h2>
                    <p className="text-sm opacity-70 hidden sm:block">
                        Upakarma / Associated Therapies
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {therapies.kerala.map((item, i) => (
                        <TherapyCard key={i} {...item} onClick={() => openModal(item)} />
                    ))}
                </div>
            </div>

        </div>
    );
};

const Modal = ({ data, onClose }) => {
    if (!data) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-3">
            <div className="bg-[#FAF7F0] w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden max-h-[90vh] relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-white bg-[#414833] w-9 h-9 rounded-full flex items-center justify-center text-lg hover:bg-red-600 transition-all"
                >
                    ✕
                </button>

                {/* Header Image */}
                <img
                    src={data.img}
                    alt={data.title}
                    className="w-full h-60 object-cover rounded-t-xl"
                />

                {/* Body */}
                <div className="p-6 text-[#414833] overflow-y-auto max-h-[calc(90vh-240px)] space-y-6">

                    {/* Title */}
                    <h2 className="text-center text-2xl font-bold border-b pb-2 border-[#828C51]">
                        {data.title}
                    </h2>

                    {/* Details Section */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-[17px] flex items-center gap-2">
                            <span className="text-[#5A6630]">✦</span> About Therapy
                        </h3>
                        <p className="text-[14px] leading-relaxed whitespace-pre-line">
                            {data.details}
                        </p>
                    </div>

                    {/* Do's */}
                    <div className="border border-[#C4C7A1] rounded-lg p-4 bg-white/70 shadow-sm">
                        <h3 className="font-semibold text-[17px] pb-1 border-b border-[#C4C7A1] text-[#5E7A30] flex gap-2 items-center">
                            ✔ Do’s
                        </h3>
                        <ul className="text-sm list-disc pl-5 mt-2 space-y-1">
                            {data.dos.map((e, i) => (
                                <li key={i}>{e}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Don'ts */}
                    <div className="border border-[#C4C7A1] rounded-lg p-4 bg-white/70 shadow-sm">
                        <h3 className="font-semibold text-[17px] pb-1 border-b border-[#C4C7A1] text-[#9A4A4A] flex gap-2 items-center">
                            ❌ Don'ts
                        </h3>
                        <ul className="text-sm list-disc pl-5 mt-2 space-y-1">
                            {data.donts.map((e, i) => (
                                <li key={i}>{e}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Exercises */}
                    <div className="border border-[#C4C7A1] rounded-lg p-4 bg-white/70 shadow-sm">
                        <h3 className="font-semibold text-[17px] pb-1 border-b border-[#C4C7A1] text-[#414833] flex gap-2 items-center">
                            🏃 Exercises
                        </h3>
                        <ul className="text-sm list-decimal pl-5 mt-2 space-y-1">
                            {data.exercises.map((e, i) => (
                                <li key={i}>{e}</li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
};



export default Therapies;
