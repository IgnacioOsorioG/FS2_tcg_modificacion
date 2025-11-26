import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logoDeLaTienda from '../../assets/Logo.png';
import { productos } from '../producto/productosGeneral.js';
import { usarCarrito } from '../carrito/ContextoCarrito.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import './header.css';

const Header = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const navegar = useNavigate();
  const { articulosCarrito } = usarCarrito();
  const { user, logout, isAdmin } = useAuth();

  const cantidadTotalArticulos = articulosCarrito.reduce(
    (total, articulo) => total + articulo.cantidad,
    0
  );

  const manejarEnvioBusqueda = (e) => {
    e.preventDefault();
    if (terminoBusqueda.trim()) {
      navegar(`/search?q=${terminoBusqueda}`);
      setTerminoBusqueda('');
    }
  };

  const manejarCierreSesion = () => {
    logout();
    navegar('/');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary py-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logoDeLaTienda}
            alt="Logo de la Tienda"
            className="logo-nav"
          />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">

          <Form className="d-flex flex-grow-1 mx-lg-5 my-3 my-lg-0" onSubmit={manejarEnvioBusqueda}>
            <Form.Control
              type="search"
              placeholder="Buscar productos..."
              className="me-2 w-100"
              aria-label="Buscar"
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
              list="sugerencias-productos"
            />

            <datalist id="sugerencias-productos">
              {productos.map((producto) => (
                <option key={producto.id} value={producto.nombre} />
              ))}
            </datalist>

            <Button variant="danger" type="submit">Buscar</Button>
          </Form>

          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
            
            {user ? (
              <>
                {isAdmin && <Nav.Link as={Link} to="/admin" className="fw-bold text-danger">Admin</Nav.Link>}
                <NavDropdown title={user.usuario} id="user-nav-dropdown" align="end">
                  <NavDropdown.Item as={Link} to="/mi-cuenta">Mi cuenta</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={manejarCierreSesion}>Cerrar sesión</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link as={Link} to="/ingreso">Ingresar</Nav.Link>
            )}

            <NavDropdown
              title="Productos"
              id="basic-nav-dropdown"
              align="end"
            >
              <NavDropdown.Item as={Link} to="/productos/pokemon">Pokemon</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/productos/yugioh">Yu-Gi-Oh!</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/productos/magic">Magic</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/productos/mitos">Mitos y Leyendas</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/carrito" className="d-flex align-items-center position-relative">
              <span className="material-icons">Carrito</span> 
              {cantidadTotalArticulos > 0 && (
                <Badge pill bg="danger" className="ms-1">
                  {cantidadTotalArticulos}
                </Badge>
              )}
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;