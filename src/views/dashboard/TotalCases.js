import React, { useContext, useMemo } from 'react';
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
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { DataContext } from 'src/components/data';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  cases: {
    backgroundColor: colors.red[300],
    height: 56,
    width: 56
  },
  progressUpIcon: {
    color: colors.red[900]
  },
  progressDownIcon: {
    color: colors.green[900]
  }
}));

const TotalCases = ({ className, ...rest }) => {
  const { cases, dates } = useContext(DataContext);
  const classes = useStyles();

  const { totalCases, progressCases } = useMemo(() => {
    const lastDateData = [
      ...cases.get(dates[dates.length - 1]).values()
    ]
      .reduce((acc, value) => acc + value.Cases, 0);

    const secondLastDateData = [
      ...cases.get(dates[dates.length - 2]).values()
    ]
      .reduce((acc, value) => acc + value.Cases, 0);

    const progress = lastDateData >= secondLastDateData ? 1 : -1;
    const diff = Math.abs(lastDateData - secondLastDateData);
    const percent = secondLastDateData === 0 ? 0 : (progress * diff * 100) / secondLastDateData;

    return {
      totalCases: lastDateData, progressCases: percent
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
              TOTAL CASES
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {new Intl.NumberFormat().format(totalCases)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.cases}>
              <ErrorOutlineIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          {progressCases < 0
            ? <ArrowDownwardIcon className={classes.progressDownIcon} />
            : <ArrowUpwardIcon className={classes.progressUpIcon} />}
          <Typography
            variant="body2"
          >
            {progressCases.toFixed(5)}
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

TotalCases.propTypes = {
  className: PropTypes.string
};

export default TotalCases;
