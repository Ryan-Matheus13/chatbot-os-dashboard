/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import PinRed from "../../../assets/manutencao_urbana.png";
import PinOrange from "../../../assets/limpeza_publica.png";
import PinYellow from "../../../assets/iluminacao_publica.png";

interface Location {
  lat: number;
  lng: number;
  title: string;
  category: string;
  description: string;
  photos: string[];
}

const createMergedImage = (
  userImageSrc: string,
  pinImageSrc: string,
  callback: (url: string) => void
) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const size = 240;
  const imageRadius = 80;

  canvas.width = size;
  canvas.height = size;

  const userImage = new Image();
  const pinImage = new Image();

  userImage.crossOrigin = "anonymous";
  pinImage.crossOrigin = "anonymous";

  // Quando ambas as imagens são carregadas, desenhe-as no canvas
  userImage.onload = () => {
    pinImage.onload = () => {
      // Desenha o pin como plano de fundo
      if (context) {
        context.drawImage(pinImage, 0, 0, size, size);

        // Criar um caminho circular para recortar a imagem do usuário
        context.beginPath();
        context.arc(120, 100, imageRadius, 0, Math.PI * 2, true); // Círculo com raio 10
        context.closePath();
        context.clip();

        // Desenha a imagem do usuário por cima
        context.drawImage(userImage, 0, 0, 240, 240);
        // Gera a URL da imagem mesclada
        const mergedImageUrl = canvas.toDataURL("image/png");
        callback(mergedImageUrl);
      }
    };
    pinImage.src = pinImageSrc;
  };
  userImage.src = userImageSrc;
};

// Componente personalizado para o pin
const CustomPin: React.FC<{
  photo: string;
  onGenerated: (url: string) => void;
  category: string;
}> = ({ photo, onGenerated, category }) => {
  let pinImageSrc;
  if (category == "Iluminação Pública") {
    pinImageSrc = PinYellow;
  } else if (category == "Manutenção Urbana") {
    pinImageSrc = PinRed;
  } else {
    pinImageSrc = PinOrange;
  }

  useEffect(() => {
    // Chama a função para mesclar as imagens e gerar o URL
    createMergedImage(photo, pinImageSrc, onGenerated);
  }, [photo, pinImageSrc, onGenerated]);

  return null; // Este componente só lida com geração do ícone e não renderiza nada
};

// Função para renderizar os pins
const renderPins = (
  map: any,
  maps: any,
  onMarkerClick: (location: Location, event: any) => void,
  location: Location
) => {
  const div = document.createElement("div");

  // Renderizando o CustomPin diretamente no div criado
  ReactDOM.render(
    <CustomPin
      photo={location.photos[0]}
      category={location.category}
      onGenerated={(mergedImageUrl) => {
        const marker = new maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map,
          icon: {
            url: mergedImageUrl, // Usando a URL da imagem mesclada como ícone
            scaledSize: new maps.Size(60, 60), // Tamanho do ícone
          },
        });

        // Adiciona o evento de click para o pin
        marker.addListener("click", (e: any) => {
          onMarkerClick(location, e);
        });
      }}
    />,
    div
  );
};

export default renderPins;
