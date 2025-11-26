import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const API_URL = 'http://18.234.130.170:8081/api/productos';
const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await fetch(API_URL);
        if (respuesta.ok) {
          const datos = await respuesta.json();
          setProductos(datos.slice(0, 3));
        } else {
          setError('Error al cargar productos');
        }
      } catch (err) {
        setError('Error de conexión con el servidor');
      }
    };

    obtenerProductos();
  }, []);

  if (error) return <Container className="my-5"><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container className="my-5">
      <div className="text-center">
        <div className="titulo-encapsulado">
          <h2>Productos Destacados</h2>
        </div>
      </div>

      <Row>
        {productos.map((producto) => (
          <Col key={producto.productId} md={4} className="mb-4">
            <Card className="h-100 shadow-sm card">
              <div className="text-center p-3">
                  <Card.Img 
                      variant="top" 
                      src={producto.urlImagen} 
                      style={{ height: '200px', objectFit: 'contain' }} 
                  />
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{producto.nombreProduto}</Card.Title>
                <Card.Text className="text-muted flex-grow-1">
                  {producto.descripcion}
                </Card.Text>
                <h5 className="text-danger mb-3">${producto.precio}</h5>
                <Button variant="danger" as={Link} to={`/productos/${producto.franquicia}`}>
                  Ver más
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListaProductos;