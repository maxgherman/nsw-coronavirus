import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './map.css';

import React, {
  useState, useRef, useContext, useEffect
} from 'react';
import MapGL from 'react-map-gl';
import PropTypes from 'prop-types';
import { bagKeys, DataContext } from 'src/components/data';
import { token } from 'src/utils/map';
import { source, layers, swap } from './layers';
import { GeoCoder } from './geo-coder';
import { usePopup, Popup } from './popup';

const mapType = Object.freeze({
  cases: layers.casesId,
  tests: layers.testsId,
  active: layers.activeId,
  recovered: layers.recoveredId
});

export const selectorData = [{
  key: mapType.cases,
  name: 'Total'
}, {
  key: mapType.active,
  name: 'Active'
}, {
  key: mapType.recovered,
  name: 'Recovered'
}, {
  key: mapType.tests,
  name: 'Tests'
}];

const swapMapStyle = (map, mapStyle) => {
  if (map.isStyleLoaded()) {
    swap(map, mapStyle, mapType);
    return;
  }
  setTimeout(() => { swapMapStyle(map, mapStyle, mapType); }, 200);
};

export const Map = ({ date, mapStyle }) => {
  const { postCodesGeometry } = useContext(DataContext);
  const [viewport, setViewport] = useState({
    zoom: 6,
    latitude: -33.5688,
    longitude: 148.5093
  });
  const mapRef = useRef(null);
  const geoCoderRef = useRef(null);
  const [popup, setPopup] = usePopup(() => bagKeys(date));

  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (map) {
      swapMapStyle(map, mapStyle);
    }
  }, [mapStyle]);

  const handleGeocoderViewportChange = (viewportData) => {
    const geocoderDefaultOverrides = { transitionDuration: 500 };

    return setViewport({
      ...viewportData,
      ...geocoderDefaultOverrides
    });
  };

  const handleClick = (e) => {
    setPopup(e.features || null, e.lngLat);
  };

  if (!postCodesGeometry) {
    return null;
  }

  return (
    <div className="map">
      <div ref={geoCoderRef} className="geocoder" />
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="60vh"
        mapStyle="mapbox://styles/mapbox/streets-v10"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={token}
        onClick={handleClick}
      >
        <GeoCoder
          mapRef={mapRef}
          containerRef={geoCoderRef}
          onViewportChange={handleGeocoderViewportChange}
          token={token}
        />
        {source(postCodesGeometry, date)}
        {popup.show && <Popup {...popup} />}
      </MapGL>
    </div>
  );
};

Map.propTypes = {
  date: PropTypes.string.isRequired,
  mapStyle: PropTypes.string.isRequired
};
