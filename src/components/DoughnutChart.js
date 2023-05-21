import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import {
  ArcElement,
  Chart,
  RadialLinearScale,
  Legend,
  Tooltip,
} from "chart.js";
import React, { useState, useEffect } from "react";
import { Doughnut, PolarArea } from "react-chartjs-2";
import useStyles from "../styles/Styles";

const DoughnutChart = ({ labels, weightData, title }) => {
  Chart.register(RadialLinearScale, ArcElement, Legend, Tooltip);
  const chartOptions = {
    maintainAspectRatio: true,
    aspectRatio: 1,
    scale: {
      ticks: {
        display: false,
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  // Generate random colors with alpha value of 0.5
  const getRandomColor = () => {
    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.5)`;
    return randomColor;
  };

  const backgroundColors = weightData.map(() => getRandomColor());

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Weight Percentage",
        data: weightData,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <Grid container item alignItems="center">
        <Grid item>
          <Typography className={classes.titleBig} variant="h6">
            {title}
          </Typography>
        </Grid>
      </Grid>

      <Divider style={{ borderWidth: 4 }} />
      <Grid item container style={{ marginTop: "4px" }}>
        <Grid item>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              marginLeft: "65px",
            }}
          >
            <Doughnut data={data} options={chartOptions} />
          </Box>
        </Grid>
      </Grid>
      <Divider style={{ borderWidth: 4, marginTop: "10px" }} />
    </Grid>
  );
};

export default DoughnutChart;
