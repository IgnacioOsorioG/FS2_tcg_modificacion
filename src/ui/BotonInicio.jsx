import React from 'react';
import { Link } from 'react-router-dom';
import './BotonInicio.css';

const BotonInicio = () => {
  return (
    <Link to="/" className="boton-flotante" title="Volver al Inicio">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        className="icono-casa"
      >
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    </Link>
  );
};

export default BotonInicio;