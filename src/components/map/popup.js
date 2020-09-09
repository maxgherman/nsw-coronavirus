import React, { useState } from 'react';
import { Popup as MapPopup } from 'react-map-gl';
import PropTypes from 'prop-types';

export const usePopup = (getPropKeys) => {
  const [popup, setPopup] = useState({
    show: false,
    latitude: undefined,
    longitude: undefined,
    suburb: undefined,
    total: undefined,
    tested: undefined,
    active: undefined,
    recovered: undefined,
    dead: undefined,
    population: undefined
  });

  const changePopup = (features, [longitude, latitude]) => {
    if (!features || features.length <= 0 || !features[0].properties.POA_NAME16) {
      setPopup({ ...popup, show: false });
      return;
    }

    const suburbs = features[0].properties.suburbName.split(',');
    const suburb = suburbs.slice(0, Math.min(3, suburbs.length)).join(', ');
    const { population } = features[0].properties;

    const { properties } = features[0];
    const propertyKeys = getPropKeys();
    const total = properties[propertyKeys.totalKey];
    const tested = properties[propertyKeys.testsKey];
    const active = properties[propertyKeys.activeKey];
    const recovered = properties[propertyKeys.recoveredKey];
    const dead = properties[propertyKeys.deadKey];

    setPopup({
      ...popup,
      show: true,
      longitude,
      latitude,
      suburb,
      total,
      tested,
      active,
      recovered,
      dead,
      population
    });
  };

  return [popup, changePopup];
};

export const Popup = ({
  latitude,
  longitude,
  suburb,
  total,
  active,
  recovered,
  tested,
  dead,
  population
}) => (
  <MapPopup
    latitude={latitude}
    longitude={longitude}
    closeButton={false}
    closeOnClick={false}
  >
    <div>
      <strong>{suburb}</strong>
      <br />
      <span>
        {'Total: '}
        {total}
      </span>
      <br />
      <span>
        {'Active: '}
        {active}
      </span>
      <br />
      <span>
        {'Recovered: '}
        {recovered}
      </span>
      <br />
      <span>
        {'Tested: '}
        {tested}
      </span>
      <br />
      <span>
        {'Dead: '}
        {dead}
      </span>
      <br />
      <span>
        {'Population: '}
        {population}
      </span>
    </div>
  </MapPopup>
);

Popup.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  suburb: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  active: PropTypes.number.isRequired,
  recovered: PropTypes.number.isRequired,
  tested: PropTypes.number.isRequired,
  dead: PropTypes.number.isRequired,
  population: PropTypes.number.isRequired
};
