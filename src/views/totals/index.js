import React, { useContext, useMemo, useState } from 'react';
import {
  Container,
  Grid,
  Box,
  makeStyles,
  Typography,
  colors,
} from '@material-ui/core';
import Page from 'src/components/Page';
import { DataContext } from 'src/components/data';
import SuburbSelect from 'src/components/suburb-selector';
import { TotalsChart } from './chart';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const calcTotal = (cases, date) => {
  if (!cases.has(date)) {
    return 0;
  }

  return [...cases.get(date)
    .values()]
    .reduce((acc, curr) => acc + curr.Cases, 0);
};

const calcSuburbsTotal = (cases, date, prevDate, suburbs, result) => {
  suburbs.forEach((suburb) => {
    const entry = result.has(suburb.postCode) ? result.get(suburb.postCode) : [];
    const value = cases.has(date) && cases.get(date).has(suburb.postCode)
      ? cases.get(date).get(suburb.postCode).Cases : 0;

    const diff = !prevDate || !cases.has(date) || !cases.get(prevDate).has(suburb.postCode)
      ? value
      : value - cases.get(prevDate).get(suburb.postCode).Cases;
    entry.push({ value, diff: Math.max(0, diff) });
    result.set(suburb.postCode, entry);
  });
};

const Totals = () => {
  const classes = useStyles();
  const { cases, dates } = useContext(DataContext);
  const [selectedSuburbs, setSelectedSuburbs] = useState([]);

  const data = useMemo(() => {
    return dates.reduce((acc, curr) => {
      const {
        prev, daily, cumulative, prevDate
      } = acc;
      const total = calcTotal(cases, curr);

      cumulative.push(total);

      if (!prev) {
        daily.push(total);
      } else {
        const diff = total - prev;
        daily.push(Math.max(0, diff));
      }

      acc.prev = total;

      if (!cases.has(curr)) {
        return acc;
      }

      calcSuburbsTotal(cases, curr, prevDate, selectedSuburbs, acc.suburbs);
      acc.prevDate = curr;
      return acc;
    }, {
      prev: null, daily: [], cumulative: [], prevDate: null, suburbs: new Map()
    });
  }, [cases, dates, selectedSuburbs]);

  const chartData = {
    datasets: [{
      backgroundColor: colors.red[500],
      label: 'Daily new cases',
      data: data.daily,
      order: 1
    },
    {
      backgroundColor: colors.indigo[100],
      label: 'Cumulative totals',
      data: data.cumulative,
      type: 'line',
      order: 2
    }],
    labels: dates
  };

  return (
    <Page
      className={classes.root}
      title="Totals"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
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
                Daily and cumulative totals
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            lg={12}
            sm={12}
            xl={12}
            xs={12}
          >
            <TotalsChart data={chartData} />
          </Grid>
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
                variant="h5"
              >
                Suburb split
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            lg={12}
            sm={12}
            xl={12}
            xs={12}
          >
            <SuburbSelect onChange={setSelectedSuburbs} />
          </Grid>
          {[...data.suburbs.entries()].map(([key, value]) => (
            <React.Fragment key={key}>
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
                    variant="h6"
                  >
                    {key}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                lg={12}
                sm={12}
                xl={12}
                xs={12}
              >
                <TotalsChart
                  data={{
                    datasets: [{
                      backgroundColor: colors.red[500],
                      label: 'Daily new cases',
                      data: value.map((item) => item.diff),
                      order: 1
                    },
                    {
                      backgroundColor: colors.indigo[100],
                      label: 'Cumulative totals',
                      data: value.map((item) => item.value),
                      type: 'line',
                      order: 2
                    }],
                    labels: dates
                  }}
                />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Container>
    </Page>
  );
};

export default Totals;
