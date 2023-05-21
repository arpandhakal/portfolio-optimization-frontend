import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const PieChart = ({ data }) => {
  const chartRef = useRef(null);
  let myChart = null;

  useEffect(() => {
    if (myChart) {
      myChart.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    myChart = new Chart(ctx, {
      type: "pie",
      data: data,
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            mode: "nearest",
            intersect: false,
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [data]);

  return (
    <div style={{ width: "300px", height: "300px" }}>
      <canvas
        ref={chartRef}
        width={300}
        height={300}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};

export default PieChart;
