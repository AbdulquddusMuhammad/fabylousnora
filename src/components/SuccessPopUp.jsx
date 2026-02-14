import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/context";

const SuccessPopUp = () => {
  const [leaving, setLeaving] = useState(true);
  const { newLetterReg, setNewLetterReg, fromNewLetter, setFromNewLetter, fromCustomOrder, setFromCustomOrder } = useContext(AppContext);

  useEffect(() => {
    if (fromNewLetter || fromCustomOrder) {
      setLeaving(false);
      setTimeout(() => {
        setLeaving(true);
        setFromCustomOrder(false);
        setFromNewLetter(false);
      }, 3080);
    }
  }, [fromNewLetter, fromCustomOrder]);

  const handleClose = () => {
    setLeaving(true);
    // setTimeout(() => {
    //   setLeaving(false);
    // }, 380);
  };

  return (
    <div>
      <>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes slideOut {
          from { opacity: 1; transform: translateY(0)   scale(1);    }
          to   { opacity: 0; transform: translateY(16px) scale(0.96); }
        }
        @keyframes progress {
          from { width: 100%; }
          to   { width: 0%;   }
        }
        @keyframes checkPop {
          0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
          60%  { transform: scale(1.2) rotate(4deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg);   opacity: 1; }
        }

        .toast-in  { animation: slideIn  0.38s cubic-bezier(0.22,1,0.36,1) both; }
        .toast-out { animation: slideOut 0.34s cubic-bezier(0.4,0,1,1)     both; }
        .check-pop { animation: checkPop 0.45s 0.15s cubic-bezier(0.22,1,0.36,1) both; opacity: 0; }
        .progress-bar { animation: progress 5s linear forwards; }
      `}</style>

        <div
          className={`${leaving ? "toast-out -bottom-32 -right-32" : "toast-in bottom-5 right-10"}  overflow-hidden rounded-2xl flex items-start gap-3 fixed  z-100`}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            background: "#fff",
            border: "1px solid #f0d6ea",
            padding: "14px 16px 16px",
            width: 300,
            boxShadow: "0 8px 30px rgba(189,0,124,0.13), 0 2px 8px rgba(0,0,0,0.07)",
          }}>
          {/* Icon */}
          <div className="check-pop flex-shrink-0 flex items-center justify-center rounded-full" style={{ width: 36, height: 36, background: "#BD007C", marginTop: 1 }}>
            <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
              <path d="M5 10.5l3.5 3.5L15 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            {fromNewLetter ? (
              <>
                <p className="font-semibold text-sm leading-snug" style={{ color: "#1a0010" }}>
                  You're subscribed!
                </p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#9a5a7a" }}>
                  Welcome aboard — great content is on its way to your inbox.
                </p>
              </>
            ) : fromCustomOrder ? (
              <>
                <p className="font-semibold text-sm leading-snug" style={{ color: "#1a0010" }}>
                  Your Custom Order is Confirmed!
                </p>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#9a5a7a" }}>
                  Thank you for your request! We will review the details and get back to you within 24-48 hours with a personalized response.
                </p>
              </>
            ) : null}
          </div>

          {/* Close */}
          <button onClick={handleClose} className="flex-shrink-0 flex items-center justify-center rounded-full" style={{ width: 22, height: 22, background: "transparent", marginTop: 1 }} aria-label="Dismiss">
            <svg viewBox="0 0 12 12" fill="none" width="11" height="11">
              <path d="M2 2l8 8M10 2L2 10" stroke="#c090b0" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          {/* Progress bar */}
          <div className="progress-bar absolute bottom-0 left-0 h-0.5 rounded-full" style={{ background: "#BD007C" }} />
        </div>
      </>
    </div>
  );
};

export default SuccessPopUp;
