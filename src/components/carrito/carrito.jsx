import React from 'react';
import { usarCarrito } from './ContextoCarrito';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Carrito.css';

const Carrito = () => {
    const { articulosCarrito, eliminarDelCarrito, vaciarCarrito, agregarAlCarrito, restarDelCarrito } = usarCarrito();

    const totalCompra = articulosCarrito.reduce(
        (total, articulo) => total + articulo.precio * articulo.cantidad,
        0
    );

    if (articulosCarrito.length === 0) {
        return (
            <Container className="text-center my-5">
                <Alert variant="info">
                    <h2>Tu carrito está vacío</h2>
                    <p>¡Añade productos para verlos aquí!</p>
                    <Link to="/">
                        <Button variant="danger">Ir a la tienda</Button>
                    </Link>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="contenedor-carrito my-5">
            <h1 className="text-center mb-4">Tu Carrito de Compras</h1>
            {articulosCarrito.map((articulo) => (
                <Card key={articulo.id} className="mb-3 articulo-carrito">
                    <Card.Body as={Row} className="align-items-center">
                        <Col md={2} xs={3}>
                            <Card.Img src={articulo.imagen} className="imagen-carrito" />
                        </Col>
                        <Col md={3} xs={9}>
                            <Card.Title className="nombre-articulo-carrito">{articulo.nombre}</Card.Title>
                            <Card.Text className="precio-unitario-carrito">
                                ${articulo.precio.toLocaleString('es-CL')} c/u
                            </Card.Text>
                        </Col>
                        <Col md={3} xs={6} className="d-flex align-items-center justify-content-center my-2 my-md-0">
                            <Button variant="outline-secondary" size="sm" onClick={() => restarDelCarrito(articulo.id)}>-</Button>
                            <span className="mx-2">{articulo.cantidad}</span>
                            <Button variant="outline-secondary" size="sm" onClick={() => agregarAlCarrito(articulo)}>+</Button>
                        </Col>
                        <Col md={2} xs={6} className="text-md-end">
                            <Card.Text className="fw-bold">
                                Subtotal: ${(articulo.precio * articulo.cantidad).toLocaleString('es-CL')}
                            </Card.Text>
                        </Col>
                        <Col md={2} xs={12} className="text-center text-md-end mt-2 mt-md-0">
                            <Button variant="outline-danger" size="sm" onClick={() => eliminarDelCarrito(articulo.id)}>
                                Eliminar
                            </Button>
                        </Col>
                    </Card.Body>
                </Card>
            ))}
            <hr />
            <Row className="justify-content-end align-items-center">
                <Col md={6} className="text-md-end">
                    <h2 className="total-compra">Total: ${totalCompra.toLocaleString('es-CL')}</h2>
                </Col>
                <Col md={6} className="d-flex justify-content-md-end justify-content-center mt-3 mt-md-0">
                    <Button variant="outline-danger" size="lg" className="me-3" onClick={vaciarCarrito}>
                        Vaciar Carrito
                    </Button>
                    <Button variant="success" size="lg">
                        Finalizar Compra
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Carrito;