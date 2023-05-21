import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../action/authActions";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";

import {
  Box,
  Card,
  Divider,
  Grid,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core";
import useStyles from "../../styles/Styles";
import CustomButton from "../../components/CustomButton";
import DynamicDataTableServerPaginate from "../../components/DynamicDataTable/DynamicTableServerPaginate";
import PieChart from "../../components/AmountPieChart";
import AmountPieChart from "../../components/AmountPieChart";
import FormModal from "../../components/FormModal";
import axios from "axios";
import DoughnutChart from "../../components/DoughnutChart";

const Dashboard = ({ auth, logoutUser }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formDataFinal, setFormDataFinal] = React.useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [weights, setWeights] = useState();
  const [optimizationFlag, setOptimizationFlag] = useState(null);
  const [optimizedWeights, setOptimizedWeights] = useState();
  console.log(formDataFinal);
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  console.log(weights);

  const handleOptimization = async () => {
    const symbols = formDataFinal?.map((item, index) => item.symbol);
    const symbolsPayload = symbols.join(",");
    try {
      const response = await axios.post("http://localhost:5000/predict", {
        prediction: symbolsPayload,
      });

      if (response.status === 200) {
        const data = response.data;
        const predictions = {};

        for (const stockName in data) {
          console.log(111, stockName);
          const stockValues = data[stockName];
          const lastValue = stockValues[stockValues.length - 1];
          predictions[stockName] = lastValue;
        }
        setPredictions(predictions);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const optimizePortfolio = async () => {
      if (predictions.length !== 0) {
        setOptimizationFlag(true);
        try {
          const symbols = formDataFinal?.map((item, index) => item.symbol);
          const symbolsPayload = symbols.join(",");
          const optResponse = await axios.post(
            "http://localhost:5000/optimize-portfolio",
            {
              stockNames: symbolsPayload,
              stockWeights: weights,
              stockPrediction: predictions,
            }
          );
          // Handle the optResponse here
          console.log(optResponse);
          setOptimizedWeights(optResponse.data);
          setOptimizationFlag(false);
        } catch (err) {
          console.log(err);
        }
      }
    };
    if (predictions) {
      optimizePortfolio();
    }
  }, [predictions]);
  console.log(optimizedWeights);

  useEffect(() => {
    // Calculate the total amount
    const totalAmount = formDataFinal?.reduce(
      (total, weight) => total + parseInt(weight.amount),
      0
    );

    // Calculate the weights
    const weights = {};
    formDataFinal?.forEach((weight) => {
      const weightValue = parseInt(weight.amount) / totalAmount;
      weights[weight.symbol] = weightValue;
    });
    setWeights(weights);
  }, [formDataFinal]);
  useEffect(() => {
    if (formDataFinal.length !== 0 || tableData.length !== 0) {
      const updatedTableData = formDataFinal.map((item, index) => {
        return {
          index: index + 1,
          symbol: item?.symbol,
          amount: item?.amount,
        };
      });
      setTableData(updatedTableData);
      setTableLoading(false);
    } else {
      setTableLoading(true);
    }
  }, [formDataFinal]);
  const classes = useStyles();
  const tableColumns = [
    { title: "Index", field: "index" },
    { title: "Symbol", field: "symbol" },
    { title: "Investment Amount", field: "amount", type: "amount" },
  ];

  return (
    <Paper className={classes.bodyCard}>
      <Grid container direction="column" spacing={3}>
        <Grid container item direction="row" spacing={4}>
          <Grid item xs={6} md={6}>
            <Typography variant="h6" component="h6">
              Greetings, {auth.user.email} 🙏
            </Typography>
          </Grid>
          <Grid item xs={2} md={2}>
            <CustomButton
              children={"Load Portfolio"}
              color={"primary"}
              onClick={handleOpenModal}
            />
          </Grid>
          <Grid item xs={2} md={2}>
            <CustomButton children={"Clear Portfolio"} />
          </Grid>
          <Grid item xs={2} md={2}>
            <CustomButton children={"Save Portfolio"} color={"primary"} />
          </Grid>
        </Grid>
        <Divider />
        <Grid container item direction="row" spacing={4}>
          <Grid item xs={8} md={8}>
            <Card
              style={{
                padding: "20px",
                maxHeight: "350px",
                minHeight: "350px",
              }}
            >
              <DynamicDataTableServerPaginate
                loading={tableLoading}
                column={tableColumns}
                data={tableData}
                paginationDisplay={false}
              />
            </Card>
          </Grid>
          <Grid item xs={4} md={4}>
            <Card
              style={{
                padding: "20px",
                maxHeight: "350px",
                minHeight: "350px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {!formDataFinal || formDataFinal.length === 0 ? (
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  className={classes.noDataSmiley}
                >
                  <Grid item>
                    <SentimentVerySatisfiedIcon style={{ fontSize: 200 }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Upload your assets to visualize data
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <Grid contanier direction="column">
                  <Grid item>
                    <AmountPieChart
                      labels={formDataFinal?.map((item, index) => item.symbol)}
                      piedata={formDataFinal?.map(
                        (item, index) => item?.amount
                      )}
                    />
                  </Grid>
                  <div style={{ marginTop: "20px" }} />
                  <Grid item style={{ marginLeft: "105px" }}>
                    <CustomButton
                      children={"Optimize"}
                      color={"primary"}
                      onClick={handleOptimization}
                    />
                  </Grid>
                </Grid>
              )}
            </Card>
          </Grid>
        </Grid>
        {optimizationFlag !== null ? (
          <Grid item container direction="row" spacing={4}>
            <Grid item xs={4} md={4}>
              <Card
                style={{
                  padding: "20px",
                  maxHeight: "350px",
                  minHeight: "350px",
                }}
              >
                {weights !== undefined ? (
                  <DoughnutChart
                    title="Actual weights"
                    labels={Object.keys(weights)}
                    weightData={Object.values(weights)}
                  />
                ) : null}
              </Card>
            </Grid>
            <Grid item xs={4} md={4}>
              <Card
                style={{
                  padding: "20px",
                  maxHeight: "350px",
                  minHeight: "350px",
                }}
              >
                {optimizationFlag === false ? (
                  <DoughnutChart
                    title="Optimized weights"
                    labels={Object.keys(optimizedWeights)}
                    weightData={Object.values(optimizedWeights)}
                  />
                ) : (
                  <div> Please wait for optimization</div>
                )}
              </Card>
            </Grid>
            <Grid item xs={4} md={4}>
              <Card
                style={{
                  padding: "20px",
                  maxHeight: "350px",
                  minHeight: "350px",
                }}
              >
                <Grid container direction="column">
                  <Grid container item alignItems="center">
                    <Grid item>
                      <Typography className={classes.titleBig} variant="h6">
                        Benchmarking
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider style={{ borderWidth: 4 }} />
                  Coming Soon....
                </Grid>
              </Card>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
      <FormModal
        open={modalOpen}
        handleClose={handleCloseModal}
        formData={formDataFinal}
        setFormDataFinal={setFormDataFinal}
      />
    </Paper>
  );
};

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
