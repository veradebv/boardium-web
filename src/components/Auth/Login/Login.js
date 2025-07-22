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
        <div className="auth-container">
            <h2>Login to Boardium</h2>
            <form onSubmit={handleSubmit}>
                <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                />
                <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => 
                setPassword(e.target.value)} 
                required/>
                <button type="submit">Log In</button>
            </form>
            <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
    )
}

export default Login;