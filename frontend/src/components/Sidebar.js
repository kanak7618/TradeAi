import React from "react";
export default function Sidebar() {
    return (
        <div style={styles.sidebar}>
            <h2>📊 TradeAI</h2>
            <ul>
                <li>Dashboard</li>
            </ul>
        </div>
    );
}


const styles = {
    sidebar: {
        width: "220px",
        height: "100vh",
        background: "#121212",
        color: "white",
        padding: "20px"
    },
    logo: {
        marginBottom: "30px"
    },
    menu: {
        listStyle: "none",
        padding: 0
    },
    active: {
        background: "#2a2a40",
        padding: "10px",
        borderRadius: "5px",
        marginBottom: "10px",
        cursor: "pointer"
    }
};