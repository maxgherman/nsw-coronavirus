import React from 'react';
import PropTypes from 'prop-types';
import Geocoder from 'react-map-gl-geocoder';

const getCodeFilter = (item) => {
  if (!item.context) {
    return item;
  }

  if (item.context.length <= 4) {
    return item.context.map((i) => {
      // id is in the form {index}.{id} per https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
      // this example attempts to find the `region` named `New South Wales`
      return (i.id.split('.').shift() === 'region' && i.text === 'New South Wales');
    }).reduce((acc, cur) => {
      return acc || cur;
    });
  }

  return item;
};

export const GeoCoder = ({
  mapRef, containerRef, token, onViewportChange
}) => (
  <Geocoder
    mapRef={mapRef}
    containerRef={containerRef}
    countries="au"
    bbox={[139.965, -38.030, 155.258, -27.839]}
    limit={200}
    onViewportChange={onViewportChange}
    mapboxApiAccessToken={token}
    filter={getCodeFilter}
  />
);

GeoCoder.propTypes = {
  mapRef: PropTypes.any.isRequired,
  containerRef: PropTypes.any.isRequired,
  token: PropTypes.string.isRequired,
  onViewportChange: PropTypes.func.isRequired
};
