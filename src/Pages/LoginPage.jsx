import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NoraLogo from "../components/IMG/noralogo.png";
import { supabase } from "../lib/supabaseClient";
import { useToast } from "../context/ToastContext";

const BNLogo = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="23" stroke="#C026D3" strokeWidth="1.5" fill="white" />
    <circle cx="24" cy="24" r="19" stroke="#C026D3" strokeWidth="0.8" fill="none" strokeDasharray="3 3" />
    <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontFamily="Georgia, serif" fontSize="15" fontWeight="700" fill="#C026D3" letterSpacing="1">
      BN
    </text>
  </svg>
);

const EyeIcon = ({ show }) =>
  show ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

export default function LoginPage() {
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      addToast("Please enter your email.", "error");
      return;
    }
    if (!password) {
      addToast("Please enter your password.", "error");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      console.log("Login successful:", data);
      addToast("Login successful! Redirecting...", "success");

      // Simple admin check - ideally getting this from a profile table
      if (email === "admin@gmail.com") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("Login failed:", error.message);
      addToast(error.message || "Login failed. Please check your credentials.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoWrapper}>
          <img src={NoraLogo} className="w-10 h-10" alt="" />
        </div>

        {/* Title */}
        <h1 style={styles.title}>Sign In</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email Field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Your@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              style={{
                ...styles.input,
                ...(emailFocused ? styles.inputFocused : {}),
              }}
            />

          </div>

          {/* Password Field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                style={{
                  ...styles.input,
                  paddingRight: "42px",
                  ...(passwordFocused ? styles.inputFocused : {}),
                }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.eyeButton} aria-label={showPassword ? "Hide password" : "Show password"}>
                <EyeIcon show={showPassword} />
              </button>
            </div>
          </div>

          {/* Forgot password */}
          {/* <div style={styles.forgotWrapper}>
            <a href="#" style={styles.forgotLink}>
              Forgot password?
            </a>
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              ...styles.continueBtn,
              ...(loading ? styles.continueBtnLoading : {}),
            }}
            disabled={loading}>
            {loading ? <span style={styles.spinner} /> : "Continue"}
          </button>
        </form>

        {/* Sign Up Link */}
        {/* <p style={styles.signupText}>
          Don't have an account?{" "}
          <a href="#" style={styles.signupLink}>
            Sign Up
          </a>
        </p> */}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        input::placeholder { color: #c4c4c4; }
        input:focus { outline: none; }
        button:focus { outline: none; }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
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
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
    padding: "44px 44px 36px",
    width: "100%",
    maxWidth: "420px",
    animation: "fadeUp 0.45s ease both",
  },
  logoWrapper: {
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#111111",
    marginBottom: "28px",
    letterSpacing: "-0.3px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "16px",
  },
  label: {
    fontSize: "13.5px",
    fontWeight: "500",
    color: "#333333",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "11px 14px",
    fontSize: "14px",
    color: "#111111",
    border: "1px solid #e2e2e2",
    borderRadius: "8px",
    backgroundColor: "#fafafa",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  },
  inputFocused: {
    borderColor: "#7c3aed",
    boxShadow: "0 0 0 3px rgba(124,58,237,0.1)",
    backgroundColor: "#ffffff",
  },
  inputError: {
    borderColor: "#ef4444",
    boxShadow: "0 0 0 3px rgba(239,68,68,0.1)",
  },
  errorText: {
    marginTop: "5px",
    fontSize: "12px",
    color: "#ef4444",
  },
  passwordWrapper: {
    position: "relative",
  },
  eyeButton: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "2px",
    display: "flex",
    alignItems: "center",
  },
  forgotWrapper: {
    textAlign: "right",
    marginBottom: "22px",
    marginTop: "4px",
  },
  forgotLink: {
    fontSize: "12.5px",
    color: "#7c3aed",
    textDecoration: "none",
  },
  continueBtn: {
    width: "100%",
    padding: "13px",
    backgroundColor: "#5b21b6",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    letterSpacing: "0.2px",
    transition: "background-color 0.2s ease, transform 0.1s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "46px",
  },
  continueBtnLoading: {
    backgroundColor: "#7c3aed",
    cursor: "not-allowed",
  },
  spinner: {
    width: "18px",
    height: "18px",
    border: "2.5px solid rgba(255,255,255,0.3)",
    borderTopColor: "#ffffff",
    borderRadius: "50%",
    display: "inline-block",
    animation: "spin 0.7s linear infinite",
  },
  signupText: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "13px",
    color: "#888888",
  },
  signupLink: {
    color: "#7c3aed",
    fontWeight: "600",
    textDecoration: "none",
  },
};
