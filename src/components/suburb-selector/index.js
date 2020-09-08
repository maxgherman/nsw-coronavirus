import React, { useContext } from 'react';
import { TextField, makeStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import { DataContext } from 'src/components/data';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
  option: {
    '& [data-length="long"]': {
      display: 'none'
    },
    '&:hover [data-length="long"]': {
      display: 'block'
    }
  },
  optionHeader: {
    fontWeight: 'bold'
  }
}));

const renderOption = (option, classes) => (
  <div className={classes.option}>
    <span className={classes.optionHeader}>{option.postCode}</span>
    <br />
    <span>{option.name.substring(0, 40)}</span>
    <span data-length="long">{option.name.substring(40)}</span>
  </div>
);

const SuburbSelect = ({ onChange }) => {
  const classes = useStyles();
  const { suburbs } = useContext(DataContext);

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      className={classes.root}
      options={suburbs}
      getOptionLabel={(option) => `${option.postCode} ${option.name}`}
      renderInput={(params) => <TextField {...params} label="Suburb" variant="outlined" />}
      renderOption={(option) => renderOption(option, classes)}
      onChange={(_, value) => onChange(value)}
    />
  );
};

export default SuburbSelect;

SuburbSelect.propTypes = {
  onChange: PropTypes.func.isRequired
};
