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
  IconButton
} from '@material-ui/core';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import { Map, selectorData } from 'src/components/map';
import { DateSlider } from 'src/components/date-slider';
import { Selector } from 'src/components/selector';

const useStyles = makeStyles(() => ({
  sliderDate: {
    minWidth: '130px',
    paddingLeft: '10px',
  },
  slider: {
    paddingRight: '20px',
    width: '100%'
  },
  selector: {
    paddingLeft: '30px'
  },
  displayToggle: {
    padding: 0
  }
}));

const useContentStyles = makeStyles(() => ({
  contentRoot: {
    padding: 0
  }
}));

const fullScreenClick = (mapState, setMapState) => {
  const element = document.getElementsByClassName('map-wrapper')[0];
  if (!element) {
    return;
  }

  if (!element.requestFullscreen) {
    // eslint-disable-next-line no-alert
    alert('Full screen mode is not supported by the browser');
    return;
  }

  if (document.fullscreenElement && document.fullscreenElement === element) {
    document.exitFullscreen()
      .finally(() => { setMapState({ ...mapState, fullScreen: false }); });
    return;
  }

  if (!document.fullscreenElement) {
    element.requestFullscreen()
      .finally(() => { setMapState({ ...mapState, fullScreen: true }); });
  }
};

const MapDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const contentClasses = useContentStyles();
  const [dateValue, setDateValue] = useState('');
  const [mapState, setMapState] = useState({
    type: selectorData[0].key,
    fullScreen: false
  });

  return (
    <Card
      className={clsx(classes.root, className, 'map-wrapper')}
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
        <div>
          <IconButton
            title="Full screen"
            classes={{ root: classes.displayToggle }}
            onClick={() => { fullScreenClick(mapState, setMapState); }}
          >
            {mapState.fullScreen
              ? (<FullscreenExitIcon fontSize="large" />)
              : (<FullscreenIcon fontSize="large" />)}
          </IconButton>
        </div>
      </Box>
      <Divider />
      <CardContent classes={{ root: contentClasses.contentRoot }}>
        <Box
          position="relative"
        >
          <Map
            date={dateValue}
            mapStyle={mapState.type}
            height={mapState.fullScreen ? '92vh' : '60vh'}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-start"
        className={classes.selector}
      >
        <Selector
          data={selectorData}
          selectionChanged={(type) => { setMapState({ ...mapState, type }); }}
        />
      </Box>
    </Card>
  );
};

MapDetails.propTypes = {
  className: PropTypes.string
};

export default MapDetails;
