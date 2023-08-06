import base64
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from lstm import machinelearningcode
import os
import concurrent.futures
import pandas as pd
from calculate_optimal_weights import calculate_optimal_weights
from pypfopt.efficient_frontier import EfficientFrontier
from pypfopt import risk_models
from pypfopt import expected_returns
from make_predictions import make_predictions
import yfinance as yf

app = Flask(__name__)
CORS(app)

# Modify the run() function to return the data as a dictionary instead of a list


def run(stock_name):
    predictions, test_rmse = make_predictions(stock_name)
    return predictions, test_rmse


@app.route('/predict', methods=['POST'])
def handle_predict():
    data = request.json
    # Split the comma-separated string into a list of stock names
    stock_names = data.get('prediction').split(",")
    print("Stock names received:", stock_names)

    predictions = {}

    with concurrent.futures.ThreadPoolExecutor() as executor:
        # Submit each stock name to the executor
        future_to_stock = {executor.submit(
            run, stock_name): stock_name for stock_name in stock_names}

        # Retrieve the results as they become available
        for future in concurrent.futures.as_completed(future_to_stock):
            stock_name = future_to_stock[future]
            try:
                stock_prediction, test_rmse = future.result()
                predictions[stock_name] = stock_prediction
            except Exception as e:
                print(
                    f"An error occurred while processing {stock_name}: {str(e)}")

    return jsonify(predictions)


@app.route('/optimize-portfolio', methods=['POST'])
def optimize_portfolio():
    data = request.json
    stock_names = data.get('stockNames').split(",")
    stock_weights = data.get('stockWeights')
    stock_predictions = data.get('stockPrediction')
    # Retrieve historical price data for S&P 500 using yfinance
    sp500_data = yf.download('^GSPC', start='2000-01-01', end='2023-06-24')
    sp500_close_prices = sp500_data['Adj Close']

    # Calculate the benchmark returns based on the price data
    benchmark_returns = sp500_close_prices.pct_change().dropna()

    # Calculate the optimal weights based on the stock data and predictions
    optimal_weights, portfolio_performance = calculate_optimal_weights(
        stock_names, stock_predictions, benchmark_returns)

   # Filter the optimal weights based on the provided stock weights
    filtered_weights = {
        stock: optimal_weights[stock] for stock in stock_weights.keys()}
   # Create the total return object with stock names and their respective total returns
    total_return = {}

    for i, stock in enumerate(stock_names):
        if i < len(portfolio_performance['portfolio_total_return']):
            total_return[stock] = portfolio_performance['portfolio_total_return'].iloc[i]
    # Filter the optimal weights based on the provided stock weights
    filtered_weights = {
        stock: optimal_weights[stock] for stock in stock_weights.keys()}

    return jsonify({'filtered_weights': filtered_weights, "total_return": total_return}
                   )


if __name__ == '__main__':
    app.run(port=5000, threaded=True)
