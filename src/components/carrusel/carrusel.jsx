import React from 'react';
import { Carousel } from 'react-bootstrap';
import './carrusel.css'
import imagenMitos from '../../assets/mitos banner.png';

const CarruselPrincipal = () => {
  const imagenes = [
    { id: 1, ruta: 'https://www.gameon.games/cdn/shop/collections/pokemon-trading-card-game-244506.jpg?v=1699541734', descripcion: '' },
    { id: 2, ruta: 'https://www.deckboosters.co.uk/cdn/shop/articles/25th-anniversary-tin-dueling-mirrors-tin_4517568a-8103-45a3-8248-90cbce583b46.jpg?v=1718561062', descripcion: '' },
    { id: 3, ruta: 'https://marbelltcg.com/cdn/shop/files/MTG.png?v=1750086655&width=3840', descripcion: '' },
    { id: 4, ruta: imagenMitos }
  ];

  return (
    <Carousel className="mt-4">
      {imagenes.map((imagen) => (
        <Carousel.Item key={imagen.id}>
          <img
            className="d-block w-100 imagen-carrusel"
            src={imagen.ruta}
            alt={imagen.descripcion}
          />
          <Carousel.Caption>
            <h3>{imagen.descripcion}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarruselPrincipal;