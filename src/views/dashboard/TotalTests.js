import React, { useContext, useMemo } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors,
  Box
} from '@material-ui/core';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { DataContext } from 'src/components/data';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.blue[900],
    height: 56,
    width: 56
  }
}));

const TotalProfit = ({ className, ...rest }) => {
  const classes = useStyles();
  const { tests, dates } = useContext(DataContext);

  const { totalTests, progressTests } = useMemo(() => {
    const lastDateData = [
      ...tests.get(dates[dates.length - 1]).values()
    ]
      .reduce((acc, value) => acc + value.Number, 0);

    const secondLastDateData = [
      ...tests.get(dates[dates.length - 2]).values()
    ]
      .reduce((acc, value) => acc + value.Number, 0);

    const progress = lastDateData >= secondLastDateData ? 1 : -1;
    const diff = Math.abs(lastDateData - secondLastDateData);
    const percent = (progress * diff * 100) / secondLastDateData;

    return {
      totalTests: lastDateData, progressTests: percent
    };
  }, [tests, dates]);

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
              TOTAL TESTS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {new Intl.NumberFormat().format(totalTests)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <LocalPharmacyIcon />
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
            className={classes.differenceValue}
            variant="body2"
          >
            {progressTests.toFixed(5)}
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

TotalProfit.propTypes = {
  className: PropTypes.string
};

export default TotalProfit;
