import React from 'react';
import { colors } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Grid } from './grid';
import { Chart } from './chart';
import { useResize } from './resizeHook';

export const ChartGrid = ({ data }) => {
  const [width] = useResize();
  const tileWidth = width / 5;

  return (
    <Grid>
      <div className="grid-item population-cases" style={{ width: tileWidth }}>
        <Chart
          data={data}
          selector={(x) => x.population.cases}
          backgroundColor={colors.indigo[500]}
        />
      </div>
      <div className="grid-item population-active" style={{ width: tileWidth }}>
        <Chart
          data={data}
          selector={(x) => x.population.active}
          backgroundColor={colors.indigo[500]}
        />
      </div>
      <div className="grid-item population-recovered" style={{ width: tileWidth }}>
        <Chart
          data={data}
          selector={(x) => x.population.recovered}
          backgroundColor={colors.indigo[500]}
        />
      </div>
      <div className="grid-item population-tests" style={{ width: tileWidth }}>
        <Chart
          data={data}
          selector={(x) => x.population.tests}
          backgroundColor={colors.indigo[500]}
        />
      </div>

      <div className="grid-item cases-population" style={{ width: tileWidth }}>
        <Chart
          data={data}
          selector={(x) => x.cases.population}
          backgroundColor={colors.red[500]}
        />
      </div>
      <div className="grid-item cases-active" style={{ width: tileWidth }}>
        <Chart
          data={data}
          selector={(x) => x.cases.active}
          backgroundColor={colors.red[500]}
        />
      </div>
      <div className="grid-item cases-recovered" style={{ width: tileWidth }}>
        <Chart
          data={data}
          selector={(x) => x.cases.recovered}
          backgroundColor={colors.red[500]}
        />
      </div>
      <div className="grid-item cases-tests" style={{ width: tileWidth }}>
        <Chart
          data={data}
          selector={(x) => x.cases.tests}
          backgroundColor={colors.red[500]}
        />
      </div>

      <div className="grid-item active-population" style={{ width: tileWidth }}>
        <Chart
          data={data}
          selector={(x) => x.active.population}
          backgroundColor={colors.red[900]}
        />
      </div>
      <div className="grid-item active-cases" style={{ width: tileWidth }}>
        <Chart
          data={data}
          selector={(x) => x.active.cases}
          backgroundColor={colors.red[900]}
        />
      </div>
      <div className="grid-item active-recovered" style={{ width: tileWidth }}>
        <Chart
          data={data}
          selector={(x) => x.active.recovered}
          backgroundColor={colors.red[900]}
        />
      </div>
      <div className="grid-item active-tests" style={{ width: tileWidth }}>
        <Chart
          data={data}
          selector={(x) => x.active.tests}
          backgroundColor={colors.red[900]}
        />
      </div>

      <div className="grid-item recovered-population" style={{ width: tileWidth }}>
        <Chart
          data={data}
          selector={(x) => x.recovered.population}
          backgroundColor={colors.green[700]}
        />
      </div>

      <div className="grid-item recovered-cases" style={{ width: tileWidth }}>
        <Chart
          data={data}
          selector={(x) => x.recovered.cases}
          backgroundColor={colors.green[700]}
        />
      </div>
      <div className="grid-item recovered-active" style={{ width: tileWidth }}>
        <Chart
          data={data}
          selector={(x) => x.recovered.active}
          backgroundColor={colors.green[700]}
        />
      </div>
      <div className="grid-item recovered-tests" style={{ width: tileWidth }}>
        <Chart
          data={data}
          selector={(x) => x.recovered.tests}
          backgroundColor={colors.green[700]}
        />
      </div>

      <div className="grid-item tests-population" style={{ width: tileWidth }}>
        <Chart
          data={data}
          selector={(x) => x.tests.population}
          backgroundColor={colors.indigo[700]}
        />
      </div>
      <div className="grid-item tests-cases" style={{ width: tileWidth }}>
        <Chart
          data={data}
          selector={(x) => x.tests.cases}
          backgroundColor={colors.indigo[700]}
        />
      </div>
      <div className="grid-item tests-active" style={{ width: tileWidth }}>
        <Chart
          data={data}
          selector={(x) => x.tests.active}
          backgroundColor={colors.indigo[700]}
        />
      </div>
      <div className="grid-item tests-recovered" style={{ width: tileWidth }}>
        <Chart
          data={data}
          selector={(x) => x.tests.recovered}
          backgroundColor={colors.indigo[700]}
        />
      </div>
    </Grid>
  );
};

ChartGrid.propTypes = {
  data: PropTypes.object.isRequired,
};
