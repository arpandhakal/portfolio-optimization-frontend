import os
import tensorflow as tf
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.models import Sequential
from sklearn.preprocessing import MinMaxScaler
import numpy as np
import pandas as pd


def train_model(stockticker):
    filename = f"{stockticker}.csv"

    # Read the CSV file from the local system
    df = pd.read_csv(filename)

    df1 = df['close']

    scaler = MinMaxScaler(feature_range=(0, 1))
    df1 = scaler.fit_transform(np.array(df1).reshape(-1, 1))
    training_size = int(len(df1) * 0.80)
    test_size = len(df1) - training_size
    train_data, test_data = df1[0:training_size,
                                :], df1[training_size:len(df1), :1]

    def create_dataset(dataset, time_step=1):
        dataX, dataY = [], []
        for i in range(len(dataset) - time_step - 1):
            a = dataset[i:(i + time_step), 0]
            dataX.append(a)
            dataY.append(dataset[i + time_step, 0])
        return np.array(dataX), np.array(dataY)

    time_step = 150
    X_train, y_train = create_dataset(train_data, time_step)
    X_train = X_train.reshape(X_train.shape[0], X_train.shape[1], 1)

    model = Sequential()
    model.add(LSTM(50, return_sequences=True, input_shape=(150, 1)))
    model.add(LSTM(50, return_sequences=True))
    model.add(LSTM(50))
    model.add(Dense(1))
    model.compile(loss='mean_squared_error', optimizer='adam')
    model.summary()

    model.fit(X_train, y_train, epochs=10, batch_size=64, verbose=1)

    # Save the trained model
    model.save(f"{stockticker}.h5")
    print("Model saved successfully.")


# Call the function to train the model
train_model("SCB")
