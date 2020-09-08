import React, {
  createContext, useEffect, useState
} from 'react';
import PropTypes from 'prop-types';
import { mergeData } from './merge';

export const DataContext = createContext({});
export const DataConsumer = DataContext.Consumer;
const ContextProvider = DataContext.Provider;

const getResource = (url) => fetch(url)
  .then((response) => response.json())
  .then((data) => { console.log(data); return data; });

const importData = async () => {
  const postCodes = await getResource('https://raw.githubusercontent.com/maxgherman/nsw-corona-virus/gh-pages/post-codes.json');
  const cases = await getResource('https://raw.githubusercontent.com/maxgherman/nsw-corona-virus/gh-pages/cases-total.json');
  const population = await getResource('https://raw.githubusercontent.com/maxgherman/nsw-corona-virus/gh-pages/population.json');
  const tests = await getResource('https://raw.githubusercontent.com/maxgherman/nsw-corona-virus/gh-pages/tests-total.json');

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
