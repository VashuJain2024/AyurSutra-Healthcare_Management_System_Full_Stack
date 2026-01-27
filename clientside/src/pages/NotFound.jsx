import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center text-[#414833] px-4 animate-fadeIn">

            {/* Animation GIF */}
            <img
                src={assets.NotFoundGif}
                alt="Not Found"
                className="w-50 sm:w-100 mb-6"
            />

            <h1 className="text-4xl font-extrabold mb-2">404</h1>
            <p className="text-lg font-medium mb-4">
                Oops! The page you’re looking for doesn’t exist.
            </p>

            <button
                onClick={() => navigate("/")}
                className="bg-[#414833] text-white px-8 py-3 rounded-full text-sm hover:bg-[#2e3526] transition-transform hover:scale-105"
            >
                Go Back Home
            </button>
        </div>
    );
};

export default NotFound;
