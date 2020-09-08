export const caseLevels = [{
  start: 0,
  end: 9,
  key: 9
}, {
  start: 10,
  end: 19,
  key: 19
}, {
  start: 20,
  end: 29,
  key: 29
}, {
  start: 30,
  end: 39,
  key: 39
}, {
  start: 40,
  end: 49,
  key: 49
}, {
  start: 50,
  key: 500
}];

export const testLevels = [{
  start: 0,
  end: 250,
  key: 250
}, {
  start: 251,
  end: 499,
  key: 500
}, {
  start: 500,
  end: 999,
  key: 1000
}, {
  start: 1000,
  end: 1999,
  key: 2000
}, {
  start: 2000,
  end: 2999,
  key: 3000
}, {
  start: 3000,
  key: 3000000
}];

export const activeLevels = [{
  start: 1,
  end: 2,
  key: 2
}, {
  start: 3,
  end: 7,
  key: 7
}, {
  start: 8,
  end: 20,
  key: 20
}, {
  start: 21,
  end: 50,
  key: 50
}, {
  start: 51,
  key: 51
}];

export const recoveredLevels = [{
  start: 0,
  end: 2,
  key: 2
}, {
  start: 3,
  end: 7,
  key: 7
}, {
  start: 8,
  end: 20,
  key: 20
}, {
  start: 21,
  end: 50,
  key: 50
}, {
  start: 51,
  key: 51
}];

export const bagKeys = (date) => ({
  testsKey: `${date}-tests`,
  activeKey: `${date}-active`,
  totalKey: `${date}-total`,
  rangeTestsKey: `${date}-testRange`,
  rangeActiveKey: `${date}-activeRange`,
  rangeRecoveredKey: `${date}-recoveredRange`,
  recoveredKey: `${date}-recovered`,
  deadKey: `${date}-dead`
});
