import React from "react";

export default function Navbar() {
    const username = "Kanak"; // later fetch from backend

    return (
        <div style={styles.navbar}>
            <h2 style={styles.title}>📈 TradeAI Dashboard</h2>

            <div style={styles.right}>
                <span style={styles.user}>👤 {username}</span>

                <button style={styles.logoutBtn} onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
};

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 25px",
        background: "#1e1e2f",
        color: "white",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
    },
    title: {
        margin: 0
    },
    right: {
        display: "flex",
        alignItems: "center",
        gap: "15px"
    },
    user: {
        fontSize: "14px"
    },
    logoutBtn: {
        padding: "8px 14px",
        background: "#ff4d4f",
        border: "none",
        borderRadius: "5px",
        color: "white",
        cursor: "pointer"
    }
};