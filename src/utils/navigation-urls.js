export const links = Object.freeze({
  dashboard:
  {
    absolute: process.env.PUBLIC_URL,
    path: 'dashboard'
  },
  totals: {
    absolute: `${process.env.PUBLIC_URL}/totals`,
    path: 'totals'
  },
  distribution: {
    absolute: `${process.env.PUBLIC_URL}/distribution`,
    path: 'distribution'
  },
  correlation: {
    absolute: `${process.env.PUBLIC_URL}/correlation`,
    path: 'correlation'
  },
  regression: {
    absolute: `${process.env.PUBLIC_URL}/regression`,
    path: 'regression'
  }
});
