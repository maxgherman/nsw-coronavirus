import {
  caseLevels,
  testLevels,
  activeLevels,
  recoveredLevels,
  bagKeys
} from './levels';

const formatMap = (data) => data.data.reduce((acc, curr) => {
  const rootEntry = acc.has(curr.Date) ? acc.get(curr.Date) : new Map();

  acc.set(curr.Date, rootEntry);
  rootEntry.set(curr.POA_NAME16, curr);

  return acc;
}, new Map());

const formatPopulation = (data) => data.reduce((acc, curr) => {
  const key = curr.POA_NAME16.toString();

  const { population } = acc;
  const entry = population.has(key) ? population.get(key) : curr;
  population.set(key, entry);

  acc.suburbs.push({ postCode: key, name: curr.Combined });

  return acc;
}, {
  population: new Map(),
  suburbs: []
});

const getLevelKey = (levels) => (count) => {
  const entry = levels.find((item) => {
    if (item.start === undefined
      && count <= item.end) {
      return true;
    }

    if (item.end === undefined
      && count >= item.start) {
      return true;
    }

    if (item.start <= count
      && count <= item.end) {
      return true;
    }

    return false;
  });

  return entry ? entry.key : 0;
};

export const mergeData = ({
  postCodes: postCodesGeometry,
  cases: casesInitial,
  population: populationInitial,
  tests: testsInitial
}) => {
  if (!postCodesGeometry) {
    return {};
  }

  const caseLevelKey = getLevelKey(caseLevels);
  const testLevelKey = getLevelKey(testLevels);
  const activeLevelsKey = getLevelKey(activeLevels);
  const recoveredLevelsKey = getLevelKey(recoveredLevels);

  const cases = formatMap(casesInitial);
  const tests = formatMap(testsInitial);
  const { population: populationByCode, suburbs } = formatPopulation(populationInitial);

  const dates = Array.from(cases.keys());
  const selectedDate = dates[dates.length - 1];

  postCodesGeometry.features.forEach((feature) => {
    dates.forEach((date) => {
      const caseEntry = cases.get(date);
      const testsEntry = tests.get(date);

      const {
        testsKey, activeKey, totalKey, recoveredKey, deadKey,
        rangeTestsKey, rangeActiveKey, rangeRecoveredKey
      } = bagKeys(date);

      feature.properties[date] = 0;

      feature.properties[testsKey] = 0;
      feature.properties[activeKey] = 0;
      feature.properties[totalKey] = 0;
      feature.properties[recoveredKey] = 0;
      feature.properties[deadKey] = 0;

      // ranges
      feature.properties[rangeTestsKey] = 0;
      feature.properties[rangeActiveKey] = 0;
      feature.properties[rangeRecoveredKey] = 0;

      const hasCasesPOA = caseEntry.has(feature.properties.POA_NAME16);

      if (hasCasesPOA) {
        const caseEntryValue = caseEntry.get(feature.properties.POA_NAME16);
        const total = parseInt(caseEntryValue.Cases, 10);
        const recovered = parseInt(caseEntryValue.Recovered, 10);
        const dead = parseInt(caseEntryValue.Deaths, 10);
        caseEntryValue.Active = recovered === 0 ? 0 : total - (recovered + dead);

        feature.properties[date] = caseLevelKey(total);
        feature.properties[rangeActiveKey] = activeLevelsKey(caseEntryValue.Active);
        feature.properties[rangeRecoveredKey] = recoveredLevelsKey(recovered);

        feature.properties[totalKey] = total;
        feature.properties[activeKey] = caseEntryValue.Active;
        feature.properties[recoveredKey] = recovered;
        feature.properties[deadKey] = dead;
      }

      if (testsEntry && testsEntry.has(feature.properties.POA_NAME16)) {
        const testEntryValue = testsEntry.get(feature.properties.POA_NAME16);
        const total = parseInt(testEntryValue.Number, 10);
        const testRange = testLevelKey(total);

        if (hasCasesPOA) {
          const caseEntryValue = caseEntry.get(feature.properties.POA_NAME16);
          caseEntryValue.Tests = testEntryValue.Number;
          caseEntryValue.RecentTests = testEntryValue.Recent;
        }

        feature.properties[testsKey] = total;
        feature.properties[rangeTestsKey] = testRange;
      }
    });

    if (populationByCode.has(feature.properties.POA_NAME16)) {
      const populationEntry = populationByCode.get(feature.properties.POA_NAME16);
      feature.properties.population = populationEntry.Tot_p_p;
      feature.properties.suburbName = populationEntry.Combined;
    }
  });

  return {
    postCodesGeometry,
    suburbs,
    cases,
    populationByCode,
    population: populationInitial,
    tests,
    selectedDate,
    dates
  };
};
