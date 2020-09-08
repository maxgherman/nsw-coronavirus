import React, { useContext, useMemo } from 'react';
import {
  colors,
  useTheme
} from '@material-ui/core';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import computeHistogram from 'compute-histogram';
import { DataContext } from 'src/components/data';

export const Tests = ({ date }) => {
  const theme = useTheme();
  const { tests } = useContext(DataContext);

  const data = useMemo(() => {
    const testsData = tests.get(date);

    if (!testsData) {
      return null;
    }

    const values = computeHistogram(
      [...tests
        .get(date)
        .values()
      ]
        .filter((item) => !isNaN(Number(item.Number)))
        .map((item) => item.Number)
    );

    return {
      datasets: [
        {
          backgroundColor: colors.indigo[700],
          data: values.map(([_, y]) => y),
          label: 'Tests',
          barThickness: 'flex',
          barPercentage: 1.3,
        }
      ],
      labels: values.map((_) => ''),
    };
  }, [tests, date]);

  const options = {
    animation: false,
    cornerRadius: 0,
    layout: { padding: 0 },
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

  if (!data) {
    return null;
  }

  return (
    <Bar
      height={200}
      data={data}
      options={options}
    />
  );
};

Tests.propTypes = {
  date: PropTypes.string.isRequired
};
