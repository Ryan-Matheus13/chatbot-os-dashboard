/* eslint-disable @typescript-eslint/no-explicit-any */
import GoogleMapReact from "google-map-react";
import { useState } from "react";
import renderPins from "./RenderPins";
import { Popover } from "@mui/material";
import CarouselComponent from "../Carousel/Carousel";

import styles from "./Map.module.css";

// import PinOrange from "../../../assets/limpeza_publica.svg"
// import PinYellow from "../../../assets/iluminacao_publica.svg"
// import PersonPinIcon from "@mui/icons-material/PersonPin";

const locations = [
  {
    lat: -5.059215,
    lng: -42.7928496,
    category: "Manutenção Urbana",
    title: "Local 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, alias doloribus culpa illo soluta repudiandae dolorem? Porro, consequatur natus enim deserunt, debitis voluptatibus odio, laudantium nisi nulla unde perferendis nihil?",
    photos: [
      "https://firebasestorage.googleapis.com/v0/b/chatbot-maps-b8f0c.appspot.com/o/rua-aurea-freire.JPG.1500x1000_q85_crop.webp?alt=media&token=12e60b2b-30c3-40ae-a863-9420b0028960",
      "https://firebasestorage.googleapis.com/v0/b/chatbot-maps-b8f0c.appspot.com/o/whatsapp-image-2024-02-23-at-16_e6cbacedf7387c85bfae7d0852e0cbc2d4139d2a.jpeg?alt=media&token=3bbee402-2991-4be6-8007-e6ec43d6a5bb",
    ],
  },
  {
    lat: -5.1058647,
    lng: -42.8197988,
    category: "Limpeza Pública",
    title: "Local 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, alias doloribus culpa illo soluta repudiandae dolorem? Porro, consequatur natus enim deserunt, debitis voluptatibus odio, laudantium nisi nulla unde perferendis nihil?",
    photos: [
      "https://firebasestorage.googleapis.com/v0/b/chatbot-maps-b8f0c.appspot.com/o/teresina-ja-aplicou-mais-de-1250-multas-por-descarte-irregular-de-lixo-este-ano1663342576.jpg?alt=media&token=d6da6042-5a84-4072-a89f-c16cfd350888",
      "https://firebasestorage.googleapis.com/v0/b/chatbot-maps-b8f0c.appspot.com/o/whatsapp-image-2024-02-23-at-16_e6cbacedf7387c85bfae7d0852e0cbc2d4139d2a.jpeg?alt=media&token=3bbee402-2991-4be6-8007-e6ec43d6a5bb",
    ],
  },
  {
    lat: -5.071883,
    lng: -42.804559,
    category: "Manutenção Urbana",
    title: "Local 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, alias doloribus culpa illo soluta repudiandae dolorem? Porro, consequatur natus enim deserunt, debitis voluptatibus odio, laudantium nisi nulla unde perferendis nihil?",
    photos: [
      "https://firebasestorage.googleapis.com/v0/b/chatbot-maps-b8f0c.appspot.com/o/whatsapp-image-2022-01-12-at-11.22.20.webp?alt=media&token=259dba97-0a95-4490-abe7-bf9b856dfcb7",
      "https://firebasestorage.googleapis.com/v0/b/chatbot-maps-b8f0c.appspot.com/o/whatsapp-image-2024-02-23-at-16_e6cbacedf7387c85bfae7d0852e0cbc2d4139d2a.jpeg?alt=media&token=3bbee402-2991-4be6-8007-e6ec43d6a5bb",
    ],
  },
  {
    lat: -5.0987516,
    lng: -42.7459108,
    category: "Iluminação Pública",
    title: "Local 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, alias doloribus culpa illo soluta repudiandae dolorem? Porro, consequatur natus enim deserunt, debitis voluptatibus odio, laudantium nisi nulla unde perferendis nihil?",
    photos: [
      "https://firebasestorage.googleapis.com/v0/b/chatbot-maps-b8f0c.appspot.com/o/whatsapp-image-2024-02-23-at-16_e6cbacedf7387c85bfae7d0852e0cbc2d4139d2a.jpeg?alt=media&token=3bbee402-2991-4be6-8007-e6ec43d6a5bb",
      "https://firebasestorage.googleapis.com/v0/b/chatbot-maps-b8f0c.appspot.com/o/whatsapp-image-2024-02-23-at-16_e6cbacedf7387c85bfae7d0852e0cbc2d4139d2a.jpeg?alt=media&token=3bbee402-2991-4be6-8007-e6ec43d6a5bb",
    ],
  },
];

export default function Map(props: any) {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [anchorPosition, setAnchorPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleMarkerClick = (location: any, event: any) => {
    setSelectedLocation(location);
    const { clientX, clientY } = event.domEvent;
    setAnchorPosition({ x: clientX + 30, y: clientY });
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
        defaultCenter={
          props.onlyOneMarker
            ? { lat: props.onlyOneMarker.lat, lng: props.onlyOneMarker.lng }
            : { lat: locations[0]?.lat, lng: locations[0]?.lng }
        }
        defaultZoom={props.zoom}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }: any) => {
          if (props.onlyOneMarker) {
            renderPins(
              map,
              maps,
              (loc: any, event: any) => handleMarkerClick(loc, event),
              props.onlyOneMarker
            );
          } else {
            locations.forEach((location) => {
              renderPins(
                map,
                maps,
                (loc: any, event: any) => handleMarkerClick(loc, event),
                location
              );
            });
          }
        }}
      />

      <Popover
        open={!!selectedLocation}
        onClose={() => setSelectedLocation(null)}
        anchorReference="anchorPosition"
        anchorPosition={
          anchorPosition
            ? { top: anchorPosition.y, left: anchorPosition.x }
            : undefined
        }
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className={styles.popoverContainer}>
          <div className={styles.popoverImage}>
            <CarouselComponent
              images={selectedLocation ? selectedLocation.photos : []}
            />
          </div>
          <div className={styles.popoverContent}>
            <h2 className={styles.popoverTitle}>{selectedLocation?.title}</h2>
            <p className={styles.popoverDescription}>
              {selectedLocation?.description}
            </p>
          </div>
        </div>
      </Popover>
    </div>
  );
}
