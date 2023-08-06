import os
from sklearn.metrics import mean_squared_error
import tensorflow as tf
from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
import numpy as np
import pandas as pd
import math


def make_predictions(stockticker):
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
    X_test, y_test = create_dataset(test_data, time_step)
    X_test = X_test.reshape(X_test.shape[0], X_test.shape[1], 1)
    X_train, y_train = create_dataset(train_data, time_step)
    X_train = X_train.reshape(X_train.shape[0], X_train.shape[1], 1)

    # Load the trained model
    model = load_model("ADBL.h5")
    print("Model loaded successfully.")

    train_predict = model.predict(X_train)
    train_predict = scaler.inverse_transform(train_predict)

    test_predict = model.predict(X_test)
    test_predict = scaler.inverse_transform(test_predict)

    test_rmse = math.sqrt(mean_squared_error(y_test, test_predict))
    print('Test RMSE:', test_rmse)

    look_back = 150
    trainPredictPlot = np.empty_like(df1)
    trainPredictPlot[:, :] = np.nan
    trainPredictPlot[look_back:len(
        train_predict) + look_back, :] = train_predict

    testPredictPlot = np.empty_like(df1)
    testPredictPlot[:, :] = np.nan
    testPredictPlot[(len(df1) - len(test_predict)):, :] = test_predict

    len(test_data)
    x_input = test_data.reshape(1, -1)

    temp_input = list(x_input)
    temp_input = temp_input[0].tolist()
    lst_output = []
    n_steps = 100
    i = 0
    while i < 365:
        if len(temp_input) > n_steps:
            x_input = np.array(temp_input[-n_steps:])
            x_input = x_input.reshape((1, n_steps, 1))
            yhat = model.predict(x_input, verbose=0)
            temp_input.extend(yhat[0].tolist())
            lst_output.extend(yhat.tolist())
            i += 1
        else:
            x_input = np.array(temp_input)
            x_input = x_input.reshape((1, len(temp_input), 1))
            yhat = model.predict(x_input, verbose=0)
            temp_input.extend(yhat[0].tolist())
            lst_output.extend(yhat.tolist())
            i += 1

    day_new = np.arange(1, 101)
    day_pred = np.arange(101, 131)

    df3 = df1.tolist()
    df3.extend(lst_output)

    predictions = scaler.inverse_transform(np.array(lst_output).reshape(-1, 1))
    predictions = predictions.flatten()
    actual_values = scaler.inverse_transform(
        test_data[-len(lst_output):]).flatten()

    percentage_error = np.abs(
        (predictions - actual_values) / actual_values) * 100
    print(percentage_error.tolist())
    accuracy_percentage = 100 - np.mean(percentage_error)
    print('Accuracy Percentage:', accuracy_percentage)
    return predictions.tolist(), test_rmse
