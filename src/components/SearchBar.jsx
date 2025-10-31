import React, { useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

function SearchBar({ setMarkerPosition, onLocationSelect }) {
  const map = useMap();
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (!query) return;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      const latlng = L.latLng(lat, lon);
      map.setView(latlng, 13);
      setMarkerPosition(latlng);
      onLocationSelect(latlng.lat, latlng.lng);
    }
  };

  return (
    <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000, background: 'white', padding: '5px', borderRadius: '5px' }}>
      <input
        type="text"
        placeholder="Search location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginRight: '5px' }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;
