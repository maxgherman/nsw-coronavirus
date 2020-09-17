import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  makeStyles,
  Typography,
  Link,
  Hidden
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from '@material-ui/icons/GitHub';
import { config } from 'src/utils/config';
import { links } from 'src/utils/navigation-urls';

const useStyles = makeStyles(() => ({
  root: {},
  title: {
    paddingLeft: '20px',
    minWidth: '50%',
    '& *': {
      color: 'inherit'
    }
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
          <NavLink
            to={links.dashboard.absolute}
          >
            <Typography
              gutterBottom
              variant="h5"
            >
              NSW Australia coronavirus spread analysis
            </Typography>
            <Hidden xsDown>
              <Typography
                gutterBottom
                variant="inherit"
                className={classes.subTitle}
              >
                The information presented is for demonstration purposes only
              </Typography>
            </Hidden>
          </NavLink>
        </Box>
        <Box style={{ width: '100%', textAlign: 'end' }}>
          <Link
            href={config.source.baseUrl}
            target="_blank"
            rel="noopener"
          >
            <GitHubIcon style={{ color: '#ffff' }} />
          </Link>
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
