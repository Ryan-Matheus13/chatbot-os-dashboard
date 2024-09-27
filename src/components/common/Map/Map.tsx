/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
// import { Switch } from "@mui/material";
// import "./CustomMap.css";
import PinRed from "../../../assets/manutencao_urbana.svg";
// import PinOrange from "../../../assets/limpeza_publica.svg"
// import PinYellow from "../../../assets/iluminacao_publica.svg"
// import PersonPinIcon from "@mui/icons-material/PersonPin";
const data = [
  { lat: -5.0634595, lng: -42.796352 },
  { lat: -5.0634659, lng: -42.7963735 },
  { lat: -5.0634599, lng: -42.7963661 },
  { lat: -5.0634509, lng: -42.7963615 },
  { lat: -5.0634513, lng: -42.796352 },
  { lat: -5.0634391, lng: -42.796355 },
  { lat: -5.0634287, lng: -42.7963527 },
  { lat: -5.0634171, lng: -42.796352 },
  { lat: -5.0633643, lng: -42.7963657 },
  { lat: -5.0633547, lng: -42.7963773 },
  { lat: -5.0633403, lng: -42.7963761 },
  { lat: -5.0633298, lng: -42.7963734 },
  { lat: -5.0633269, lng: -42.7963547 },
  { lat: -5.0633381, lng: -42.7963411 },
  { lat: -5.063339, lng: -42.796332 },
  { lat: -5.0633431, lng: -42.7963208 },
  { lat: -5.0633461, lng: -42.7963115 },
  { lat: -5.0633509, lng: -42.796303 },
  { lat: -5.063367, lng: -42.796299 },
  { lat: -5.0633796, lng: -42.7962825 },
  { lat: -5.0633922, lng: -42.7962858 },
  { lat: -5.0634016, lng: -42.7962893 },
  { lat: -5.0634163, lng: -42.7962967 },
  { lat: -5.0634262, lng: -42.7962791 },
  { lat: -5.0634386, lng: -42.7962846 },
  { lat: -5.063451, lng: -42.7962924 },
  { lat: -5.0634638, lng: -42.7962999 },
  { lat: -5.0634578, lng: -42.7962577 },
  { lat: -5.0634693, lng: -42.796256 },
  { lat: -5.0634762, lng: -42.796265 },
  { lat: -5.0634773, lng: -42.7962772 },
  { lat: -5.0634805, lng: -42.7963064 },
  { lat: -5.0634795, lng: -42.7963178 },
  { lat: -5.0634764, lng: -42.7963312 },
  { lat: -5.0634728, lng: -42.7963456 },
];

const renderPins = (map: any, maps: any) => {
  data.forEach((location) => {
    new maps.Marker({
      position: location,
      map,
      title: () => PinRed,
    });
  });
};

export default function Map(props: any) {
  const createMapOptions = () => {
    return {
      panControl: true,
      mapTypeControl: true,
      scrollwheel: true,
      disableDefaultUI: true,
      fullscreenControl: true,
      zoomControl: true,
      // styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
    };
  };
  return (
    <div className="map">
      <GoogleMapReact
        options={createMapOptions}
        bootstrapURLKeys={{ key: import.meta.env.VITE_MAP_KEY }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
        heatmapLibrary={true}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }: any) => {
          renderPins(map, maps);
        }}
        onClick={() => {}}
      ></GoogleMapReact>
    </div>
  );
}
