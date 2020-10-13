import './correlation.css';

import React, { useContext, useMemo, useState } from 'react';
import {
  makeStyles,
  Grid,
  Typography,
  Box
} from '@material-ui/core';
import Page from 'src/components/Page';
import { DataContext } from 'src/components/data';
import { DateSlider } from 'src/components/date-slider';
import { Selector } from 'src/components/selector';
import { ChartGrid } from './chart-grid';
import { NumbersGrid } from './numbers-grid';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  header: {
    width: '97%'
  },
  slider: {
    paddingLeft: '30px'
  }
}));

const selectorData = [{
  key: 'Charts',
  name: 'Charts'
}, {
  key: 'Numbers',
  name: 'Numbers'
}];

const sortArray = (data, compare) => {
  data.sort(compare);
  return data;
};

const Correlation = () => {
  const classes = useStyles();
  const { population, cases, selectedDate } = useContext(DataContext);
  const [date, setDate] = useState(selectedDate);
  const [displayType, setDisplayType] = useState(selectorData[0].key);

  const data = useMemo(() => {
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

    const result = {
      population: {
        cases: sortArray(
          mainData.map((item) => ({ x: item.population, y: item.cases })),
          (a, b) => a.x - b.x
        ),
        active: sortArray(
          mainData.map((item) => ({ x: item.population, y: item.active })),
          (a, b) => a.x - b.x
        ),
        recovered: sortArray(
          mainData.map((item) => ({ x: item.population, y: item.recovered })),
          (a, b) => a.x - b.x
        ),
        tests: sortArray(
          mainData.map((item) => ({ x: item.population, y: item.tests })),
          (a, b) => a.x - b.x
        ),
      },

      cases: {
        population: sortArray(
          mainData.map((item) => ({ x: item.cases, y: item.population })),
          (a, b) => a.x - b.x
        ),
        active: sortArray(
          mainData.map((item) => ({ x: item.cases, y: item.active })),
          (a, b) => a.x - b.x
        ),
        recovered: sortArray(
          mainData.map((item) => ({ x: item.cases, y: item.recovered })),
          (a, b) => a.x - b.x
        ),
        tests: sortArray(
          mainData.map((item) => ({ x: item.cases, y: item.tests })),
          (a, b) => a.x - b.x
        ),
      },

      active: {
        population: sortArray(
          mainData.map((item) => ({ x: item.active, y: item.population })),
          (a, b) => a.x - b.x
        ),
        cases: sortArray(
          mainData.map((item) => ({ x: item.active, y: item.cases })),
          (a, b) => a.x - b.x
        ),
        recovered: sortArray(
          mainData.map((item) => ({ x: item.active, y: item.recovered })),
          (a, b) => a.x - b.x
        ),
        tests: sortArray(
          mainData.map((item) => ({ x: item.active, y: item.tests })),
          (a, b) => a.x - b.x
        ),
      },

      recovered: {
        population: sortArray(
          mainData.map((item) => ({ x: item.recovered, y: item.population })),
          (a, b) => a.x - b.x
        ),
        cases: sortArray(
          mainData.map((item) => ({ x: item.recovered, y: item.cases })),
          (a, b) => a.x - b.x
        ),
        active: sortArray(
          mainData.map((item) => ({ x: item.recovered, y: item.active })),
          (a, b) => a.x - b.x
        ),
        tests: sortArray(
          mainData.map((item) => ({ x: item.recovered, y: item.tests })),
          (a, b) => a.x - b.x
        ),
      },

      tests: {
        population: sortArray(
          mainData.map((item) => ({ x: item.tests, y: item.population })),
          (a, b) => a.x - b.x
        ),
        cases: sortArray(
          mainData.map((item) => ({ x: item.tests, y: item.cases })),
          (a, b) => a.x - b.x
        ),
        active: sortArray(
          mainData.map((item) => ({ x: item.tests, y: item.active })),
          (a, b) => a.x - b.x
        ),
        recovered: sortArray(
          mainData.map((item) => ({ x: item.tests, y: item.recovered })),
          (a, b) => a.x - b.x
        )
      }
    };

    return result;
  }, [population, cases, date]);

  const renderBody = () => {
    if (displayType === selectorData[0].key) {
      return (<ChartGrid data={data} />);
    }

    if (displayType === selectorData[1].key) {
      return (<NumbersGrid data={data} />);
    }

    return null;
  };

  return (
    <Page
      className={classes.root}
      title="Correlation"
    >
      <Grid
        container
        spacing={0}
        className={classes.header}
      >
        <Grid
          item
          lg={12}
          sm={12}
          xl={12}
          xs={12}
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
              Correlation
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
          <Box
            display="flex"
            justifyContent="center"
            className={classes.slider}
          >
            <DateSlider dateChanged={setDate} />
          </Box>

        </Grid>
        <Grid
          item
          lg={12}
          sm={12}
          xl={12}
          xs={12}
          style={{ paddingLeft: 50 }}
        >
          <Selector data={selectorData} selectionChanged={setDisplayType} />
        </Grid>
      </Grid>
      {renderBody()}
    </Page>
  );
};

export default Correlation;
