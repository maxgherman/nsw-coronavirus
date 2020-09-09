import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Map, selectorData } from 'src/components/map';
import { DateSlider } from 'src/components/date-slider';
import { Selector } from 'src/components/selector';

const useStyles = makeStyles(() => ({
  root: {},
  sliderDate: {
    minWidth: '100px',
    paddingLeft: '20px',
  },
  slider: {
    paddingRight: '20px',
    width: '100%'
  },
  selector: {
    paddingLeft: '30px'
  }
}));

const useContentStyles = makeStyles(() => ({
  root: {
    padding: 0
  }
}));

const MapDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const contentClasses = useContentStyles();
  const [dateValue, setDateValue] = useState('');
  const [mapStyle, setMapStyle] = useState(selectorData[0].key);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        p={1}
      >
        <div className={classes.sliderDate}>
          <Typography>
            {dateValue}
          </Typography>
        </div>
        <div className={classes.slider}>
          <DateSlider dateChanged={setDateValue} />
        </div>
      </Box>
      <Divider />
      <CardContent classes={{ root: contentClasses.root }}>
        <Box
          position="relative"
        >
          <Map date={dateValue} mapStyle={mapStyle} />
        </Box>
      </CardContent>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-start"
        className={classes.selector}
      >
        <Selector data={selectorData} selectionChanged={setMapStyle} />
      </Box>
    </Card>
  );
};

MapDetails.propTypes = {
  className: PropTypes.string
};

export default MapDetails;
