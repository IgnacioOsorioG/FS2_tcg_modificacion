import React, { useState } from 'react';
import { Container, Tabs, Tab, Form, Button, Alert } from 'react-bootstrap';
import './registroUsuario.css';
import { validarRegistro, validarLogin } from '../../utils/validaciones.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const RegistroUsuario = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formValues, setFormValues] = useState({
    usuario: '',
    email: '',
    password: '',
    confirmPassword: '',
    aceptaTerminos: false,
  });

  const [errores, setErrores] = useState({});
  const [alerta, setAlerta] = useState(null);
  const [enviando, setEnviando] = useState(false); 

  const [loginValues, setLoginValues] = useState({
    usuario: '',
    password: '',
  });

  const [loginErrores, setLoginErrores] = useState({});
  const [loginAlerta, setLoginAlerta] = useState(null);
  const [enviandoLogin, setEnviandoLogin] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginValues({
      ...loginValues,
      [name]: value,
    });
  };

  // --- REGISTRO CON NUEVA IP ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlerta(null);
    const nuevosErrores = validarRegistro(formValues);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      setEnviando(true);

      const usuarioParaBackend = {
        usuarioNombre: formValues.usuario,
        correo: formValues.email,
        password: formValues.password,
        terminos: formValues.aceptaTerminos
      };

      try {
        const respuesta = await fetch('http://54.84.50.10:8082/api/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(usuarioParaBackend),
        });

        if (!respuesta.ok) {
            throw new Error('Error al registrar en la base de datos');
        }

        setAlerta({
          tipo: 'success',
          mensaje: '¡Registro exitoso en la base de datos! Ahora puedes iniciar sesión.',
        });
        setFormValues({ usuario: '', email: '', password: '', confirmPassword: '', aceptaTerminos: false });

      } catch (err) {
        console.error('Error guardando registro:', err);
        setAlerta({
            tipo: 'danger',
            mensaje: 'Error de conexión con el servidor. Inténtalo más tarde.',
        });
      } finally {
        setEnviando(false);
      }

    } else {
      setAlerta({
        tipo: 'danger',
        mensaje: 'Por favor, corrige los errores en el formulario.',
      });
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginAlerta(null);
    const nuevosErrores = validarLogin(loginValues);
    setLoginErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      setEnviandoLogin(true);

      try {
        const respuesta = await fetch('http://54.84.50.10:8082/api/usuarios');
        
        if(!respuesta.ok) {
            throw new Error('No se pudo conectar con el servidor');
        }

        const usuariosDB = await respuesta.json();

        const encontrado = usuariosDB.find(u => 
            u.usuarioNombre === loginValues.usuario && u.password === loginValues.password
        );

        if (encontrado) {
          setLoginAlerta({ tipo: 'success', mensaje: '¡Inicio de sesión exitoso! Redirigiendo...' });
          
          login({ usuario: encontrado.usuarioNombre, email: encontrado.correo });
          
          setLoginValues({ usuario: '', password: '' });
          setTimeout(() => navigate('/'), 1000);
          return;
        } else {
            setLoginAlerta({ tipo: 'danger', mensaje: 'Usuario o contraseña incorrectos.' });
        }

      } catch (err) {
        console.error('Error verificando credenciales', err);
        setLoginAlerta({ tipo: 'danger', mensaje: 'Error al conectar con la base de datos.' });
      } finally {
        setEnviandoLogin(false);
      }

    } else {
      setLoginAlerta({
        tipo: 'danger',
        mensaje: 'Usuario o contraseña incorrectos.',
      });
    }
  };

  return (
    <Container className="contenedor-registro">
      <Tabs defaultActiveKey="registro" id="tabs-registro" className="mb-3 tarjeta-registro-tabs" fill>

        <Tab eventKey="registro" title="Registro">
          <Form className="p-4" onSubmit={handleSubmit}>

            {alerta && (
              <Alert variant={alerta.tipo} onClose={() => setAlerta(null)} dismissible>
                {alerta.mensaje}
              </Alert>
            )}

            <Form.Group className="mb-3" controlId="usuario-reg">
              <Form.Label>Ingrese su usuario</Form.Label>
              <Form.Control
                type="text"
                name="usuario"
                value={formValues.usuario}
                onChange={handleChange}
                isInvalid={!!errores.usuario}
                disabled={enviando}
              />
              <Form.Control.Feedback type="invalid">
                {errores.usuario}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email-reg">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                isInvalid={!!errores.email}
                disabled={enviando}
              />
              <Form.Control.Feedback type="invalid">
                {errores.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="pass-reg">
              <Form.Label>Ingrese su contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                isInvalid={!!errores.password}
                disabled={enviando}
              />
              <Form.Control.Feedback type="invalid">
                {errores.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="pass-confirm">
              <Form.Label>Reingrese su contraseña</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleChange}
                isInvalid={!!errores.confirmPassword}
                disabled={enviando}
              />
              <Form.Control.Feedback type="invalid">
                {errores.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Acepto términos y condiciones"
                name="aceptaTerminos"
                checked={formValues.aceptaTerminos}
                onChange={handleChange}
                isInvalid={!!errores.aceptaTerminos}
                feedback={errores.aceptaTerminos}
                feedbackType="invalid"
                id="checkbox-formu"
                disabled={enviando}
              />
            </Form.Group>

            <Button variant="danger" type="submit" className="w-100" disabled={enviando}>
              {enviando ? 'Registrando...' : 'Registrarse'}
            </Button>
          </Form>
        </Tab>

        <Tab eventKey="iniciar-sesion" title="Iniciar Sesión">
          <Form className="p-4" onSubmit={handleLoginSubmit}>

            {loginAlerta && (
              <Alert variant={loginAlerta.tipo} onClose={() => setLoginAlerta(null)} dismissible>
                {loginAlerta.mensaje}
              </Alert>
            )}

            <Form.Group className="mb-3" controlId="usuario-login">
              <Form.Label>Ingrese su usuario</Form.Label>
              <Form.Control
                type="text"
                name="usuario"
                value={loginValues.usuario}
                onChange={handleLoginChange}
                isInvalid={!!loginErrores.usuario}
                disabled={enviandoLogin}
              />
              <Form.Control.Feedback type="invalid">
                {loginErrores.usuario}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="pass-login">
              <Form.Label>Ingrese su contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={loginValues.password}
                onChange={handleLoginChange}
                isInvalid={!!loginErrores.password}
                disabled={enviandoLogin}
              />
              <Form.Control.Feedback type="invalid">
                {loginErrores.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="danger" type="submit" className="w-100" disabled={enviandoLogin}>
              {enviandoLogin ? 'Verificando...' : 'Iniciar sesión'}
            </Button>
          </Form>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default RegistroUsuario;