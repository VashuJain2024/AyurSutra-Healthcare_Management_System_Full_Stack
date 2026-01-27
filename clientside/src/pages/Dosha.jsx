import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import questions from "../assets/data/questions.js";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { toast } from "react-toastify";

const Dosha = () => {
    const { backendUrl, token, loadUserProfileData } = useContext(AppContext);
    const [answers, setAnswers] = useState({});
    const [scores, setScores] = useState({
        Vata: 0,
        Pitta: 0,
        Kapha: 0,
    });

    const handleChange = (key, option) => {
        setAnswers((prevAnswers) => {
            const previousOption = prevAnswers[key];
            // Update scores safely
            setScores((prevScores) => {
                const newScores = { ...prevScores };
                // Remove previous dosha score (if exists)
                if (previousOption?.dosha) {
                    newScores[previousOption.dosha] -= 1;
                }
                // Add new dosha score (if exists)
                if (option.dosha) {
                    newScores[option.dosha] += 1;
                }
                return newScores;
            });
            // Save new answer
            return {
                ...prevAnswers,
                [key]: option,
            };
        });
    };

    const updateDosha = async () => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/user/update-dosha",
                { dosha: scores },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (data.success) {
                toast.success(data.message);
                await loadUserProfileData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 text-gray-700 font-outfit">

            {/* Banner */}
            <div className="bg-[#656D4A] rounded-xl relative overflow-hidden text-center mb-8 shadow-md text-white min-h-[250px] flex flex-col justify-center">
                {/* Background Image */}
                <img
                    src={assets.doshaBanner}
                    alt="Dosha Banner"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* Dark Overlay for Readability */}
                <div className="absolute inset-0 bg-black/40 z-0"></div>

                {/* Content */}
                <div className="relative z-10 p-8 md:p-12 flex flex-col items-center">
                    <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl inline-block shadow-lg m-4 border border-white/10">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-wide drop-shadow-md">
                            Discover Your Dosha
                        </h1>
                        <p className="text-base md:text-lg font-light opacity-95 max-w-xl mx-auto drop-shadow-sm">
                            Ayurveda explains health through three doshas—Vata, Pitta, and Kapha.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">

                {/* Left Column: Sticky Scores */}
                <div className="w-full md:w-1/4 md:sticky md:top-24 z-10">
                    <div className="bg-[#656D4A]/5 border border-[#656D4A]/20 rounded-xl p-6 shadow-sm">
                        <h2 className="text-xl font-bold mb-4 text-[#656D4A] flex items-center gap-2 border-b border-[#656D4A]/10 pb-2">
                            Your Scores
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                <span className="flex items-center gap-2 font-medium">
                                    <span className="text-xl">🌬️</span> Vata
                                </span>
                                <span className="text-2xl font-bold text-[#656D4A]">{scores.Vata}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                <span className="flex items-center gap-2 font-medium">
                                    <span className="text-xl">🔥</span> Pitta
                                </span>
                                <span className="text-2xl font-bold text-[#656D4A]">{scores.Pitta}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                                <span className="flex items-center gap-2 font-medium">
                                    <span className="text-xl">🌱</span> Kapha
                                </span>
                                <span className="text-2xl font-bold text-[#656D4A]">{scores.Kapha}</span>
                            </div>
                        </div>

                        <div className="mt-6 text-sm text-gray-500 italic">
                            Keep answering to see your dominant Dosha emerge!
                        </div>
                        <button onClick={() => updateDosha()} className="bg-[#656D4A] text-white px-6 py-2 rounded-lg mt-6 hover:bg-[#656D4A]/80 transition-colors duration-200">
                            Update Dosha
                        </button>
                    </div>
                </div>

                {/* Right Column: Quiz */}
                <div className="w-full md:w-3/4">
                    <form className="space-y-6">
                        {questions.map((q, index) => (
                            <div
                                key={q.id}
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-shadow duration-300 hover:shadow-md"
                            >
                                <h3 className="text-lg md:text-xl font-semibold mb-4 text-[#656D4A]">
                                    <span className="mr-2 opacity-50">{index + 1}.</span> {q.question}
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {q.options.map((opt) => {
                                        const isSelected = answers[q.key]?.label === opt.label;

                                        return (
                                            <label
                                                key={opt.label}
                                                className={`relative cursor-pointer p-3 rounded-lg border transition-all duration-200 flex items-center justify-center text-center text-sm
                                                    ${isSelected
                                                        ? "border-[#656D4A] bg-[#656D4A]/10 text-[#656D4A] font-semibold shadow-inner"
                                                        : "border-gray-200 hover:border-[#656D4A]/50 hover:bg-gray-50"
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name={q.key}
                                                    className="absolute opacity-0 w-full h-full cursor-pointer"
                                                    onChange={() => handleChange(q.key, opt)}
                                                />
                                                {opt.label}
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </form>

                    <div className="mt-8 text-center md:text-left">
                        <p className="text-gray-500 mb-4">
                            Completed all questions? Check your highest score on the left!
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dosha;
