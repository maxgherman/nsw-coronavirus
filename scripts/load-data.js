const https = require('https');
const fs = require('fs');
const path = require('path');
const util = require('util');
const { StringDecoder } = require('string_decoder');

const writeFile = util.promisify(fs.writeFile);

const baseDataURL = 'https://nswdac-covid-19-postcode-heatmap.azurewebsites.net/datafiles';
const baseDataStoreURL = 'https://raw.githubusercontent.com/maxgherman/nsw-coronavirus/gh-pages';
const baseSaveDataFolder = 'public';
const dateTimeFormat = new Intl.DateTimeFormat('en', {
  month: 'short', day: '2-digit', year: 'numeric'
});

const daysMap = [...new Array(14).keys()]
  .reduce((acc, curr) => {
    const date = new Date();
    date.setDate(date.getDate() - curr);
    const dateParts = dateTimeFormat.formatToParts(date);
    const day = dateParts.filter((item) => item.type === 'day')[0];
    const month = dateParts.filter((item) => item.type === 'month')[0];
    const year = dateParts.filter((item) => item.type === 'year')[0];

    acc.set(`Day${curr}`, `${day.value}-${month.value}-${year.value}`);
    return acc;
  }, new Map());

const currentYear = new Date().getFullYear();

const sort = (a, b) => {
  const aDate = new Date(a.Date);
  const bDate = new Date(b.Date);

  return aDate > bDate ? 1 : (aDate < bDate ? -1 : 0);
};

const download = (url) => new Promise((resolve, reject) => {
  const decoder = new StringDecoder('utf8');
  let data = '';

  https.get(url, (resp) => {
    resp.on('data', (chunk) => {
      data += decoder.write(chunk);
    });

    resp.on('end', () => {
      data += decoder.end();
      resolve(data);
    });
  })
    .on('error', (err) => {
      console.log(reject(err));
      process.exit(1);
    });
});

const arrangeByDate = (data, store, year, hasCrossYear) => data.data.reduce((acc, curr) => {
  const date = curr.Date;

  if (/^[0-9]{2}-[a-z,A-Z]{3}-[0-9]{4}$/.test(date)) {
    curr.Date = date;
  } else if (/^[0-9]{2}-[a-z,A-Z]{3}$/.test(date)) {
    if (hasCrossYear) {
      curr.Date = date.includes('Jan') ? `${date}-${year}` : `${date}-${year - 1}`;
    } else {
      curr.Date = `${date}-${year}`;
    }
  }

  const entry = acc.has(curr.Date) ? acc.get(curr.Date) : new Map();
  entry.set(curr.POA_NAME16, curr);
  acc.set(curr.Date, entry);

  return acc;
}, store);

const mergeTests = async (testUrl, baseTestsUrl) => {
  const tests = await download(testUrl).then(JSON.parse);
  const baseTests = await download(baseTestsUrl).then(JSON.parse);

  baseTests.data = baseTests.data
    .filter((item) => {
      return item.Date.substring(3) !== 'Dec-2022';
    });

  const hasJanuary = tests.data.filter((item) => item.Date.substring(3) === 'Jan').length > 0;
  const hasDecember = tests.data.filter((item) => item.Date.substring(3) === 'Dec').length > 0;
  const hasCrossYear = hasJanuary && hasDecember;

  const store = arrangeByDate(baseTests, new Map(), currentYear, false);
  arrangeByDate(tests, store, currentYear, hasCrossYear);

  const maps = [...store.values()]
    .map((item) => [...item.values()])
    .flat();

  maps.sort(sort);

  return {
    data: maps
  };
};

const mergeCases = async (casesUrl, baseCasesUrl, activeCasesUrl) => {
  const cases = await download(casesUrl).then(JSON.parse);
  const baseCases = await download(baseCasesUrl).then(JSON.parse);
  const activeCases = await download(activeCasesUrl).then(JSON.parse);

  baseCases.data = baseCases.data
    .filter((item) => {
      return item.Date.substring(3) !== 'Dec-2022';
    });

  const hasJanuary = cases.data.filter((item) => item.Date.substring(3) === 'Jan').length > 0;
  const hasDecember = cases.data.filter((item) => item.Date.substring(3) === 'Dec').length > 0;
  const hasCrossYear = hasJanuary && hasDecember;

  const caseStore = arrangeByDate(cases, new Map(), currentYear, hasCrossYear);
  const mergedCases = arrangeByDate(baseCases, caseStore, currentYear, false);

  activeCases.data.forEach((activeCase) => {
    Object.keys(activeCase).forEach((activeCaseKey) => {
      if (activeCaseKey === 'POA_NAME16') {
        return;
      }

      if (daysMap.has(activeCaseKey)) {
        const dateKey = daysMap.get(activeCaseKey);

        if (mergedCases.has(dateKey)) {
          const casesByDate = mergedCases.get(dateKey);

          if (casesByDate.has(activeCase.POA_NAME16)) {
            const caseItem = casesByDate.get(activeCase.POA_NAME16);
            const active = activeCase[activeCaseKey];
            caseItem.Recovered = caseItem.Cases - (active + caseItem.Deaths);
          }
        }
      }
    });
  });

  const maps = [...mergedCases.values()]
    .map((item) => [...item.values()])
    .flat();

  maps.sort(sort);

  return {
    data: maps
  };
};

const run = async (baseDir) => {
  const population = await download(`${baseDataURL}/population.json`);
  const postCodes = await download(`${baseDataURL}/nswpostcodes_final.json`);

  await writeFile(path.resolve(baseDir, `${baseSaveDataFolder}/population.json`), population);
  await writeFile(path.resolve(baseDir, `${baseSaveDataFolder}/post-codes.json`), postCodes);

  console.log('complete writing base files');

  const cases = await mergeCases(
    `${baseDataURL}/data_cases2.json`,
    `${baseDataStoreURL}/cases-total.json`,
    `${baseDataURL}/active_cases.json`
  );

  await writeFile(
    path.resolve(baseDir, `${baseSaveDataFolder}/cases-total.json`),
    JSON.stringify(cases)
  );

  console.log('complete writing case: ', cases.data[cases.data.length - 1].Date);

  const resultTests = await mergeTests(
    `${baseDataURL}/data_tests.json`,
    `${baseDataStoreURL}/tests-total.json`,
  );

  await writeFile(
    path.resolve(baseDir, `${baseSaveDataFolder}/tests-total.json`),
    JSON.stringify(resultTests)
  );

  console.log('complete writing tests ', resultTests.data[resultTests.data.length - 1].Date);

  process.exit();
};

module.exports = {
  execute: (baseDir) => {
    run(baseDir);
    console.log('Loading ...');
  }
};
