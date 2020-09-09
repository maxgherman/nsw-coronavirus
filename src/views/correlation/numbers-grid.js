import React, { useMemo } from 'react';
import { sampleCorrelation } from 'simple-statistics';
import PropTypes from 'prop-types';
import { Grid } from './grid';

const Cell = ({ data, selector }) => {
  const dataSlice = selector(data);

  const value = useMemo(() => {
    return sampleCorrelation(
      dataSlice.map((item) => item.x),
      dataSlice.map((item) => item.y)
    )
      .toFixed(5);
  }, [dataSlice]);

  if (isNaN(value)) {
    return null;
  }

  return (
    <span className="number-box">
      {value}
    </span>
  );
};

Cell.propTypes = {
  data: PropTypes.object.isRequired,
  selector: PropTypes.func.isRequired
};

export const NumbersGrid = ({ data }) => {
  return (
    <Grid>
      <div className="population-cases">
        <Cell data={data} selector={(x) => x.population.cases} />
      </div>
      <div className="population-active">
        <Cell data={data} selector={(x) => x.population.active} />
      </div>
      <div className="population-recovered">
        <Cell data={data} selector={(x) => x.population.recovered} />
      </div>
      <div className="population-tests">
        <Cell data={data} selector={(x) => x.population.tests} />
      </div>

      <div className="cases-population">
        <Cell data={data} selector={(x) => x.cases.population} />
      </div>
      <div className="cases-active">
        <Cell data={data} selector={(x) => x.cases.active} />
      </div>
      <div className="cases-recovered">
        <Cell data={data} selector={(x) => x.cases.recovered} />
      </div>
      <div className="cases-tests">
        <Cell data={data} selector={(x) => x.cases.tests} />
      </div>

      <div className="active-population">
        <Cell data={data} selector={(x) => x.active.population} />
      </div>
      <div className="active-cases">
        <Cell data={data} selector={(x) => x.active.cases} />
      </div>
      <div className="active-recovered">
        <Cell data={data} selector={(x) => x.active.recovered} />
      </div>
      <div className="active-tests">
        <Cell data={data} selector={(x) => x.active.tests} />
      </div>

      <div className="recovered-population">
        <Cell data={data} selector={(x) => x.recovered.population} />
      </div>

      <div className="recovered-cases">
        <Cell data={data} selector={(x) => x.recovered.cases} />
      </div>
      <div className="recovered-active">
        <Cell data={data} selector={(x) => x.recovered.active} />
      </div>
      <div className="recovered-tests">
        <Cell data={data} selector={(x) => x.recovered.tests} />
      </div>

      <div className="tests-population">
        <Cell data={data} selector={(x) => x.tests.population} />
      </div>
      <div className="tests-cases">
        <Cell data={data} selector={(x) => x.tests.cases} />
      </div>
      <div className="tests-active">
        <Cell data={data} selector={(x) => x.tests.active} />
      </div>
      <div className="tests-recovered">
        <Cell data={data} selector={(x) => x.tests.recovered} />
      </div>
    </Grid>
  );
};

NumbersGrid.propTypes = {
  data: PropTypes.object.isRequired,
};
