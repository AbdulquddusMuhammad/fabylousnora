import React, { useEffect, useState } from "react";

const Toast = ({ id, message, type, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation
        requestAnimationFrame(() => setIsVisible(true));
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for exit animation
    };

    const icons = {
        success: (
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
        ),
        error: (
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        ),
        info: (
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    };

    const bgBorderColors = {
        success: "bg-white border-l-4 border-green-500 shadow-lg",
        error: "bg-white border-l-4 border-red-500 shadow-lg",
        info: "bg-white border-l-4 border-blue-500 shadow-lg",
    };

    return (
        <div
            className={`pointer-events-auto flex items-center w-full max-w-xs p-4 rounded-lg transform transition-all duration-300 ease-in-out ${bgBorderColors[type] || bgBorderColors.info
                } ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
            role="alert"
        >
            <div className="flex-shrink-0">{icons[type] || icons.info}</div>
            <div className="ml-3 text-sm font-medium text-gray-700 font-nunito">{message}</div>
            <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
                aria-label="Close"
                onClick={handleClose}
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Toast;
