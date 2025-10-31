import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import L from 'leaflet';

function LocationMarker({ markerPosition, setMarkerPosition, onLocationSelect }) {
  useMapEvents({
    click(e) {
      setMarkerPosition(e.latlng);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return markerPosition ? <Marker position={markerPosition} /> : null;
}

function SearchControl({ setMarkerPosition, onLocationSelect }) {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      style: 'bar', // traka za pretragu, ne ikona
      position: 'topleft',
      autoClose: true,
      retainZoomLevel: false,
      searchLabel: 'Search address',
      keepResult: false,
    });

    map.addControl(searchControl);

    map.on('geosearch/showlocation', (result) => {
      const { location } = result;
      const latlng = L.latLng(location.y, location.x);
      setMarkerPosition(latlng);
      onLocationSelect(latlng.lat, latlng.lng);
    });

    return () => {
      map.removeControl(searchControl);
      map.off('geosearch/showlocation');
    };
  }, [map, setMarkerPosition, onLocationSelect]);

  return null;
}

function MapStep({ onLocationSelect }) {
  const [markerPosition, setMarkerPosition] = useState(null);

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={5}
      style={{ height: '400px', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <SearchControl setMarkerPosition={setMarkerPosition} onLocationSelect={onLocationSelect} />
      <LocationMarker
        markerPosition={markerPosition}
        setMarkerPosition={setMarkerPosition}
        onLocationSelect={onLocationSelect}
      />
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
}

export default MapStep;
