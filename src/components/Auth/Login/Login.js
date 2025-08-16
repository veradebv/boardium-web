import React, { useState } from "react";
import'./Login.css';
import { login } from "../../../services/authServices";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await login(email,password);

            // Save token to localStorage for future requests
            localStorage.setItem("token", data.token);
            
            // Redirect to board page
            navigate('/board');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-title">Login to Boardium</h2>
                <p className="login-subtitle">
                    Organize your projects and collaborate effortlessly
                </p>

                {error && <p className="error">{error}</p>}

                <form onSubmit={handleSubmit} className="login-form">
                    <input 
                    type="email" 
                    placeholder="Email or Username" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                    className="login-input"
                    />
                    <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                    className="login-input"
                    />
                <button type="submit" className="login-btn">
                    Log In
                </button>
            </form>

            <a href="/forgot-password" className="forgot-password">
                Forgot password?
            </a>

            <p className="register-link">
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
            </div>
        </div>
    );
}

export default Login;