import React from 'react';
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MiniRouteMap = ({ path, busLocation, routeColor }) => {
  if (!path || path.length === 0) return null;

  const center = path[0];
  
  const busIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448339.png',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  return (
    <div className="w-32 h-32 rounded-xl overflow-hidden border border-white/10 shrink-0 shadow-lg">
      <MapContainer 
        center={[center.lat, center.lng]} 
        zoom={11} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        dragging={false}
        touchZoom={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Polyline
          positions={path.map(p => [p.lat, p.lng])}
          color={routeColor || "#3b82f6"}
          weight={3}
        />
        {busLocation && (
          <Marker position={[busLocation.lat, busLocation.lng]} icon={busIcon} />
        )}
      </MapContainer>
    </div>
  );
};

export default MiniRouteMap;
