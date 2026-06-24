import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle auto-bounding the map
const MapBounds = ({ route }) => {
  const map = useMap();

  useEffect(() => {
    if (route && route.length > 0) {
      const bounds = L.latLngBounds(route.map(loc => [loc.latitude, loc.longitude]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [route, map]);

  return null;
};

const RouteMap = ({ routeData }) => {
  if (!routeData || !routeData.length) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '400px', backgroundColor: 'var(--color-bg-main)', borderRadius: 'var(--radius-md)' }}>
        <p style={{ color: 'var(--color-text-muted)' }}>Generate an optimized route to view it on the map.</p>
      </div>
    );
  }

  // Extract polyline positions from the route sequence
  const polylinePositions = routeData.map(loc => [loc.latitude, loc.longitude]);

  return (
    <MapContainer 
      center={[routeData[0].latitude, routeData[0].longitude]} 
      zoom={13} 
      style={{ height: '100%', width: '100%', minHeight: '400px', borderRadius: 'var(--radius-md)', zIndex: 1 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {routeData.map((loc, index) => (
        <Marker key={loc.id || index} position={[loc.latitude, loc.longitude]}>
          <Popup>
            <div style={{ fontWeight: 'bold' }}>{index + 1}. {loc.name}</div>
            <div>Lat: {loc.latitude}</div>
            <div>Lng: {loc.longitude}</div>
          </Popup>
        </Marker>
      ))}

      <Polyline positions={polylinePositions} color="var(--color-primary-light)" weight={5} opacity={0.8} />
      <MapBounds route={routeData} />
    </MapContainer>
  );
};

export default RouteMap;
