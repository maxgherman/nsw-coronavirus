import { colors } from '@material-ui/core';

export const options = [
  {
    name: 'Population Cases',
    xName: 'Population',
    yName: 'Cases',
    selector: (item) => ({ x: item.population, y: item.cases }),
    backgroundColor: colors.indigo[500]
  },
  {
    name: 'Population Active',
    xName: 'Population',
    yName: 'Active',
    selector: (item) => ({ x: item.population, y: item.active }),
    backgroundColor: colors.indigo[500]
  },
  {
    name: 'Population Recovered',
    xName: 'Population',
    yName: 'Recovered',
    selector: (item) => ({ x: item.population, y: item.recovered }),
    backgroundColor: colors.indigo[500]
  },
  {
    name: 'Population Tests',
    xName: 'Population',
    yName: 'Tests',
    selector: (item) => ({ x: item.population, y: item.tests }),
    backgroundColor: colors.indigo[500]
  },
  {
    name: 'Cases Population',
    xName: 'Cases',
    yName: 'Population',
    selector: (item) => ({ x: item.cases, y: item.population }),
    backgroundColor: colors.red[500]
  },
  {
    name: 'Cases Active',
    xName: 'Cases',
    yName: 'Active',
    selector: (item) => ({ x: item.cases, y: item.active }),
    backgroundColor: colors.red[500]
  },
  {
    name: 'Cases Recovered',
    xName: 'Cases',
    yName: 'Recovered',
    selector: (item) => ({ x: item.cases, y: item.recovered }),
    backgroundColor: colors.red[500]
  },
  {
    name: 'Cases Tests',
    xName: 'Cases',
    yName: 'Tests',
    selector: (item) => ({ x: item.cases, y: item.tests }),
    backgroundColor: colors.red[500]
  },
  {
    name: 'Active Population',
    xName: 'Active',
    yName: 'Population',
    selector: (item) => ({ x: item.active, y: item.population }),
    backgroundColor: colors.red[900]
  },
  {
    name: 'Active Cases',
    xName: 'Active',
    yName: 'Cases',
    selector: (item) => ({ x: item.active, y: item.cases }),
    backgroundColor: colors.red[900]
  },
  {
    name: 'Active Recovered',
    xName: 'Active',
    yName: 'Recovered',
    selector: (item) => ({ x: item.active, y: item.recovered }),
    backgroundColor: colors.red[900]
  },
  {
    name: 'Active Tests',
    xName: 'Active',
    yName: 'Tests',
    selector: (item) => ({ x: item.active, y: item.tests }),
    backgroundColor: colors.red[900]
  },
  {
    name: 'Recovered Population',
    xName: 'Recovered',
    yName: 'Population',
    selector: (item) => ({ x: item.recovered, y: item.population }),
    backgroundColor: colors.green[700]
  },
  {
    name: 'Recovered Cases',
    xName: 'Recovered',
    yName: 'Cases',
    selector: (item) => ({ x: item.recovered, y: item.cases }),
    backgroundColor: colors.green[700]
  },
  {
    name: 'Recovered Active',
    xName: 'Recovered',
    yName: 'Active',
    selector: (item) => ({ x: item.recovered, y: item.active }),
    backgroundColor: colors.green[700]
  },
  {
    name: 'Recovered Tests',
    xName: 'Recovered',
    yName: 'Tests',
    selector: (item) => ({ x: item.recovered, y: item.tests }),
    backgroundColor: colors.green[700]
  },
  {
    name: 'Tests Population',
    xName: 'Tests',
    yName: 'Population',
    selector: (item) => ({ x: item.tests, y: item.population }),
    backgroundColor: colors.indigo[700]
  },
  {
    name: 'Tests Cases',
    xName: 'Tests',
    yName: 'Cases',
    selector: (item) => ({ x: item.tests, y: item.cases }),
    backgroundColor: colors.indigo[700]
  },
  {
    name: 'Tests Active',
    xName: 'Tests',
    yName: 'Active',
    selector: (item) => ({ x: item.tests, y: item.active }),
    backgroundColor: colors.indigo[700]
  },
  {
    name: 'Tests Recovered',
    xName: 'Tests',
    yName: 'Recovered',
    selector: (item) => ({ x: item.tests, y: item.recovered }),
    backgroundColor: colors.indigo[700]
  }
];
