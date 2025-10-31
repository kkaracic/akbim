import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useState } from 'react';

function SimpleMap() {
  const [position, setPosition] = useState([43.85, 18.35]); // Sarajevo

  return (
    <MapContainer center={position} zoom={6} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={position} />
    </MapContainer>
  );
}

export default SimpleMap;
