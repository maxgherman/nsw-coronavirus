import React from 'react';
import PropTypes from 'prop-types';
import { Scatter } from 'react-chartjs-2';

export const Chart = ({ data, selector, backgroundColor }) => {
  const chartData = {
    datasets: [{
      data: selector(data),
      backgroundColor
    }]
  };

  const options = {
    animation: false,
    cornerRadius: 0,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [{
        type: 'linear',
        position: 'bottom'
      }]
    }
  };

  return (
    <Scatter data={chartData} options={options} />
  );
};

Chart.propTypes = {
  data: PropTypes.object.isRequired,
  selector: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string.isRequired
};
