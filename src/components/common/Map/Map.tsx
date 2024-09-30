/* eslint-disable @typescript-eslint/no-explicit-any */
// Map.tsx
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import GoogleMapReact from "google-map-react";
import { useState } from "react";
import renderPins from "./RenderPins";

const locations = [
  {
    lat: -5.059215,
    lng: -42.7928496,
    title: "Local 1",
    description: "Descrição do Local 1",
    photos: ["https://images.unsplash.com/photo-1672422115231-c9f5b65da5cb?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1672422115231-c9f5b65da5cb?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
  },
  {
    lat: -5.1058647,
    lng: -42.8197988,
    title: "Local 2",
    description: "Descrição do Local 2",
    photos: ["https://images.unsplash.com/photo-1672422115231-c9f5b65da5cb?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "https://images.unsplash.com/photo-1672422115231-c9f5b65da5cb?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
  },
  // ... (adicionar outros locais)
];

export default function Map(props: any) {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const handleMarkerClick = (location: any) => {
    setSelectedLocation(location);
  };

  const createMapOptions = () => ({
  panControl: true,
  mapTypeControl: true,
  scrollwheel: true,
  disableDefaultUI: true,
  fullscreenControl: true,
  zoomControl: true,
  draggable: true,
});


  return (
    <div className="map">
      <GoogleMapReact
        options={createMapOptions}
        bootstrapURLKeys={{ key: import.meta.env.VITE_MAP_KEY }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }: any) => {
          locations.forEach((location) => {
            renderPins(map, maps, handleMarkerClick, location);
          });
        }}
      />

      {/* Modal que exibe as informações da localização */}
      <Modal
        open={!!selectedLocation}
        onClose={() => setSelectedLocation(null)}
      >
        <Box
          sx={{
            p: 4,
            bgcolor: "white",
            borderRadius: "8px",
            maxWidth: "400px",
            margin: "auto",
            mt: "20%",
          }}
        >
          {selectedLocation && (
            <>
              <h2>{selectedLocation.title}</h2>
              <p>{selectedLocation.description}</p>
              {selectedLocation.photos.map((photo: string, index: number) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Foto ${index + 1}`}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              ))}
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
