import React, { useEffect, useState } from 'react';
import MapboxGL from '@rnmapbox/maps';
import mapboxSdk from '@mapbox/mapbox-sdk';
import geocoding from '@mapbox/mapbox-sdk/services/geocoding';

const MAPBOX_TOKEN = 'YOUR_MAPBOX_ACCESS_TOKEN'; // Replace with your Mapbox access token
const baseClient = mapboxSdk({ accessToken: MAPBOX_TOKEN });
const geocodeClient = geocoding(baseClient);

const MapComponent = ({ alerts }) => {

  const [mapCenter, setMapCenter] = useState([ISRAEL_CENTER_LON, ISRAEL_CENTER_LAN]);
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const newAnnotations = [];

      for (const alert of alerts) {
        const { location } = alert;
        try {
          const response = await geocodeClient.forwardGeocode({
            query: `${location.city}, ${location.street}`,
            limit: 1
          }).send();

          if (response && response.body && response.body.features && response.body.features.length > 0) {
            const feature = response.body.features[0];
            const coordinates = feature.center; // Mapbox returns [lon, lat]

            newAnnotations.push({
              id: `pointAnnotation${newAnnotations.length}`,
              coordinates,
              title: alert.distressDescription,
              level: alert.level,
            });
          }
        } catch (error) {
          console.error(`Error geocoding location: ${location}`, error);
        }
      }

      setAnnotations(newAnnotations);
      // Optionally, update map center based on new annotations
    };

    fetchCoordinates();
  }, [alerts]);

  return (
    <MapboxGL.MapView style={{ flex: 1 }}>
      <MapboxGL.Camera
        zoomLevel={8}
        centerCoordinate={mapCenter}
        animationMode={'flyTo'}
        animationDuration={0}
      />
      {annotations.map(annotation => (
        <MapboxGL.PointAnnotation
          key={annotation.id}
          id={annotation.id}
          coordinate={annotation.coordinates}
        >
          <MapboxGL.Callout title={annotation.title} />
        </MapboxGL.PointAnnotation>
      ))}
    </MapboxGL.MapView>
  );
};

export default MapComponent;
