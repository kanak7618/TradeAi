import React from "react";

export default function StockCard({ ticker, mse, rmse }) {
    return (
        <div style={styles.card}>
            <h3>{ticker}</h3>
            <p>MSE: {mse.toFixed(5)}</p>
            <p>RMSE: {rmse.toFixed(5)}</p>
        </div>
    );
}

const styles = {
    card: {
        marginTop: "20px",
        padding: "20px",
        borderRadius: "10px",
        background: "#1e1e2f",
        color: "white",
        width: "250px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
    }
};