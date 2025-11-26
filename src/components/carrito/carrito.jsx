import React, { useState } from 'react';
import { Container, Table, Button, Image, Modal } from 'react-bootstrap';
import { usarCarrito } from './ContextoCarrito.jsx';
import { Link, useNavigate } from 'react-router-dom';

const Carrito = () => {
  const { articulosCarrito, eliminarDelCarrito, vaciarCarrito, actualizarCantidad } = usarCarrito();
  const [mostrarModal, setMostrarModal] = useState(false);
  const navegar = useNavigate();

  const precioTotal = articulosCarrito.reduce(
    (total, articulo) => total + articulo.precio * articulo.cantidad,
    0
  );

  const manejarCompra = () => {
    setMostrarModal(true);
    vaciarCarrito();
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    navegar('/');
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Tu Carrito de Compras</h2>

      {articulosCarrito.length === 0 ? (
        <div className="text-center p-5 bg-light rounded">
          <h3>Tu carrito está vacío</h3>
          <p className="text-muted">¡Añade productos para verlos aquí!</p>
          <Link to="/" className="btn btn-danger mt-3">Ir a la tienda</Link>
        </div>
      ) : (
        <>
          <Table responsive hover className="align-middle">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {articulosCarrito.map((articulo) => (
                <tr key={articulo.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <Image 
                        src={articulo.imagen} 
                        alt={articulo.nombre} 
                        style={{ width: '60px', height: '60px', objectFit: 'contain', marginRight: '15px' }} 
                        rounded
                      />
                      <span className="fw-bold">{articulo.nombre}</span>
                    </div>
                  </td>
                  <td>${articulo.precio}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        onClick={() => actualizarCantidad(articulo.id, articulo.cantidad - 1)}
                        disabled={articulo.cantidad <= 1}
                      >
                        -
                      </Button>
                      <span>{articulo.cantidad}</span>
                      <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        onClick={() => actualizarCantidad(articulo.id, articulo.cantidad + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td>${articulo.precio * articulo.cantidad}</td>
                  <td>
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      onClick={() => eliminarDelCarrito(articulo.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-end align-items-center mt-4 border-top pt-3">
            <h4 className="me-4">Total: <span className="text-danger">${precioTotal}</span></h4>
            <Button variant="success" size="lg" onClick={manejarCompra}>
              Finalizar Compra
            </Button>
          </div>
        </>
      )}

      <Modal show={mostrarModal} onHide={cerrarModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-success">¡Compra Exitosa!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
          <h5>Gracias por su compra</h5>
          <p className="text-muted">
            En breve nos comunicaremos con usted para informar sobre su envío.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={cerrarModal}>
            Volver al Inicio
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default Carrito;