import React from 'react';

import CarruselPrincipal from './components/carrusel/carrusel.jsx';
import SeccionFranquicias from './components/franquicias/franquicia.jsx';
import ListaProductos from './components/producto/listaProductos.jsx';

const Inicio = () => {
  return (
    <>
      <CarruselPrincipal />
      <SeccionFranquicias />
      <ListaProductos />
    </>
  );
};

export default Inicio;