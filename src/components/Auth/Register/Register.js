import React, { useState } from "react";
import "./Register.css";
import { register } from "../../../services/authServices";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const data = await register(name, email, password);
            setSuccess(data.message || "Registration successful! Please login.");

            // Redirect to login after success
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setError(err.message);
        }
        // TODO: Add regis logic here
    };

return (
    <div className="register-page">
        <div className="register-card">
            <h2 className="register-title">Create your Boardium account</h2>
            
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <form onSubmit={handleRegister} className="register-form">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="register-input"
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="register-input"
                />
                <input
                    type="password"
                    placeholder="Create Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="register-input"
                />
                <button type="submit" className="register-btn">
                    Sign Up
                </button>
            </form>

            <p className="login-link">
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    </div>
);
};

export default Register;