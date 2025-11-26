import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, Tab, Tabs, Alert, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const API_TICKETS = 'http://98.83.97.82:8080/api/tickets';
const MiCuenta = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [misTickets, setMisTickets] = useState([]);
    const [misCompras, setMisCompras] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user && user.email) {
            cargarTicketsUsuario();
            cargarComprasSimuladas();
        }
    }, [user]);

    const cargarTicketsUsuario = async () => {
        try {
            const respuesta = await fetch(API_TICKETS);
            if (respuesta.ok) {
                const todosLosTickets = await respuesta.json();
                const ticketsFiltrados = todosLosTickets.filter(t => t.email === user.email);
                setMisTickets(ticketsFiltrados);
            } else {
                setError('No se pudieron cargar los tickets');
            }
        } catch (err) {
            console.error(err);
            setError('Error de conexión al buscar tickets');
        }
    };

    const cargarComprasSimuladas = () => {
        setMisCompras([
            { id: 'ORD-001', fecha: '2025-10-20', total: 15000, estado: 'Entregado', items: 'Starter Deck Yugi' },
            { id: 'ORD-002', fecha: '2025-11-05', total: 6000, estado: 'En camino', items: 'Booster Pack Pokemon' }
        ]);
    };

    if (!user) {
        return <Container className="my-5 text-center"><h3>Debes iniciar sesión para ver esta página.</h3></Container>;
    }

    return (
        <Container className="my-5">
            <h2 className="mb-4">Mi Cuenta</h2>
            
            <Row>
                <Col md={4} className="mb-4">
                    <Card className="shadow-sm">
                        <Card.Body className="text-center">
                            <div className="mb-3">
                                <img 
                                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png" 
                                    alt="Avatar" 
                                    style={{ width: '100px', borderRadius: '50%' }} 
                                />
                            </div>
                            <h4>{user.usuario}</h4>
                            <p className="text-muted">{user.email}</p>
                            <Badge bg={user.email.includes('tienda.cl') ? 'danger' : 'primary'}>
                                {user.email.includes('tienda.cl') ? 'Administrador' : 'Cliente'}
                            </Badge>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={8}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Tabs defaultActiveKey="tickets" id="tabs-cuenta" className="mb-3">
                                
                                <Tab eventKey="datos" title="Mis Datos">
                                    <FormUsuarioDatos user={user} />
                                </Tab>

                                <Tab eventKey="compras" title="Mis Compras">
                                    <TablaCompras compras={misCompras} />
                                </Tab>

                                <Tab eventKey="tickets" title="Mis Tickets">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h5>Historial de Soporte</h5>
                                        {}
                                        <Button variant="success" onClick={() => navigate('/contacto')}>
                                            + Nuevo Ticket
                                        </Button>
                                    </div>
                                    {error && <Alert variant="danger">{error}</Alert>}
                                    <TablaTickets tickets={misTickets} />
                                </Tab>

                            </Tabs>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

const FormUsuarioDatos = ({ user }) => (
    <div>
        <p><strong>Nombre de Usuario:</strong> {user.usuario}</p>
        <p><strong>Correo Electrónico:</strong> {user.email}</p>
        <p><strong>Contraseña:</strong> ********</p>
        <Alert variant="info">Para cambiar tus datos contacta a soporte.</Alert>
    </div>
);

const TablaCompras = ({ compras }) => (
    <Table striped hover responsive>
        <thead>
            <tr>
                <th>ID Orden</th>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Total</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            {compras.length > 0 ? compras.map(c => (
                <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.fecha}</td>
                    <td>{c.items}</td>
                    <td>${c.total}</td>
                    <td><Badge bg="success">{c.estado}</Badge></td>
                </tr>
            )) : <tr><td colSpan="5" className="text-center">No tienes compras registradas.</td></tr>}
        </tbody>
    </Table>
);

const TablaTickets = ({ tickets }) => (
    <Table striped hover responsive>
        <thead>
            <tr>
                <th>ID</th>
                <th>Asunto</th>
                <th>Descripción</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            {tickets.length > 0 ? tickets.map(t => (
                <tr key={t.id}>
                    <td>#{t.id}</td>
                    <td>{t.asunto}</td>
                    <td>{t.descripcion}</td>
                    <td>
                        <Badge bg={t.estado === 'ABIERTO' ? 'warning' : 'secondary'}>
                            {t.estado}
                        </Badge>
                    </td>
                </tr>
            )) : <tr><td colSpan="4" className="text-center">No has enviado tickets de soporte.</td></tr>}
        </tbody>
    </Table>
);

export default MiCuenta;