import React, { useMemo, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import { DataContext } from 'src/components/data';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.green[900]
  }
}));

const TotalCustomers = ({ className, ...rest }) => {
  const classes = useStyles();
  const { cases, dates } = useContext(DataContext);

  const { totalRecovered, progressRecovered } = useMemo(() => {
    const lastDateData = [
      ...cases.get(dates[dates.length - 1]).values()
    ]
      .reduce((acc, value) => acc + value.Recovered, 0);

    const secondLastDateData = [
      ...cases.get(dates[dates.length - 2]).values()
    ]
      .reduce((acc, value) => acc + value.Recovered, 0);

    const progress = lastDateData >= secondLastDateData ? 1 : -1;
    const diff = Math.abs(lastDateData - secondLastDateData);
    const percent = secondLastDateData === 0 ? 0 : (progress * diff * 100) / secondLastDateData;

    return {
      totalRecovered: lastDateData, progressRecovered: percent
    };
  }, [cases, dates]);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TOTAL RECOVERED
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {new Intl.NumberFormat().format(totalRecovered)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography
            variant="body2"
          >
            {progressRecovered.toFixed(5)}
            %
          </Typography>
          &nbsp;&nbsp;
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since last day
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

TotalCustomers.propTypes = {
  className: PropTypes.string
};

export default TotalCustomers;
