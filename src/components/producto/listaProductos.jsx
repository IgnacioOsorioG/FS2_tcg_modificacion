import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { productos } from './productosGeneral.js';
import './listaproductos.css';
import { usarCarrito } from '../carrito/ContextoCarrito.jsx';

const ListaProductos = () => {
  const [productosDestacados, setProductosDestacados] = useState([]);

  const { agregarAlCarrito } = usarCarrito();

  useEffect(() => {
    const productosMezclados = [...productos].sort();
    setProductosDestacados(productosMezclados.slice(0, 4));
  }, []);

  return (
    <Container className="my-5">
      <h2 className="text-center">Productos Destacados</h2>
      <hr />
      <Row>
        {productosDestacados.map((producto) => (
          <Col md={3} sm={6} xs={12} key={producto.id} className="mb-4">
            <Card className="tarjeta-producto">
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

export default ListaProductos;