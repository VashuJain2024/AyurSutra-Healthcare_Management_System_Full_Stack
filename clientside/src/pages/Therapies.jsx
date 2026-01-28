import React, { useState } from "react";
import therapies from "../assets/data/therapies";
import { toast } from "react-toastify"

/* ---------------- Therapy Card ---------------- */
const TherapyCard = ({ img, title, desc, onClick }) => (
    <div className="border border-[#414833] rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
        <img src={img} alt={title} className="w-full h-48 object-cover" />
        <div className="flex flex-col gap-2 text-[#414833] p-3">
            <b className="text-center text-lg">{title}</b>
            <p className="text-xs opacity-80 text-center">{desc}</p>
            <button
                onClick={onClick}
                className="bg-[#414833] text-white text-xs py-2 rounded-lg hover:bg-white hover:text-[#414833] transition"
            >
                MORE INFO
            </button>
        </div>
    </div>
);

/* ---------------- Main Component ---------------- */
const Therapies = () => {
    const [selectedTherapy, setSelectedTherapy] = useState(null);
    const [recommendation, setRecommendation] = useState(null);

    const [loading, setLoading] = useState(false);

    const openModal = (item) => setSelectedTherapy(item);
    const closeModal = () => setSelectedTherapy(null);

    /* ---------------- Submit Handler ---------------- */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const payload = {
            Age: parseInt(form.get("Age"), 10),
            Gender: form.get("Gender"),
            Symptoms: form.get("Symptoms"),
            Dominant_Dosha: form.get("Dominant_Dosha"),
        };

        setLoading(true);
        try {
            const response = await fetch(
                import.meta.env.VITE_THERAPY_RECOMMENDATION_API,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            const text = await response.text();
            if (!response.ok) throw new Error(text);

            const data = JSON.parse(text);
            setRecommendation(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-[#414833] px-4 sm:px-10 lg:px-20 py-10 space-y-16">

            {/* Modal */}
            <Modal data={selectedTherapy} onClose={closeModal} />

            {/* ---------------- Search Section ---------------- */}
            <div>
                <h1 className="text-xl font-bold text-center pb-4">
                    Search therapies based on your age, gender, symptoms & dosha
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 lg:grid lg:grid-cols-2"
                >
                    <select
                        name="Gender"
                        className="border border-[#414833] rounded-lg p-2"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>


                    <select
                        name="Dominant_Dosha"
                        className="border border-[#414833] rounded-lg p-2"
                        required
                    >
                        <option value="">Select Dominant Dosha</option>
                        <option value="Vata">Vata</option>
                        <option value="Pitta">Pitta</option>
                        <option value="Kapha">Kapha</option>
                    </select>

                    <input
                        type="number"
                        name="Age"
                        placeholder="Enter your age"
                        className="border border-[#414833] rounded-lg p-2"
                        required
                    />

                    <textarea
                        name="Symptoms"
                        placeholder="Enter symptoms (comma separated)"
                        className="border border-[#414833] rounded-lg p-2"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 m-auto bg-[#414833] text-white py-2 rounded-lg hover:bg-white hover:text-[#414833] transition col-span-full"
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>
                </form>

                {/* ---------------- Recommendations ---------------- */}
                {recommendation?.Status === "Success" && (
                    <div className="mt-6 flex justify-center">
                        <div className="border border-[#414833] rounded-xl p-6 bg-[#FAF7F0] shadow-md text-center max-w-md">
                            <h2 className="text-lg font-bold mb-2 text-[#414833]">
                                Recommended Therapy :-
                            </h2>
                            <p className="text-xl font-semibold text-[#5A6630]">
                                {recommendation.Recommended_Therapy}
                            </p>
                        </div>
                    </div>
                )}

            </div>

            {/* ---------------- Purvakarma ---------------- */}
            <Section
                title="Purvakarma (Preparatory Therapies)"
                subtitle="Prepares the body for detox"
                list={therapies.purvakarma}
                openModal={openModal}
            />

            {/* ---------------- Pradhana Karma ---------------- */}
            <Section
                title="Pradhana Karma"
                subtitle="Main Panchakarma Therapies"
                list={therapies.pradhana}
                openModal={openModal}
            />

            {/* ---------------- Kerala Therapies ---------------- */}
            <Section
                title="Special Kerala Panchakarma Therapies"
                subtitle="Upakarma / Associated Therapies"
                list={therapies.kerala}
                openModal={openModal}
            />
        </div>
    );
};

/* ---------------- Section Component ---------------- */
const Section = ({ title, subtitle, list, openModal }) => (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg md:text-xl">{title}</h2>
            <p className="text-sm opacity-70 hidden sm:block">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {list.map((item, i) => (
                <TherapyCard key={i} {...item} onClick={() => openModal(item)} />
            ))}
        </div>
    </div>
);

/* ---------------- Modal ---------------- */
const Modal = ({ data, onClose }) => {
    if (!data) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
            <div className="bg-[#FAF7F0] w-full max-w-2xl rounded-xl shadow-2xl relative max-h-[90vh] overflow-hidden">

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 bg-[#414833] text-white w-9 h-9 rounded-full hover:bg-red-600"
                >
                    ✕
                </button>

                <img src={data.img} alt={data.title} className="w-full h-60 object-cover" />

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-240px)] space-y-6">
                    <h2 className="text-center text-2xl font-bold border-b pb-2">
                        {data.title}
                    </h2>

                    <p className="text-sm whitespace-pre-line">{data.details}</p>

                    <div>
                        <h3 className="font-semibold">✔ Do’s</h3>
                        <ul className="list-disc pl-5 text-sm">
                            {data.dos.map((e, i) => <li key={i}>{e}</li>)}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold">❌ Don’ts</h3>
                        <ul className="list-disc pl-5 text-sm">
                            {data.donts.map((e, i) => <li key={i}>{e}</li>)}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold">🏃 Exercises</h3>
                        <ul className="list-decimal pl-5 text-sm">
                            {data.exercises.map((e, i) => <li key={i}>{e}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Therapies;
