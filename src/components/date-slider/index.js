import React, { useContext, useState, useEffect } from 'react';
import { Slider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { DataContext } from 'src/components/data';

export const DateSlider = ({ dateChanged }) => {
  const { dates } = useContext(DataContext);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (dates != null) {
      setValue(dates.length - 1);

      if (dateChanged) {
        dateChanged(dates[dates.length - 1]);
      }
    }
  }, [dates, dateChanged]);

  if (!dates) {
    return null;
  }

  return (
    <Slider
      value={value}
      onChange={(_, index) => {
        setValue(index);

        if (dateChanged) {
          dateChanged(dates[index]);
        }
      }}
      aria-labelledby="discrete-slider"
      step={1}
      min={0}
      max={dates.length - 1}
    />
  );
};

DateSlider.propTypes = {
  dateChanged: PropTypes.func
};
