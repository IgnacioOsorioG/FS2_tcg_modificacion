import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { productos } from '../producto/productosGeneral.js';
import { usarCarrito } from '../carrito/ContextoCarrito.jsx';
import './paginaProductos.css';

const PaginaProductos = () => {
  const { franquicia } = useParams();
  const { agregarAlCarrito } = usarCarrito();

  const productosFiltrados = productos.filter(p => p.franquicia === franquicia);

  return (
    <Container className="contenedor-productos-pagina">
      <h1 className="titulo-franquicia">
        {franquicia}
      </h1>
      <hr />
      <Row>
        {productosFiltrados.map((producto) => (
          <Col md={3} sm={6} xs={12} key={producto.id} className="mb-4">
            <Card className="tarjeta-producto-tienda">
              <Card.Img variant="top" src={producto.imagen} />
              <Card.Body>
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>{producto.descripcion}</Card.Text>
                <Card.Text className="precio-producto">
                  Precio: ${producto.precio.toLocaleString('es-CL')}
                </Card.Text>
                <Button variant="danger" className="w-100" onClick={() => agregarAlCarrito(producto)}>Agregar al Carrito</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PaginaProductos;