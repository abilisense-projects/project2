import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { YOUR_LOCATIONIQ_API_KEY, ISRAEL_CENTER_LAN, ISRAEL_CENTER_LON } from '@env'



const MapComponent = ({alerts}) => {
  const [markers, setMarkers] = useState([]);
  const [mapCenter, setMapCenter] = useState([ISRAEL_CENTER_LAN, ISRAEL_CENTER_LON]); // Default center (Center of Israel)

  useEffect(() => {
    const fetchCoordinates = async () => {
      console.log(ISRAEL_CENTER_LAN, ISRAEL_CENTER_LON)
      const newMarkers = [];

      for (const { location, level, distressDescription } of alerts) 
        {
        try {
          const response = await axios.get(
            `https://us1.locationiq.com/v1/search.php?key=${YOUR_LOCATIONIQ_API_KEY}&q=${encodeURIComponent(
             location["city"],location['street']
            )}&format=json`
          );
           console.log(level)

          const { lat, lon } = response.data[0];
          newMarkers.push({ lat, lon, title: distressDescription, level });

          // Update center after each marker is loaded
          const avgLat = newMarkers.reduce((sum, marker) => sum + marker.lat, 0) / newMarkers.length;
          const avgLon = newMarkers.reduce((sum, marker) => sum + marker.lon, 0) / newMarkers.length;
          setMapCenter([avgLat, avgLon]);

          // Update markers state
          setMarkers(newMarkers);
        } catch (error) {
          console.error(`Error geocoding location: ${location}`, error);
        }
      }
    };

    fetchCoordinates();
  }, [alerts]); // Empty dependency array to run the effect only once

  const getMarkerIcon = (level) => {
    const colors = {
      Hard: 'red',
      Medium: 'orange',
      Easy: 'green',
      default: 'blue', // Default color if level is not recognized
    };
  
    const color = colors[level] || colors.default;
  
    return new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  };
  

  return (
    <MapContainer
      style={{ height: '100vh', width: '100%' }}
      center={mapCenter}
      zoom={8} // Adjust the initial zoom level as needed
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.lat, marker.lon]}
          icon={getMarkerIcon(marker.level)}
        >
          <Popup>
            <div>
              <strong>{marker.title}</strong>
              <p>{marker.location}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
