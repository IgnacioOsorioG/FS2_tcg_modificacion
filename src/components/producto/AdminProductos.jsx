import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Form, Row, Col, Alert } from 'react-bootstrap';

const API_URL = 'http://localhost:8081/api/productos';

const AdminProductos = () => {
    const [productos, setProductos] = useState([]);
    
    const [formulario, setFormulario] = useState({ 
        productId: '', 
        nombreProduto: '', 
        franquicia: '', 
        tipo: '', 
        precio: '', 
        descripcion: '',
        urlImagen: '' 
    });

    const [idEdicion, setIdEdicion] = useState(null);
    const [alerta, setAlerta] = useState(null);

    const cargarProductos = async () => {
        try {
            const respuesta = await fetch(API_URL);
            if (respuesta.ok) {
                const datos = await respuesta.json();
                setProductos(datos);
            } else {
                setAlerta({ tipo: 'danger', mensaje: 'Error al cargar productos' });
            }
        } catch (error) {
            setAlerta({ tipo: 'danger', mensaje: 'Error de conexión con el servidor' });
        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const manejarCambio = (e) => setFormulario({ ...formulario, [e.target.name]: e.target.value });

    const manejarAgregar = async (e) => {
        e.preventDefault();
        
        const nuevoProducto = {
            nombreProduto: formulario.nombreProduto,
            franquicia: formulario.franquicia,
            tipo: formulario.tipo,
            precio: Number(formulario.precio) || 0,
            descripcion: formulario.descripcion,
            urlImagen: formulario.urlImagen
        };

        try {
            const respuesta = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoProducto)
            });

            if (respuesta.ok) {
                setAlerta({ tipo: 'success', mensaje: 'Producto creado correctamente' });
                cargarProductos();
                setFormulario({ productId: '', nombreProduto: '', franquicia: '', tipo: '', precio: '', descripcion: '', urlImagen: '' });
            } else {
                setAlerta({ tipo: 'danger', mensaje: 'Error al crear producto' });
            }
        } catch (error) {
            setAlerta({ tipo: 'danger', mensaje: 'Error de conexión' });
        }
    };

    const iniciarEdicion = (p) => {
        setIdEdicion(p.productId);
        setFormulario({ 
            productId: p.productId, 
            nombreProduto: p.nombreProduto, 
            franquicia: p.franquicia, 
            tipo: p.tipo, 
            precio: p.precio, 
            descripcion: p.descripcion || '',
            urlImagen: p.urlImagen || '' 
        });
    };

    const manejarGuardarEdicion = async (e) => {
        e.preventDefault();
        
        const productoActualizado = {
            productId: idEdicion,
            nombreProduto: formulario.nombreProduto,
            franquicia: formulario.franquicia,
            tipo: formulario.tipo,
            precio: Number(formulario.precio) || 0,
            descripcion: formulario.descripcion,
            urlImagen: formulario.urlImagen
        };

        try {
            const respuesta = await fetch(`${API_URL}/${idEdicion}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productoActualizado)
            });

            if (respuesta.ok) {
                setAlerta({ tipo: 'success', mensaje: 'Producto actualizado correctamente' });
                cargarProductos();
                setIdEdicion(null);
                setFormulario({ productId: '', nombreProduto: '', franquicia: '', tipo: '', precio: '', descripcion: '', urlImagen: '' });
            } else {
                setAlerta({ tipo: 'danger', mensaje: 'Error al actualizar producto' });
            }
        } catch (error) {
            setAlerta({ tipo: 'danger', mensaje: 'Error de conexión' });
        }
    };

    const manejarEliminar = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

        try {
            const respuesta = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (respuesta.ok) {
                setAlerta({ tipo: 'success', mensaje: 'Producto eliminado correctamente' });
                cargarProductos();
            } else {
                setAlerta({ tipo: 'danger', mensaje: 'Error al eliminar producto' });
            }
        } catch (error) {
            setAlerta({ tipo: 'danger', mensaje: 'Error de conexión' });
        }
    };

    return (
        <Container className="my-4">
            <h3>Administrar Productos</h3>

            {alerta && (
                <Alert variant={alerta.tipo} onClose={() => setAlerta(null)} dismissible>
                    {alerta.mensaje}
                </Alert>
            )}

            <Form onSubmit={idEdicion ? manejarGuardarEdicion : manejarAgregar} className="mb-3">
                <Row className="mb-2">
                    <Col md={3}>
                        <Form.Control 
                            name="nombreProduto" 
                            placeholder="Nombre Producto" 
                            value={formulario.nombreProduto} 
                            onChange={manejarCambio} 
                            required 
                        />
                    </Col>
                    <Col md={2}>
                        <Form.Control 
                            name="franquicia" 
                            placeholder="Franquicia" 
                            value={formulario.franquicia} 
                            onChange={manejarCambio} 
                        />
                    </Col>
                    <Col md={2}>
                        <Form.Control 
                            name="tipo" 
                            placeholder="Tipo" 
                            value={formulario.tipo} 
                            onChange={manejarCambio} 
                        />
                    </Col>
                    <Col md={2}>
                        <Form.Control 
                            name="precio" 
                            placeholder="Precio" 
                            value={formulario.precio} 
                            onChange={manejarCambio} 
                        />
                    </Col>
                    <Col md={3}>
                        <Form.Control 
                            name="urlImagen" 
                            placeholder="URL Imagen" 
                            value={formulario.urlImagen} 
                            onChange={manejarCambio} 
                        />
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col md={12}>
                        <Form.Control 
                            as="textarea" 
                            rows={2}
                            name="descripcion" 
                            placeholder="Descripción del producto" 
                            value={formulario.descripcion} 
                            onChange={manejarCambio} 
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button type="submit" variant="danger">{idEdicion ? 'Guardar Cambios' : 'Agregar Producto'}</Button>
                        {idEdicion && (
                            <Button className="ms-2" variant="secondary" onClick={() => { setIdEdicion(null); setFormulario({ productId: '', nombreProduto: '', franquicia: '', tipo: '', precio: '', descripcion: '', urlImagen: '' }); }}>Cancelar</Button>
                        )}
                    </Col>
                </Row>
            </Form>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Franquicia</th>
                        <th>Tipo</th>
                        <th>Precio</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(p => (
                        <tr key={p.productId}>
                            <td>{p.productId}</td>
                            <td>{p.urlImagen ? <img src={p.urlImagen} alt={p.nombreProduto} style={{ width: 64, height: 'auto' }} /> : '-'}</td>
                            <td>{p.nombreProduto}</td>
                            <td>{p.franquicia}</td>
                            <td>{p.tipo}</td>
                            <td>${p.precio}</td>
                            <td>{p.descripcion}</td>
                            <td>
                                <Button size="sm" variant="outline-primary" onClick={() => iniciarEdicion(p)}>Editar</Button>{' '}
                                <Button size="sm" variant="outline-danger" onClick={() => manejarEliminar(p.productId)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AdminProductos;