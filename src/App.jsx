import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import Carrito from './components/carrito/carrito.jsx';
import Contacto from './components/contacto/contacto.jsx';
import Inicio from './Inicio.jsx';
import Nosotros from './Nosotros.jsx';
import Ingreso from './Ingreso.jsx';
import PaginaProductos from './components/paginas/paginaProductos.jsx';
import PaginaBusqueda from './components/paginas/paginaBusqueda.jsx';
import AdminProductos from './components/producto/AdminProductos.jsx';
import MiCuenta from './components/usuarios/MiCuenta.jsx';
import BotonInicio from './ui/BotonInicio.jsx';

import { ProveedorCarrito } from './components/carrito/ContextoCarrito.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

function Layout() {
  return (
    <div className="plantilla">
      <Header />
      <main>
        <Outlet />
      </main>
      <BotonInicio />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProveedorCarrito>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Inicio />} />
            <Route path="nosotros" element={<Nosotros />} />
            <Route path="productos/:franquicia" element={<PaginaProductos />} />
            <Route path="search" element={<PaginaBusqueda />} />
            <Route path="ingreso" element={<Ingreso />} />
            <Route path="admin" element={<AdminProductos />} />
            <Route path="contacto" element={<Contacto />} />
            <Route path="carrito" element={<Carrito />} />
            <Route path="mi-cuenta" element={<MiCuenta />} />
          </Route>
        </Routes>
      </ProveedorCarrito>
    </AuthProvider>
  );
}

export default App;