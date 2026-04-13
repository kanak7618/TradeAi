import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:5000",
});
export const loginUser = (data) =>
    API.post("/login", data);
export const trainStock = (ticker) =>
    API.post("/train", { ticker });

export const getStockData = (ticker) =>
    API.get(`/stock-data?ticker=${ticker}`);

export const addWatch = (data) =>
    API.post("/watchlist/add", data);

export const getWatch = (user) =>
    API.get(`/watchlist?user=${user}`);