import React, { useState } from "react";
import'./Login.css';
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Validate user here

        // Navigate to board after login
        navigate('/board');
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-title">Login to Boardium</h2>
                <p className="login-subtitle">
                    Organize your projects and collaborate effortlessly
                </p>

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

            <div className="social-login">
                <button className="social-btn google">Sign in with Google</button>
            </div>

            <a href="/forgot-password" className="forgot-password">
                Forgot password?
            </a>

            <p className="register-link">
                Don't have an account? <a href="/register">Register here</a>
            </p>
            </div>
        </div>
    );
}

export default Login;