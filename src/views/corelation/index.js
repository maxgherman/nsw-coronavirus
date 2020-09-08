import './corelation.css';

import React, { useContext, useMemo, useState } from 'react';
import {
  makeStyles,
  colors,
  Grid as MaterialGrid,
  Typography,
  Box
} from '@material-ui/core';
import Page from 'src/components/Page';
import { DataContext } from 'src/components/data';
import { DateSlider } from 'src/components/date-slider';
import { Grid } from './grid';
import { Chart } from './chart';
import { useResize } from './resizeHook';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  header: {
    width: '97%'
  }
}));

const sortArray = (data, compare) => {
  data.sort(compare);
  return data;
};

const Corelation = () => {
  const [width] = useResize();
  const classes = useStyles();
  const { population, cases, selectedDate } = useContext(DataContext);
  const [date, setDate] = useState(selectedDate);

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

  return (
    <Page
      className={classes.root}
      title="Corelation"
    >
      <MaterialGrid
        container
        spacing={0}
        className={classes.header}
      >
        <MaterialGrid
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
              Corelation
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
        </MaterialGrid>
      </MaterialGrid>
      <Grid>
        <div className="grid-item population-cases" style={{ width: width / 5 }}>
          <Chart
            data={data}
            selector={(x) => x.population.cases}
            backgroundColor={colors.indigo[500]}
          />
        </div>
        <div className="grid-item population-active" style={{ width: width / 5 }}>
          <Chart
            data={data}
            selector={(x) => x.population.active}
            backgroundColor={colors.indigo[500]}
          />
        </div>
        <div className="grid-item population-recovered" style={{ width: width / 5 }}>
          <Chart
            data={data}
            selector={(x) => x.population.recovered}
            backgroundColor={colors.indigo[500]}
          />
        </div>
        <div className="grid-item population-tests" style={{ width: width / 5 }}>
          <Chart
            data={data}
            selector={(x) => x.population.tests}
            backgroundColor={colors.indigo[500]}
          />
        </div>

        <div className="grid-item cases-population" style={{ width: width / 5 }}>
          <Chart
            data={data}
            selector={(x) => x.cases.population}
            backgroundColor={colors.red[500]}
          />
        </div>
        <div className="grid-item cases-active" style={{ width: width / 5 }}>
          <Chart
            data={data}
            selector={(x) => x.cases.active}
            backgroundColor={colors.red[500]}
          />
        </div>
        <div className="grid-item cases-recovered" style={{ width: width / 5 }}>
          <Chart
            data={data}
            selector={(x) => x.cases.recovered}
            backgroundColor={colors.red[500]}
          />
        </div>
        <div className="grid-item cases-tests" style={{ width: width / 5 }}>
          <Chart
            data={data}
            selector={(x) => x.cases.tests}
            backgroundColor={colors.red[500]}
          />
        </div>

        <div className="grid-item active-population" style={{ width: width / 5 }}>
          <Chart
            data={data}
            selector={(x) => x.active.population}
            backgroundColor={colors.red[900]}
          />
        </div>
        <div className="grid-item active-cases" style={{ width: width / 5 }}>
          <Chart
            data={data}
            selector={(x) => x.active.cases}
            backgroundColor={colors.red[900]}
          />
        </div>
        <div className="grid-item active-recovered" style={{ width: width / 5 }}>
          <Chart
            data={data}
            selector={(x) => x.active.recovered}
            backgroundColor={colors.red[900]}
          />
        </div>
        <div className="grid-item active-tests" style={{ width: width / 5 }}>
          <Chart
            data={data}
            selector={(x) => x.active.tests}
            backgroundColor={colors.red[900]}
          />
        </div>

        <div className="grid-item recovered-population" style={{ width: width / 5 }}>
          <Chart
            data={data}
            selector={(x) => x.recovered.population}
            backgroundColor={colors.green[700]}
          />
        </div>

        <div className="grid-item recovered-cases" style={{ width: width / 5 }}>
          <Chart
            data={data}
            selector={(x) => x.recovered.cases}
            backgroundColor={colors.green[700]}
          />
        </div>
        <div className="grid-item recovered-active" style={{ width: width / 5 }}>
          <Chart
            data={data}
            selector={(x) => x.recovered.active}
            backgroundColor={colors.green[700]}
          />
        </div>
        <div className="grid-item recovered-tests" style={{ width: width / 5 }}>
          <Chart
            data={data}
            selector={(x) => x.recovered.tests}
            backgroundColor={colors.green[700]}
          />
        </div>

        <div className="grid-item tests-population" style={{ width: width / 5 }}>
          <Chart
            data={data}
            selector={(x) => x.tests.population}
            backgroundColor={colors.indigo[700]}
          />
        </div>
        <div className="grid-item tests-cases" style={{ width: width / 5 }}>
          <Chart
            data={data}
            selector={(x) => x.tests.cases}
            backgroundColor={colors.indigo[700]}
          />
        </div>
        <div className="grid-item tests-active" style={{ width: width / 5 }}>
          <Chart
            data={data}
            selector={(x) => x.tests.active}
            backgroundColor={colors.indigo[700]}
          />
        </div>
        <div className="grid-item tests-recovered" style={{ width: width / 5 }}>
          <Chart
            data={data}
            selector={(x) => x.tests.recovered}
            backgroundColor={colors.indigo[700]}
          />
        </div>
      </Grid>
    </Page>
  );
};

export default Corelation;
