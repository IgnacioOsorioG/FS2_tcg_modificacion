export const validarRegistro = (formValues) => {
  const { usuario, email, password, confirmPassword, aceptaTerminos } = formValues;
  const nuevosErrores = {};
  const rxEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (usuario.trim().length < 3) {
    nuevosErrores.usuario = 'El usuario debe tener al menos 3 caracteres.';
  }

  if (!rxEmail.test(email)) {
    nuevosErrores.email = 'Ingrese un correo válido (ej: nombre@dominio.cl).';
  }

  if (password.length < 6) {
    nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres.';
  }

  if (password !== confirmPassword) {
    nuevosErrores.confirmPassword = 'Las contraseñas no coinciden.';
  }

  if (!aceptaTerminos) {
    nuevosErrores.aceptaTerminos = 'Debe aceptar los términos y condiciones.';
  }

  return nuevosErrores;
};

export const validarLogin = (loginValues) => {
  const { usuario, password } = loginValues;
  const nuevosErrores = {};

  if (!usuario || usuario.trim() === '') {
    nuevosErrores.usuario = 'El usuario es requerido.';
  }

  if (!password || password.trim() === '') {
    nuevosErrores.password = 'La contraseña es requerida.';
  }

  return nuevosErrores;
};