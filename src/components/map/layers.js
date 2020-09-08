import React from 'react';
import { Source, Layer } from 'react-map-gl';

import {
  caseLevels, testLevels, activeLevels, bagKeys
} from 'src/components/data';

const getCaseColorSchema = () => ([
  0, 'transparent',
  caseLevels[0].key, '#ffb3b3',
  caseLevels[1].key, '#ff8080',
  caseLevels[2].key, '#ff4d4d',
  caseLevels[3].key, '#e60000',
  caseLevels[4].key, '#b30000',
  caseLevels[5].key, '#660000'
]);

const getTestColorSchema = () => ([
  0, 'transparent',
  testLevels[0].key, '#a6c6ed',
  testLevels[1].key, '#8ab3e6',
  testLevels[2].key, '#6189ba',
  testLevels[3].key, '#4478b8',
  testLevels[4].key, '#326cb3',
  testLevels[5].key, '#1a5cad'
]);

const getActiveColorSchema = () => ([
  0, 'transparent',
  activeLevels[0].key, '#ffb3b3',
  activeLevels[1].key, '#ff8080',
  activeLevels[2].key, '#ff4d4d',
  activeLevels[3].key, '#e60000',
  activeLevels[4].key, '#b30000',
]);

const getRecoveredColorSchema = () => ([
  0, 'transparent',
  activeLevels[0].key, '#a8edbb',
  activeLevels[1].key, '#73de91',
  activeLevels[2].key, '#3aba5e',
  activeLevels[3].key, '#178f39',
  activeLevels[4].key, '#0a6624',
]);

export const layers = {
  casesId: 'PostcodeCases',
  testsId: 'PostcodeTests',
  activeId: 'PostcodeActive',
  recoveredId: 'PostcodeRecovered'
};

export const source = (data, selectedDate) => {
  const { rangeTestsKey, rangeActiveKey, rangeRecoveredKey } = bagKeys(selectedDate);

  return (
    <Source type="geojson" data={data}>
      <Layer
        id="Postcode"
        source="Postcode"
        type="line"
        paint={{
          'line-color': '#bdb8b7',
          'line-width': 1
        }}
      />
      <Layer
        id={layers.testsId}
        source="Postcode"
        type="fill"
        paint={{
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', rangeTestsKey],
            ...getTestColorSchema()
          ],
          'fill-opacity': 0.8
        }}
      />
      <Layer
        id={layers.activeId}
        source="Postcode"
        type="fill"
        paint={{
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', rangeActiveKey],
            ...getActiveColorSchema()
          ],
          'fill-opacity': 0.8
        }}
      />
      <Layer
        id={layers.recoveredId}
        source="Postcode"
        type="fill"
        paint={{
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', rangeRecoveredKey],
            ...getRecoveredColorSchema()
          ],
          'fill-opacity': 0.8
        }}
      />
      <Layer
        id={layers.casesId}
        source="Postcode"
        type="fill"
        paint={{
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', selectedDate],
            ...getCaseColorSchema()
          ],
          'fill-opacity': 0.8
        }}
      />
    </Source>
  );
};

export const swap = (map, mapStyle, mapType) => {
  if (mapStyle === mapType.cases) {
    map.setLayoutProperty(layers.testsId, 'visibility', 'none');
    map.setLayoutProperty(layers.casesId, 'visibility', 'visible');
    map.setLayoutProperty(layers.activeId, 'visibility', 'none');
    map.setLayoutProperty(layers.recoveredId, 'visibility', 'none');
  } else if (mapStyle === mapType.tests) {
    map.setLayoutProperty(layers.testsId, 'visibility', 'visible');
    map.setLayoutProperty(layers.casesId, 'visibility', 'none');
    map.setLayoutProperty(layers.activeId, 'visibility', 'none');
    map.setLayoutProperty(layers.recoveredId, 'visibility', 'none');
  } else if (mapStyle === mapType.active) {
    map.setLayoutProperty(layers.testsId, 'visibility', 'none');
    map.setLayoutProperty(layers.casesId, 'visibility', 'none');
    map.setLayoutProperty(layers.activeId, 'visibility', 'visible');
    map.setLayoutProperty(layers.recoveredId, 'visibility', 'none');
  } else if (mapStyle === mapType.recovered) {
    map.setLayoutProperty(layers.testsId, 'visibility', 'none');
    map.setLayoutProperty(layers.casesId, 'visibility', 'none');
    map.setLayoutProperty(layers.activeId, 'visibility', 'none');
    map.setLayoutProperty(layers.recoveredId, 'visibility', 'visible');
  }
};
