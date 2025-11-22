import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Form, Row, Col } from 'react-bootstrap';
import { productos as productosIniciales } from './productosGeneral.js';

const STORAGE_KEY = 'productos';

const AdminProductos = () => {
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({ id: '', nombre: '', franquicia: '', tipo: '', precio: '', imagen: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) setProductos(JSON.parse(raw));
            else {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(productosIniciales));
                setProductos(productosIniciales);
            }
        } catch (err) {
            console.error('Error leyendo productos', err);
            setProductos(productosIniciales);
        }
    }, []);

    const persist = (lista) => {
        setProductos(lista);
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(lista)); } catch (err) { console.error(err); }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleAdd = (e) => {
        e.preventDefault();
        const nuevo = { id: `p${Date.now()}`, nombre: form.nombre, franquicia: form.franquicia, tipo: form.tipo, precio: Number(form.precio) || 0, imagen: form.imagen };
        persist([nuevo, ...productos]);
        setForm({ id: '', nombre: '', franquicia: '', tipo: '', precio: '', imagen: '' });
    };

    const startEdit = (p) => {
        setEditingId(p.id);
        setForm({ id: p.id, nombre: p.nombre, franquicia: p.franquicia, tipo: p.tipo, precio: p.precio, imagen: p.imagen || '' });
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        const updated = productos.map(p => p.id === editingId ? { ...p, nombre: form.nombre, franquicia: form.franquicia, tipo: form.tipo, precio: Number(form.precio) || 0, imagen: form.imagen } : p);
        persist(updated);
        setEditingId(null);
        setForm({ id: '', nombre: '', franquicia: '', tipo: '', precio: '', imagen: '' });
    };

    const handleDelete = (id) => {
        const updated = productos.filter(p => p.id !== id);
        persist(updated);
    };

    return (
        <Container className="my-4">
            <h3>Administrar Productos</h3>

            <Form onSubmit={editingId ? handleSaveEdit : handleAdd} className="mb-3">
                <Row className="mb-2">
                    <Col md={3}><Form.Control name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required /></Col>
                    <Col md={2}><Form.Control name="franquicia" placeholder="Franquicia" value={form.franquicia} onChange={handleChange} /></Col>
                    <Col md={2}><Form.Control name="tipo" placeholder="Tipo" value={form.tipo} onChange={handleChange} /></Col>
                    <Col md={2}><Form.Control name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} /></Col>
                    <Col md={3}><Form.Control name="imagen" placeholder="URL de imagen" value={form.imagen} onChange={handleChange} /></Col>
                </Row>
                <Row>
                    <Col>
                        <Button type="submit" variant="danger">{editingId ? 'Guardar' : 'Agregar'}</Button>
                        {editingId && (
                            <Button className="ms-2" variant="secondary" onClick={() => { setEditingId(null); setForm({ id: '', nombre: '', franquicia: '', tipo: '', precio: '', imagen: '' }); }}>Cancelar</Button>
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
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.imagen ? <img src={p.imagen} alt={p.nombre} style={{ width: 64, height: 'auto' }} /> : '-'}</td>
                            <td>{p.nombre}</td>
                            <td>{p.franquicia}</td>
                            <td>{p.tipo}</td>
                            <td>{p.precio}</td>
                            <td>
                                <Button size="sm" variant="outline-primary" onClick={() => startEdit(p)}>Editar</Button>{' '}
                                <Button size="sm" variant="outline-danger" onClick={() => handleDelete(p.id)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AdminProductos;
