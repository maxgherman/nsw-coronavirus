import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const Header = ({ title }) => (
  <Typography
    color="textSecondary"
    variant="h6"
  >
    {title}
  </Typography>
);

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export const Grid = ({ children }) => (
  <div className="corelation">
    <div className="population h-header">
      <Header title="Population" />
    </div>
    <div className="cases h-header">
      <Header title="Total Cases" />
    </div>
    <div className="active h-header">
      <Header title="Active" />
    </div>
    <div className="recovered h-header">
      <Header title="Recovered" />
    </div>
    <div className="tests h-header">
      <Header title="Tests" />
    </div>

    <div className="population v-header">
      <Header title="Population" />
    </div>
    <div className="cases v-header">
      <Header title="Total Cases" />
    </div>
    <div className="active v-header">
      <Header title="Active" />
    </div>
    <div className="recovered v-header">
      <Header title="Recovered" />
    </div>
    <div className="tests v-header">
      <Header title="Tests" />
    </div>

    {children}
  </div>
);

Grid.propTypes = {
  children: PropTypes.array.isRequired
};
