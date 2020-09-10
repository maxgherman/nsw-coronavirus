import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  makeStyles,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(() => ({
  root: {},
  title: {
    paddingLeft: '20px'
  },
  subTitle: {
    fontSize: '15px'
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={onMobileNavOpen}
        >
          <MenuIcon />
        </IconButton>
        <Box className={classes.title}>
          <Typography
            gutterBottom
            variant="h5"
          >
            NSW Australia coronavirus spread analysis
          </Typography>
          <Typography
            gutterBottom
            variant="inherit"
            className={classes.subTitle}
          >
            The information presented is for demonstration purposes only
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
