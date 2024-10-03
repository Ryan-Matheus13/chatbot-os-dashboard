/* eslint-disable @typescript-eslint/no-explicit-any */
import { Img } from "react-image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importando os estilos do carrossel
import Loading from "../Loading/Loading";

const CarouselComponent = (props: any) => {
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
              <Img
                src={url}
                loader={
                  <div style={{ width: "100%", height: "300px" }}>
                    <Loading />
                  </div>
                }
                unloader={<span>Imagem não encontrada</span>}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
