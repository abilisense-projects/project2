import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import mapboxSdk from "@mapbox/mapbox-sdk";
import geocoding from "@mapbox/mapbox-sdk/services/geocoding";
import {
  MAPBOX_API_KEY, // Ensure the Mapbox API key is imported
  ISRAEL_CENTER_LAN,
  ISRAEL_CENTER_LON,
} from "@env";

const MapComponent = ({ alerts }) => {
  const [markers, setMarkers] = useState([]);
  const [mapCenter, setMapCenter] = useState([ISRAEL_CENTER_LAN, ISRAEL_CENTER_LON]); // Default center (Center of Israel)

  const mapboxClient = mapboxSdk({ accessToken: MAPBOX_API_KEY });
  const geocoder = geocoding(mapboxClient);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const newMarkers = [];

      for (const { location, level, distressDescription } of alerts) {
        const search_text = `${location.city}, ${location.street}`;

        try {
          const response = await geocoder.forwardGeocode({
            query: search_text,
            limit: 1
          }).send();

          if (response && response.body && response.body.features && response.body.features.length > 0) {
            const { center } = response.body.features[0]; // Mapbox returns coordinates in [longitude, latitude] format
            const [lon, lat] = center;

            newMarkers.push({ lat, lon, title: distressDescription, level });

            // Update center after each marker is loaded
            const avgLat = newMarkers.reduce((sum, marker) => sum + marker.lat, 0) / newMarkers.length;
            const avgLon = newMarkers.reduce((sum, marker) => sum + marker.lon, 0) / newMarkers.length;
            setMapCenter([avgLat, avgLon]);

            // Update markers state
            setMarkers(newMarkers);
          }
        } catch (error) {
          console.error(`Error geocoding location: ${search_text}`, error);
        }
      }
    };

    fetchCoordinates();
  }, [alerts]); // Dependency array includes alerts to run the effect when alerts change

  const getMarkerIcon = (level) => {
    const colors = {
      Hard: "red",
      Medium: "orange",
      Easy: "green",
      default: "blue", // Default color if level is not recognized
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
      style={{ height: "100%", width: "100%" }}
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
              <p>{`${marker.lat}, ${marker.lon}`}</p> {/* Updated to show lat, lon instead of location object */}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
