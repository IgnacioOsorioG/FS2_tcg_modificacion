import React from "react";
import { Container } from "react-bootstrap";
import './footer.css'; 

import logoDeLaTienda from '../../assets/Logo.png';

const PieDePagina = () => {
  return (
    <footer className="pie-de-pagina"> 
      <Container>
        <img
          src={logoDeLaTienda}
          alt="Logo de la tienda"
          className="logo-pie" 
        />
        <p className="nombre-tienda">TCG Project</p>
        <p className="derechos-reservados">
          &copy; 2025 TCG Project. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
};

export default PieDePagina;