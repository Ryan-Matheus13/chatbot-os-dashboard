/* eslint-disable @typescript-eslint/no-explicit-any */
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importando os estilos do carrossel

const CarouselComponent = (props: any) => {
  console.log(props);
  return (
    <div>
      <Carousel
        showThumbs={false} // Oculta as miniaturas abaixo das imagens
        autoPlay={false} // Carrossel roda automaticamente
        infiniteLoop={true} // Faz o loop do carrossel
        showStatus={false} // Remove o contador de slides (ex: "1/3")
        stopOnHover={true} // Pausa ao passar o mouse
        interval={3000} // Tempo de exibição de cada slide (em ms)
      >
        {props.images.map((url: string) => {
          return (
            <div>
              <img loading="lazy" src={url} alt="" />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
