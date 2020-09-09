import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Scatter } from 'react-chartjs-2';
import { useTheme } from '@material-ui/core';
import { linearRegression, linearRegressionLine } from 'simple-statistics';

export const Chart = ({
  data, name, xName, yName, backgroundColor
}) => {
  const theme = useTheme();
  const lineData = useMemo(() => {
    const regressionData = data.map((item) => [item.x, item.y]);
    const line = linearRegressionLine(
      linearRegression(regressionData)
    );

    return data.map((item) => ({
      x: item.x, y: Number(line(item.x).toFixed(3))
    }));
  }, [data]);

  const chartData = {
    datasets: [{
      data,
      label: name,
      tooltipLabel: yName,
      backgroundColor,
      order: 2
    }, {
      data: lineData,
      label: 'Regression line',
      tooltipLabel: `Regression ${yName}`,
      type: 'line',
      fill: false,
      order: 1
    }]
  };

  const options = {
    animation: false,
    cornerRadius: 0,
    layout: {
      padding: {
        top: 0, left: 0, right: 0, bottom: 50
      }
    },
    legend: { display: true },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom'
      }],
      yAxes: [{
        display: false
      }]
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'nearest',
      titleFontColor: theme.palette.text.primary,
      callbacks: {
        title: (item) => `${xName} ${item[0].label}`,
        label: (item, tooltipData) => `${tooltipData.datasets[item.datasetIndex].tooltipLabel} ${item.value}`
      }
    }
  };

  return (
    <Scatter height={250} data={chartData} options={options} />
  );
};

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  xName: PropTypes.string.isRequired,
  yName: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired
};
