import { useState, useEffect } from "react";
import NoraLogo from "../components/IMG/noralogo.png";
import { Link, useSearchParams } from "react-router-dom";

const BNLogo = () => (
  <svg width="38" height="38" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="23" stroke="#C026D3" strokeWidth="1.5" fill="white" />
    <circle cx="24" cy="24" r="19" stroke="#C026D3" strokeWidth="0.8" fill="none" strokeDasharray="3 3" />
    <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontFamily="Georgia, serif" fontSize="15" fontWeight="700" fill="#C026D3" letterSpacing="1">
      BN
    </text>
  </svg>
);

function generateConfetti() {
  const colors = ["#C026D3", "#7c3aed", "#5b21b6", "#a855f7", "#e879f9", "#f0abfc"];
  return Array.from({ length: 28 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    left: `${Math.random() * 100}%`,
    size: Math.random() * 8 + 5,
    delay: Math.random() * 0.8,
    duration: Math.random() * 1.4 + 1.2,
    shape: i % 3 === 0 ? "circle" : "square",
  }));
}

export default function () {
  const [checkAnimate, setCheckAnimate] = useState(false);
  const [confettiVisible, setConfettiVisible] = useState(false);
  const [confetti] = useState(generateConfetti);

  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    const t1 = setTimeout(() => setCheckAnimate(true), 200);
    const t2 = setTimeout(() => setConfettiVisible(true), 100);

    // Trigger Email & Status Update
    if (orderId) {
      import("../lib/supabaseClient").then(({ supabase }) => {
        supabase.functions.invoke('resend-order-alert', {
          body: { order_id: orderId }
        }).then(({ error }) => {
          if (error) console.error("Failed to process order alert:", error);
        });
      });
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [orderId]);

  return (
    <div style={styles.page}>
      {confettiVisible &&
        confetti.map((c) => (
          <div
            key={c.id}
            style={{
              position: "fixed",
              top: "-12px",
              left: c.left,
              width: c.size,
              height: c.size,
              borderRadius: c.shape === "circle" ? "50%" : "2px",
              backgroundColor: c.color,
              opacity: 0,
              animation: `fall ${c.duration}s linear ${c.delay}s forwards`,
              pointerEvents: "none",
            }}
          />
        ))}

      <div style={styles.card}>
        <div style={styles.logoWrapper}>
          <Link to={"/"} className="flex items-center gap-2">
            {" "}
            <img src={NoraLogo} className="w-10 h-10" alt="" />
          </Link>
        </div>

        <div style={styles.iconWrapper}>
          <div style={styles.pulseRing} />
          <svg width="72" height="72" viewBox="0 0 72 72" fill="none" style={{ animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.15s both" }}>
            <circle cx="36" cy="36" r="36" fill="#5b21b6" />
            <polyline
              points="22,36 31,46 50,26"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 50,
                strokeDashoffset: checkAnimate ? 0 : 50,
                transition: "stroke-dashoffset 0.55s cubic-bezier(0.4,0,0.2,1) 0.4s",
              }}
            />
          </svg>
        </div>

        <h1 style={styles.title}>Transfer Successful</h1>
        <p style={styles.subtitle}>Your payment has been sent.</p>

        <Link to={"/"}>
          {" "}
          <button style={styles.btn}>Done</button>
        </Link>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button:focus { outline: none; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fall {
          0%   { opacity: 1; transform: translateY(0) rotate(0deg); }
          100% { opacity: 0; transform: translateY(100vh) rotate(600deg); }
        }
        @keyframes pulse {
          0%   { transform: scale(1);   opacity: 0.4; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes popIn {
          0%   { transform: scale(0.4); opacity: 0; }
          70%  { transform: scale(1.1); }
          100% { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f5f7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Sans', sans-serif",
    overflow: "hidden",
    position: "relative",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 8px 48px rgba(91,33,182,0.10), 0 2px 12px rgba(0,0,0,0.06)",
    padding: "44px 44px 40px",
    width: "100%",
    maxWidth: "380px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    animation: "fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both",
    position: "relative",
    zIndex: 10,
  },
  logoWrapper: {
    marginBottom: "32px",
    alignSelf: "flex-start",
  },
  iconWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "28px",
  },
  pulseRing: {
    position: "absolute",
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    border: "2.5px solid #7c3aed",
    animation: "pulse 1.6s ease-out 0.6s infinite",
    pointerEvents: "none",
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#111111",
    textAlign: "center",
    letterSpacing: "-0.4px",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#999",
    textAlign: "center",
    marginBottom: "36px",
  },
  btn: {
    width: "100%",
    padding: "13px",
    backgroundColor: "#5b21b6",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    letterSpacing: "0.1px",
  },
};
