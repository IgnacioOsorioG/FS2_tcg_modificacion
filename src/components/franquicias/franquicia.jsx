import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import './franquicia.css';

const SeccionFranquicias = () => {
  const franquicias = [
    { nombre: 'Pokemon', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Pok%C3%A9mon_Trading_Card_Game_logo.svg/1200px-Pok%C3%A9mon_Trading_Card_Game_logo.svg.png', enlace: '/productos/pokemon' },
    { nombre: 'Yu-Gi-Oh!', logo: 'https://www.konami.com/yugioh/assets/logo/product/tcg.png', enlace: '/productos/yugioh' },
    { nombre: 'Magic', logo: 'https://mnd-assets.mynewsdesk.com/image/upload/c_fill,dpr_auto,f_auto,g_xy_center,q_auto:good,w_746,x_1000,y_649/vlc5zqo202p17sj44gopvd', enlace: '/productos/magic' },
    { nombre: 'Mitos y Leyendas', logo: 'https://mir-s3-cdn-cf.behance.net/projects/404/0befd162423689.Y3JvcCwxMjMxLDk2MywzMjgsMzk.jpg', enlace: '/productos/mitos' }
  ];

  return (
    <Container className="text-center my-5">
      <h2>Nuestras Franquicias</h2>
      <hr />
      <Row>
        {franquicias.map((franquicia) => (
          <Col md={3} sm={6} xs={12} key={franquicia.nombre} className="mb-4">
            <Link to={franquicia.enlace}>
              <Image 
                src={franquicia.logo} 
                alt={`Logo de ${franquicia.nombre}`} 
                className="imagen-franquicia"
                rounded 
              />
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SeccionFranquicias;