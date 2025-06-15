

import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from '@react-google-maps/api';
import '../Components/Gmap.css';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const locations = [
  {
    id: 1,
    name: 'Dwarakanagar , Nagalapuram',
    coords: { lat: 13.369641, lng: 79.792923 },
    location: 'Andhra Pradesh',
    area: '20 Yakker',
    address: '123 Temple Street, Tirupati, AP, India',
    price: '₹75,00,000',
    face: 'East',
    pinColor: 'blue',
    images: ['/images/Dwarakanagar_Land.png'],
  },
  {
    id: 2,
    name: 'Kaliambakam',
    coords: { lat: 13.341591, lng: 79.702474 },
    location: 'Andhra Pradesh',
    area: '1800 sq.ft',
    address: '456 Marina Street, Chennai, TN, India',
    price: '₹85,00,000',
    face: 'East',
    pinColor: 'red',
    images: ['/images/sami_Reddy_candriga.png'],
  },
  {
    id: 3,
    name: 'Pannur',
    coords: { lat: 13.328510, lng: 79.713464 },
    location: 'Bengaluru, Karnataka',
    area: '2000 sq.ft',
    address: '789 MG Road, Bengaluru, KA, India',
    price: '₹95,00,000',
    face: 'East',
    pinColor: 'red',
    images: ['/images/Pannur_Land.png'],
  },
  {
    id: 4,
    name: 'Baitakodiambedu',
    coords: { lat: 13.370457, lng: 79.814008 },
    location: 'Bengaluru, Karnataka',
    area: '2000 sq.ft',
    address: '789 MG Road, Bengaluru, KA, India',
    price: '₹95,00,000',
    face: 'East',
    pinColor: 'red',
    images: ['/images/Baitakodiambedu_Land.png'],
  },
];

const mapOptions = {
  mapTypeId: 'satellite',
};

export default function TirupatiMap() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBl9qu_OpBnf6OXVe7saf1nagsBrGIi6so', 
  });

  const [activeMarkerId, setActiveMarkerId] = useState(null);
  const [fullImageIndex, setFullImageIndex] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  const handleMarkerClick = (id) => {
    setActiveMarkerId(id);
    setFullImageIndex(null);
  };

  const handleMapClick = () => {
    setActiveMarkerId(null);
    setFullImageIndex(null);
  };

  const handleMapLoad = (map) => {
    setMapInstance(map);

    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach((loc) => bounds.extend(loc.coords));
    map.fitBounds(bounds);
  };

  useEffect(() => {
    const handleResize = () => {
      if (mapInstance) {
        window.google.maps.event.trigger(mapInstance, 'resize');
        const bounds = new window.google.maps.LatLngBounds();
        locations.forEach((loc) => bounds.extend(loc.coords));
        mapInstance.fitBounds(bounds);
      }
    };

    document.addEventListener('fullscreenchange', handleResize);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('fullscreenchange', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, [mapInstance]);

  const currentLocation = locations.find((loc) => loc.id === activeMarkerId);
  const images = currentLocation?.images || [];

  const handleNext = () => {
    if (!images.length || fullImageIndex === null) return;
    setFullImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    if (!images.length || fullImageIndex === null) return;
    setFullImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={mapOptions}
        onClick={handleMapClick}
        onLoad={handleMapLoad}
      >
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={loc.coords}
            icon={{
              url: `https://maps.google.com/mapfiles/ms/icons/${loc.pinColor}-dot.png`,
              scaledSize: new window.google.maps.Size(50, 50),
            }}
            onClick={() => handleMarkerClick(loc.id)}
          />
        ))}

        {activeMarkerId && (
          <InfoWindow
            position={currentLocation.coords}
            onCloseClick={() => setActiveMarkerId(null)}
          >
            <div className="info-card" onClick={(e) => e.stopPropagation()}>
              <h3>{currentLocation.name}</h3>
              <p><strong>Location:</strong> {currentLocation.location}</p>
              <p><strong>Area:</strong> {currentLocation.area}</p>
              <p><strong>Address:</strong> {currentLocation.address}</p>
              <p><strong>Price:</strong> {currentLocation.price}</p>
              <p><strong>Face:</strong> {currentLocation.face}</p>
              <div className="image-row">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Preview ${i + 1}`}
                    className="preview-image"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFullImageIndex(i);
                    }}
                  />
                ))}
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {fullImageIndex !== null && images[fullImageIndex] && (
        <div className="fullscreen-overlay" onClick={() => setFullImageIndex(null)}>
          <div className="fullscreen-inner" onClick={(e) => e.stopPropagation()}>
            <button className="nav-btn left" onClick={handlePrev}>‹</button>
            <img
              src={images[fullImageIndex]}
              alt="Full View"
              className="fullscreen-image"
            />
            <button className="nav-btn right" onClick={handleNext}>›</button>
          </div>
        </div>
      )}
    </>
  );
}





