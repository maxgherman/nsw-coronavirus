import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import { DataProvider, DataConsumer } from 'src//components/data';
import theme from 'src/theme';
import routes from 'src/routes';

const App = () => {
  const routing = useRoutes(routes, process.env.PUBLIC_URL);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <DataProvider>
        <DataConsumer>{(data) => (data.loaded ? routing : null)}</DataConsumer>
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;
