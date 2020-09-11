const https = require('https');
const fs = require('fs');
const path = require('path');
const util = require('util');

const dateTimeFormat = new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit' });

const daysMap = [...new Array(14).keys()]
  .reduce((acc, curr) => {
    const date = new Date();
    date.setDate(date.getDate() - curr);
    const dateParts = dateTimeFormat.formatToParts(date);
    const day = dateParts.filter((item) => item.type === 'day')[0];
    const month = dateParts.filter((item) => item.type === 'month')[0];

    acc.set(`Day${curr}`, `${day.value}-${month.value}`);
    return acc;
  }, new Map());

const writeFile = util.promisify(fs.writeFile);

const download = (url) => new Promise((resolve, reject) => {
  let data = '';

  https.get(url, (resp) => {
    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      resolve(data);
    });
  })
    .on('error', (err) => {
      console.log(reject(err));
      process.exit(1);
    });
});

const arrangeByDate = (data, store) => data.data.reduce((acc, curr) => {
  const entry = acc.has(curr.Date) ? acc.get(curr.Date) : new Map();
  entry.set(curr.POA_NAME16, curr);
  acc.set(curr.Date, entry);

  return acc;
}, store);

const mergeTests = async (testUrl, baseTestsUrl) => {
  const tests = await download(testUrl);
  const baseTests = await download(baseTestsUrl);

  const store = arrangeByDate(JSON.parse(baseTests), new Map());
  arrangeByDate(JSON.parse(tests), store);

  const maps = [...store.entries()];

  maps.sort((a, b) => {
    const aDate = new Date(`${a[0]}-2020`);
    const bDate = new Date(`${b[0]}-2020`);

    return aDate > bDate ? 1 : (aDate < bDate ? -1 : 0);
  });

  const result = {
    data: []
  };

  maps.forEach(([_, value]) => {
    ([...value.values()]).forEach((item) => result.data.push(item));
  });

  return result;
};

const mergeCases = async (casesUrl, baseCasesUrl, activeCasesUrl) => {
  const cases = await download(casesUrl).then(JSON.parse);
  const baseCases = await download(baseCasesUrl).then(JSON.parse);
  const activeCases = await download(activeCasesUrl).then(JSON.parse);

  const caseStore = arrangeByDate(cases, new Map());
  const mergedCases = arrangeByDate(baseCases, caseStore);

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
            caseItem.Recovered = caseItem.Cases - active;
          }
        }
      }
    });
  });

  const maps = [...mergedCases.entries()];

  maps.sort((a, b) => {
    const aDate = new Date(`${a[0]}-2020`);
    const bDate = new Date(`${b[0]}-2020`);

    return aDate > bDate ? 1 : aDate < bDate ? -1 : 0;
  });

  const result = {
    data: []
  };

  maps.forEach(([_, value]) => {
    ([...value.values()]).forEach((item) => result.data.push(item));
  });

  return result;
};

const run = async (baseDir) => {
  const population = await download('https://nswdac-covid-19-postcode-heatmap.azurewebsites.net/datafiles/population.json');
  const postCodes = await download('https://nswdac-covid-19-postcode-heatmap.azurewebsites.net/datafiles/nswpostcodes_final.json');

  await writeFile(path.resolve(baseDir, 'build/population.json'), population);
  await writeFile(path.resolve(baseDir, 'build/post-codes.json'), postCodes);

  console.log('complete writing base files');

  const cases = await mergeCases(
    'https://nswdac-covid-19-postcode-heatmap.azurewebsites.net/datafiles/data_cases2.json',
    'https://raw.githubusercontent.com/maxgherman/nsw-coronavirus/gh-pages/cases-total.json',
    'https://nswdac-covid-19-postcode-heatmap.azurewebsites.net/datafiles/active_cases.json'
  );

  await writeFile(
    path.resolve(baseDir, 'build/cases-total.json'),
    JSON.stringify(cases)
  );

  const resultTests = await mergeTests(
    'https://nswdac-covid-19-postcode-heatmap.azurewebsites.net/datafiles/data_tests.json',
    'https://raw.githubusercontent.com/maxgherman/nsw-coronavirus/gh-pages/tests-total.json',
  );

  await writeFile(
    path.resolve(baseDir, 'build/tests-total.json'),
    JSON.stringify(resultTests)
  );

  console.log('complete writing tests');

  process.exit();
};

module.exports = {
  execute: (baseDir) => {
    run(baseDir);
    console.log('Loading ...');
  }
};
