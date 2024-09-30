/* eslint-disable @typescript-eslint/no-explicit-any */
// RenderPins.tsx
import React from "react";
import ReactDOM from "react-dom";

// Tipos para as propriedades do mapa e localização
interface Location {
  lat: number;
  lng: number;
  title: string;
  description: string;
  photos: string[];
}

// Estilos inline para o pin
const pinStyle: React.CSSProperties = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "#ff5e57",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
};

const imageStyle: React.CSSProperties = {
  width: "25px",
  height: "25px",
  borderRadius: "50%",
};

// Componente personalizado para o pin
const CustomPin: React.FC<{ photo: string }> = ({ photo }) => (
  <div style={pinStyle}>
    <img src={photo} alt="Pin" style={imageStyle} />
  </div>
);

// Função para renderizar os pins
const renderPins = (
  map: any,
  maps: any,
  onMarkerClick: (location: Location) => void,
  location: Location
) => {
  const div = document.createElement("div");

  // Renderizando o CustomPin diretamente no div criado
  ReactDOM.render(<CustomPin photo={location.photos[0]} />, div);

  const imageElement = div.querySelector("img");

  // Certificando que o imageElement existe antes de acessar o src
  if (imageElement) {
    const marker = new maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map,
      icon: {
        url: imageElement.src, // Usando a URL da imagem como ícone
        scaledSize: new maps.Size(40, 40), // Tamanho do ícone
      },
    });

    // Adiciona o evento de click para o pin
    marker.addListener("click", () => {
      onMarkerClick(location);
    });
  }
};

export default renderPins;
