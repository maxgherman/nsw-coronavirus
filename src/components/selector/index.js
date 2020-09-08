import React, { useState } from 'react';
import PropTypes, { string } from 'prop-types';
import {
  RadioGroup,
  FormControlLabel,
  FormControl,
  Radio
} from '@material-ui/core';

export const Selector = ({ data, selectionChanged }) => {
  const [selectedKey, setSelectedKey] = useState(data[0].key);

  return (
    <FormControl component="fieldset">
      <RadioGroup
        row
        aria-label="selector"
        name="position"
        value={selectedKey}
        onChange={(e) => {
          setSelectedKey(e.target.value);

          if (selectionChanged) {
            selectionChanged(e.target.value);
          }
        }}
      >
        {data.map((item) => (
          <FormControlLabel
            key={item.key}
            value={item.key}
            control={<Radio color="primary" />}
            label={item.name}
            labelPlacement="end"
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

Selector.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: string,
      name: string
    })
  ).isRequired,

  selectionChanged: PropTypes.func
};
