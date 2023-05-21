import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import PieChart from "../utils/pieChart";
import useStyles from "../styles/Styles";

const AmountPieChart = ({ piedata, labels }) => {
  const classes = useStyles();

  // Generate an array of lighter colors based on the number of data points
  const generateColors = (numColors) => {
    const colors = [];
    const lightness = 70; // Adjust the lightness value for lighter or darker colors

    for (let i = 0; i < numColors; i++) {
      const hue = (i * 137.5) % 360; // Vary the hue value for different colors
      const color = `hsl(${hue}, 50%, ${lightness}%)`; // Set the saturation and lightness values
      colors.push(color);
    }
    return colors;
  };

  // Prepare data with dynamically assigned lighter colors
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total Amount Renewed",
        data: piedata,
        backgroundColor: generateColors(piedata.length),
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return <PieChart data={data} />;
};

export default AmountPieChart;
