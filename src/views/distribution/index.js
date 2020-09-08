import React, { useState } from 'react';
import {
  Container,
  Grid,
  Box,
  makeStyles,
  Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import { DateSlider } from 'src/components/date-slider';
import { Population } from './population';
import { Cases } from './cases';
import { Active } from './active';
import { Recovered } from './recovered';
import { Tests } from './tests';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Distribution = () => {
  const classes = useStyles();
  const [date, setDate] = useState('');

  return (
    <Page
      className={classes.root}
      title="Distribution"
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
                Suburb distribution / histograms
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
          >
            {date && <Cases date={date} />}
          </Grid>
          <Grid
            item
            lg={12}
            sm={12}
            xl={12}
            xs={12}
          >
            {date && <Active date={date} />}
          </Grid>
          <Grid
            item
            lg={12}
            sm={12}
            xl={12}
            xs={12}
          >
            {date && <Recovered date={date} />}
          </Grid>
          <Grid
            item
            lg={12}
            sm={12}
            xl={12}
            xs={12}
          >
            {date && <Tests date={date} />}
          </Grid>
          <Grid
            item
            lg={12}
            sm={12}
            xl={12}
            xs={12}
          >
            <Population />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Distribution;
