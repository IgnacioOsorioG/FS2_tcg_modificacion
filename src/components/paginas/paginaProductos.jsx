import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { usarCarrito } from '../carrito/ContextoCarrito.jsx';

const API_URL = 'http://localhost:8081/api/productos';

const PaginaProductos = () => {
  const { franquicia } = useParams();
  const { agregarAlCarrito } = usarCarrito();
  
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProductos = async () => {
      setCargando(true);
      try {
        const respuesta = await fetch(API_URL);
        if (respuesta.ok) {
          const datos = await respuesta.json();
          const filtrados = datos.filter(p => p.franquicia === franquicia);
          setProductos(filtrados);
        } else {
          setError('No se pudieron obtener los productos');
        }
      } catch (err) {
        setError('Error de conexión');
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, [franquicia]);

  if (cargando) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status" variant="danger">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return <Container className="my-5"><Alert variant="danger">{error}</Alert></Container>;
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4 text-uppercase">{franquicia}</h2>
      <Row>
        {productos.length > 0 ? (
          productos.map((producto) => (
            <Col key={producto.productId} md={4} lg={3} className="mb-4">
              <Card className="h-100 shadow-sm card-hover">
                <div className="p-3 text-center">
                  <Card.Img 
                    variant="top" 
                    src={producto.urlImagen} 
                    style={{ height: '180px', objectFit: 'contain' }} 
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fs-6">{producto.nombreProduto}</Card.Title>
                  <Card.Text className="text-muted small flex-grow-1">
                    {producto.descripcion}
                  </Card.Text>
                  <div className="mt-auto">
                    <h5 className="text-danger mb-3">${producto.precio}</h5>
                    <Button 
                      variant="danger" 
                      className="w-100"
                      onClick={() => agregarAlCarrito({
                        id: producto.productId,
                        nombre: producto.nombreProduto,
                        precio: producto.precio,
                        imagen: producto.urlImagen
                      })}
                    >
                      Añadir al Carrito
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className="text-center w-100">
            <h4>No hay productos disponibles para esta categoría.</h4>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default PaginaProductos;