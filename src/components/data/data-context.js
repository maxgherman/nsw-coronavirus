import React, {
  createContext, useEffect, useState
} from 'react';
import PropTypes from 'prop-types';
import { config } from 'src/utils/config';
import { mergeData } from './merge';

export const DataContext = createContext({});
export const DataConsumer = DataContext.Consumer;
const ContextProvider = DataContext.Provider;

const { baseUrl } = config.data;

const getResource = (url) => fetch(url)
  .then((response) => response.json());

const importData = async () => {
  const postCodes = await getResource(`${baseUrl}/post-codes.json`);
  const cases = await getResource(`${baseUrl}/cases-total.json`);
  const population = await getResource(`${baseUrl}/population.json`);
  const tests = await getResource(`${baseUrl}/tests-total.json`);

  return {
    postCodes, cases, population, tests
  };
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({ loaded: false });

  useEffect(() => {
    importData()
      .then(({
        postCodes, cases, population, tests
      }) => {
        const prevData = mergeData({
          postCodes, cases, population, tests
        });

        const result = {
          ...prevData,
          loaded: true
        };

        setData(result);
      });
  }, []);

  return (
    <ContextProvider value={data}>
      {children}
    </ContextProvider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
