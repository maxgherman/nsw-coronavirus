import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider, makeStyles } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import GlobalStyles from 'src/components/GlobalStyles';
import { DataProvider, DataConsumer } from 'src//components/data';
import theme from 'src/theme';
import routes from 'src/routes';

const useStyles = makeStyles(() => ({
  progressWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
    height: '100%'
  },
  progress: {
    position: 'relative',
    top: '45%',
    height: '5px'
  }
}));

const App = () => {
  const classes = useStyles();
  const routing = useRoutes(routes, process.env.PUBLIC_URL);

  const renderBody = (data) => (data.loaded ? routing
    : (
      <div className={classes.progressWrapper}>
        <LinearProgress className={classes.progress} />
      </div>
    ));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <DataProvider>
        <DataConsumer>
          {renderBody}
        </DataConsumer>
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;
