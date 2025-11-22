import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { productos } from '../producto/productosGeneral.js';
import { usarCarrito } from '../carrito/ContextoCarrito.jsx';
import './paginaProductos.css';

const PaginaBusqueda = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const { agregarAlCarrito } = usarCarrito();

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(query ? query.toLowerCase() : '') ||
    producto.descripcion.toLowerCase().includes(query ? query.toLowerCase() : '') ||
    producto.tipo.toLowerCase().includes(query ? query.toLowerCase() : '')
  );

  return (
    <Container className="pagina-productos">
      <h1 className="titulo-pagina">Resultados para: "{query}"</h1>
      <hr />
      <Row>
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <Col md={3} sm={6} xs={12} key={producto.id} className="mb-4">
              <Card className="tarjeta-producto">
                <Card.Img variant="top" src={producto.imagen} />
                <Card.Body>
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Text>{producto.descripcion}</Card.Text>
                  <Card.Text className="precio">
                    Precio: ${producto.precio.toLocaleString('es-CL')}
                  </Card.Text>
                  <Button variant="danger" className="w-100" onClick={() => agregarAlCarrito(producto)}>Agregar al Carrito</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No se encontraron productos que coincidan con tu búsqueda.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default PaginaBusqueda;