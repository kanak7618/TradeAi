# TradeAI Dashboard

A full-stack stock and crypto prediction dashboard built using React, Flask, and LSTM.

## Features
- Real-time stock and crypto price charts
- LSTM-based price prediction
- 7-day future prediction
- Watchlist (add/remove stocks)
- Auto-refresh live data

## Tech Stack
Frontend: React.js, Chart.js, Axios  
Backend: Flask, TensorFlow/Keras, yFinance  

## Project Structure
Stock-predictor/
├── backend/
│   ├── app.py
│   └── ml/lstm_model.py
├── frontend/
│   └── src/
└── README.md

## Setup

### Backend
cd backend  
python -m venv .venv  
source .venv/bin/activate  
pip install flask flask-cors flask-jwt-extended yfinance pandas numpy scikit-learn tensorflow  
python app.py  

Runs on http://127.0.0.1:5000

### Frontend
cd frontend  
npm install  
npm start  

Runs on http://localhost:3000

## API
POST /train  
GET /stock-data  
GET /watchlist  
POST /watchlist/add  

## Author
Kanak  
https://github.com/kanak7618

## Disclaimer
For educational purposes only.
