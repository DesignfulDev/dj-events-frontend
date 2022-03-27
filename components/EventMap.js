import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Geocode from 'react-geocode';

export default function EventMap({ evt }) {
  const zoom = 15;
  const containerStyle = {
    width: '100%',
    height: '500px',
  };

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({
    lat: 40.712772,
    lng: -73.935242,
  });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY,
  });

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

  useEffect(() => {
    // Get latitude & longitude from address.
    Geocode.fromAddress(evt.attributes.address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        setCenter({ lat, lng });
      },
      error => {
        console.error(error);
      }
    );
  }, [evt]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker key={evt.id} position={{ ...center }} />
    </GoogleMap>
  ) : (
    <></>
  );
}
