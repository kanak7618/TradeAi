import React, { useState } from "react";
import { loginUser } from "../services/api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
            const res = await loginUser({
                email,
                password
            });

            localStorage.setItem("token", res.data.token);


            window.location.href = "/";
        } catch (err) {
            alert("Invalid credentials ");
        }
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "#121212"
        }}>
            <div style={{
                padding: "30px",
                background: "#1e1e2f",
                borderRadius: "10px",
                color: "white",
                width: "300px"
            }}>
                <h2>Login</h2>

                <input
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
                />

                <input
                    placeholder="Password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
                />

                <button
                    onClick={login}
                    style={{ width: "100%", padding: "10px" }}
                >
                    Login
                </button>
            </div>
        </div>
    );
}