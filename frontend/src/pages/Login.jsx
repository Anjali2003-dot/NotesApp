import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("SUBMIT CLICKED");

        try {
            const res = await fetch("https://todo-backend-4xu0.onrender.com/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password}),
            });

            const data = await res.json();
            console.log("Login response:", data);

            if(res.ok && data.token) {
                localStorage.setItem("token", data.token);
                window.location.href = "/notes";  // redirect to notes page
            } else {
                setMessage(data.error || "Login failed");
            }
            
        } catch (err) {
            console.error(err);
            setMessage("Erros logging in");
        }
    };

    return (
        <div className="auth-page">

        <div className="form-container glass-card">
            <h2>Login</h2>
            {message && <p className="error-text">{message}</p>}
            <form onSubmit={handleSubmit}>
                <label className="input-label">Email</label>
                <input
                  className="input-field"
                  type="email"
                  placeholder="Email your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label className="input-label">Password</label>
                <input
                  className="input-field"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button className="btn-primary" type="submit">Login</button>  



            </form>

            <p style={{ marginTop: "12px", textAlign: "center" }}>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
      </div>  
    );
}