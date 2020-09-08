import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '@material-ui/core';
import PropTypes from 'prop-types';

export const TotalsChart = ({ data }) => {
  const theme = useTheme();

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
      xAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Bar
      height={300}
      data={data}
      options={options}
    />
  );
};

TotalsChart.propTypes = {
  data: PropTypes.object.isRequired
};
