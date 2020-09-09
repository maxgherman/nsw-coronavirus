import React, { useState, useMemo, useContext } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { DateSlider } from 'src/components/date-slider';
import { DataContext } from 'src/components/data';
import { ChartSelector } from './chart-selector';
import { Chart } from './chart';
import { options } from './chart-type-options';

const sortArray = (data, compare) => {
  data.sort(compare);
  return data;
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  paddingBottom: {
    paddingBottom: '30px'
  }
}));

export const Regression = () => {
  const classes = useStyles();
  const [date, setDate] = useState('');
  const [chartTypes, setChartTypes] = useState([]);
  const { population, cases } = useContext(DataContext);

  const data = useMemo(() => {
    if (chartTypes.length <= 0) {
      return [];
    }

    if (!cases.has(date)) {
      return [];
    }

    const entry = cases.get(date);

    const mainData = population.reduce((acc, curr) => {
      if (!entry.has(curr.POA_NAME16.toString())) {
        return acc;
      }

      const caseEntry = entry.get(curr.POA_NAME16.toString());
      acc.push({
        population: curr.Tot_p_p,
        cases: caseEntry.Cases,
        active: caseEntry.Active,
        recovered: caseEntry.Recovered,
        tests: caseEntry.Tests
      });
      return acc;
    }, []);

    return chartTypes.reduce((acc, curr) => {
      acc.push({
        key: curr.name,
        xName: curr.xName,
        yName: curr.yName,
        backgroundColor: curr.backgroundColor,
        data: sortArray(
          mainData.map(curr.selector),
          (a, b) => a.x - b.x
        )
      });

      return acc;
    }, []);
  }, [population, cases, chartTypes, date]);

  return (
    <Page
      className={classes.root}
      title="Regression"
    >
      <Container>
        <Grid container>
          <Grid
            item
            lg={12}
            sm={12}
            xl={12}
            xs={12}
            className={classes.paddingBottom}
          >
            <Box
              display="flex"
              justifyContent="center"
            >
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h4"
              >
                Regression
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
            >
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h5"
              >
                {date}
              </Typography>
            </Box>
            <DateSlider dateChanged={setDate} />
          </Grid>
          <Grid
            item
            lg={12}
            sm={12}
            xl={12}
            xs={12}
            className={classes.paddingBottom}
          >
            <Box
              display="flex"
              justifyContent="center"
            >
              <ChartSelector options={options} onChange={setChartTypes} />
            </Box>
          </Grid>
          {data.map((item) => (
            <Grid
              key={item.key}
              item
              lg={12}
              sm={12}
              xl={12}
              xs={12}
            >
              <Chart
                data={item.data}
                name={item.key}
                xName={item.xName}
                yName={item.yName}
                backgroundColor={item.backgroundColor}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
};

export default Regression;
