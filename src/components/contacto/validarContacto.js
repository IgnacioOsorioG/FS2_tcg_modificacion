export const validarContacto = (datos) => {
  const { nombre, email, asunto, mensaje } = datos;
  const errores = {};
  const rxEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nombre || nombre.trim().length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres.';
  }

  if (!email || !rxEmail.test(email)) {
    errores.email = 'Ingrese un correo válido (ej: nombre@dominio.cl).';
  }

  if (!asunto || asunto === "") {
    errores.asunto = 'Debes seleccionar un asunto.';
  }

  if (!mensaje || mensaje.trim().length < 10) {
    errores.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
  }

  return errores;
};