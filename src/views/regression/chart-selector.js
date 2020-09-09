import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  }
}));

export const ChartSelector = ({ options, onChange }) => {
  const classes = useStyles();

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      className={classes.root}
      options={options}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} label="Correlation pair" variant="outlined" />}
      onChange={(_, value) => onChange(value)}
    />
  );
};

ChartSelector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired
};
