import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StockCard from "../components/StockCard";
import StockChart from "../components/StockChart";
import {
    trainStock,
    getStockData,
    addWatch,
    getWatch
} from "../services/api";

export default function Dashboard() {

    const [ticker, setTicker] = useState("AAPL");
    const [metrics, setMetrics] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [future, setFuture] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [stockInfo, setStockInfo] = useState(null);

    useEffect(() => {
        loadChart();
        loadWatchlist();
    }, [ticker]);

    const loadChart = async () => {
        const res = await getStockData(ticker);

        if (!res.data || res.data.prices.length === 0) {
            setChartData([]);
            return;
        }

        setChartData(res.data.prices);
        setLabels(res.data.dates);
        setStockInfo(res.data.info);
    };

    const loadWatchlist = async () => {
        const res = await getWatch("test");
        setWatchlist(res.data.stocks || []);
    };

    const handleTrain = async () => {
        const res = await trainStock(ticker);

        if (res.data.error) {
            alert("Not enough data ");
            return;
        }

        setMetrics(res.data);
        setFuture(res.data.future || []);
    };

    const handleWatch = async () => {
        await addWatch({ user: "test", ticker });
        loadWatchlist();
    };

    return (
        <div style={{ display: "flex" }}>
            <Sidebar />

            <div style={{ flex: 1 }}>
                <Navbar />

                <div style={{ padding: "20px" }}>

                    <input
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value.toUpperCase())}
                    />

                    <button onClick={handleTrain}>Predict</button>
                    <button onClick={handleWatch}>Watch</button>

                    {stockInfo && (
                        <div>
                            <h3>{ticker}</h3>
                            <p>Price: {stockInfo.price}</p>
                        </div>
                    )}

                    {/* CHART */}
                    {chartData.length > 0 && (
                        <StockChart
                            key={ticker}
                            data={[...chartData, ...future]}
                            labels={[
                                ...labels,
                                ...future.map((_, i) => `F+${i + 1}`)
                            ]}
                        />
                    )}

                    {/* METRICS */}
                    {metrics && (
                        <StockCard
                            ticker={ticker}
                            mse={metrics.mse}
                            rmse={metrics.rmse}
                        />
                    )}

                    {/* WATCHLIST */}
                    <ul>
                        {watchlist.map((s, i) => (
                            <li key={i} onClick={() => setTicker(s)}>
                                {s}
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </div>
    );
}