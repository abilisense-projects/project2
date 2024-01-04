import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { YOUR_MAPBOX_API_KEY } from "@env";
const MapComponent = () => {
  const addresses = [
    {
      address: "Jerusalem, Israel",
      severity: "high",
      description: "High Severity Issue",
    },
    {
      address: "Tel Aviv, Israel",
      severity: "medium",
      description: "Medium Severity Issue",
    },
    {
      address: "Haifa, Israel",
      severity: "low",
      description: "Low Severity Issue",
    },
    // Add more addresses as needed
  ];

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100vh",
    latitude: 31.0461,
    longitude: 34.8516,
    zoom: 8,
  });

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const newMarkers = [];

      for (const { address, severity, description } of addresses) {
        try {
          const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
              address
            )}.json?access_token=${YOUR_MAPBOX_API_KEY}`
          );

          const { coordinates } = response.data.features[0].geometry;
          newMarkers.push({
            lat: coordinates[1],
            lon: coordinates[0],
            title: description,
            address,
            severity,
          });

          setMarkers(newMarkers);
        } catch (error) {
          console.error(`Error geocoding address: ${address}`, error);
        }
      }
    };

    fetchCoordinates();
  }, []); // Empty dependency array to run the effect only once

  const getMarkerColor = (severity) => {
    switch (severity) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "blue"; // Default color if severity is not recognized
    }
  };

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={YOUR_MAPBOX_API_KEY}
      onViewportChange={(newViewport) => setViewport(newViewport)}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          latitude={marker.lat}
          longitude={marker.lon}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <div style={{ color: getMarkerColor(marker.severity) }}>📍</div>
          <Popup>
            <div>
              <strong>{marker.title}</strong>
              <p>{marker.address}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </ReactMapGL>
  );
};

export default MapComponent;
