import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), 'ml'))

from flask import Flask, request, jsonify
from flask_cors import CORS
from ml.lstm_model import train_lstm
import yfinance as yf
import pandas as pd

app = Flask(__name__)
CORS(app)

watchlist = {}

# TRAIN

@app.route("/train", methods=["POST"])
def train():
    ticker = request.json["ticker"]
    return jsonify(train_lstm(ticker))


# STOCK DATA

@app.route("/stock-data")
def stock_data():
    ticker = request.args.get("ticker")

    if ticker and ticker.endswith("USDT"):
        ticker = ticker.replace("USDT", "USD")

    try:
        df = yf.download(ticker, period="3mo", interval="1d")

        if df is None or df.empty:
            return {"prices": [], "dates": [], "info": None}


        if isinstance(df.columns, pd.MultiIndex):
            df.columns = df.columns.get_level_values(0)

        df = df.dropna()

        prices = df["Close"].astype(float).tolist()
        dates = df.index.strftime('%Y-%m-%d').tolist()

        info = {
            "price": round(prices[-1], 2),
            "change": round(((prices[-1] - prices[0]) / prices[0]) * 100, 2),
            "volume": int(df.iloc[-1]["Volume"])
        }

        return {
            "prices": prices,
            "dates": dates,
            "info": info
        }

    except Exception as e:
        print("ERROR:", e)
        return {"prices": [], "dates": [], "info": None}


# WATCHLIST

@app.route("/watchlist/add", methods=["POST"])
def add_watch():
    data = request.json
    user = data["user"]
    ticker = data["ticker"]

    watchlist.setdefault(user, [])

    if ticker not in watchlist[user]:
        watchlist[user].append(ticker)

    return {"msg": "added"}


@app.route("/watchlist")
def get_watch():
    user = request.args.get("user")
    return {"stocks": watchlist.get(user, [])}


if __name__ == "__main__":
    app.run(debug=True)