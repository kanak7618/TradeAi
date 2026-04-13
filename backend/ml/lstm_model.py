import numpy as np
import yfinance as yf
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense


def train_lstm(ticker):
    try:
        df = yf.download(ticker, period="1y")

        if df.empty or len(df) < 100:
            return {"error": "Not enough data"}

        data = df[['Close']]

        scaler = MinMaxScaler()
        scaled = scaler.fit_transform(data)

        X, y = [], []
        for i in range(60, len(scaled)):
            X.append(scaled[i-60:i])
            y.append(scaled[i])

        X, y = np.array(X), np.array(y)

        model = Sequential([
            LSTM(50, return_sequences=True),
            LSTM(50),
            Dense(1)
        ])

        model.compile(optimizer='adam', loss='mse')
        model.fit(X, y, epochs=3, verbose=0)

        # Future prediction
        future = []
        last_seq = scaled[-60:].reshape(60, 1)

        for _ in range(7):
            pred = model.predict(last_seq.reshape(1, 60, 1), verbose=0)[0][0]
            future.append(pred)
            last_seq = np.vstack((last_seq[1:], [[pred]]))

        future = scaler.inverse_transform(
            np.array(future).reshape(-1, 1)
        ).flatten().tolist()

        preds = model.predict(X, verbose=0)

        mse = float(mean_squared_error(y, preds))
        rmse = float(np.sqrt(mse))

        return {
            "mse": mse,
            "rmse": rmse,
            "future": future
        }

    except Exception as e:
        print("MODEL ERROR:", e)
        return {"error": "Model failed"}