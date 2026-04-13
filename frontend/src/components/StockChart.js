import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

export default function StockChart({ data, labels }) {

    return (
        <Line
            data={{
                labels: labels,
                datasets: [
                    {
                        label: "Price",
                        data: data,
                        borderColor: "#4cafef",
                        tension: 0.4
                    }
                ]
            }}
        />
    );
}