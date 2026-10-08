import { useState } from 'react';
import './LoginForm.css';
import Button from './Button';
import InputField from './InputField';
import SelectField from './SelectField';

// Formulario de inicio de sesión (pantalla 3 del prototipo).
// Props:
//   roles         -> lista de roles que se pueden elegir
//   onIngresar    -> función que se ejecuta si los datos son válidos
//   onCrearCuenta -> función que se ejecuta al pulsar "Crear cuenta"
function LoginForm({ roles, onIngresar, onCrearCuenta }) {
  // Estado: lo que el usuario escribe o elige en cada campo.
  const [rol, setRol] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [recordar, setRecordar] = useState(false);

  // Estado: mensajes de error de cada campo.
  const [errores, setErrores] = useState({});

  // Revisa los datos y devuelve los errores encontrados.
  function validar() {
    const nuevosErrores = {};
    if (!rol) nuevosErrores.rol = 'Seleccione un rol';
    if (!correo.includes('@')) nuevosErrores.correo = 'Ingrese un correo válido';
    if (clave.length < 6) nuevosErrores.clave = 'Mínimo 6 caracteres';
    return nuevosErrores;
  }

  // Se ejecuta al enviar el formulario.
  function manejarEnvio(evento) {
    evento.preventDefault(); // evita que la página se recargue
    const nuevosErrores = validar();
    setErrores(nuevosErrores);

    // Si no hay errores, se avisa a la pantalla principal.
    if (Object.keys(nuevosErrores).length === 0) {
      onIngresar({ rol, correo, recordar });
    }
  }

  return (
    <form className="login" onSubmit={manejarEnvio} noValidate>
      <h2 className="login__titulo">Iniciar sesión</h2>
      <p className="login__subtitulo">Ingrese sus credenciales para continuar</p>

      <SelectField
        etiqueta="Rol"
        nombre="rol"
        opciones={roles}
        valor={rol}
        onChange={(e) => setRol(e.target.value)}
        textoInicial="Seleccione un rol"
        error={errores.rol}
      />

      <InputField
        etiqueta="Correo electrónico"
        nombre="correo"
        tipo="email"
        valor={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="ejemplo@correo.com"
        error={errores.correo}
      />

      <InputField
        etiqueta="Contraseña"
        nombre="clave"
        tipo="password"
        valor={clave}
        onChange={(e) => setClave(e.target.value)}
        error={errores.clave}
      />

      <label className="login__recordar">
        <input
          type="checkbox"
          checked={recordar}
          onChange={(e) => setRecordar(e.target.checked)}
        />
        Recordarme
      </label>

      <div className="login__acciones">
        <Button texto="Iniciar sesión" tipo="submit" />
        <span className="login__separador">o</span>
        <Button texto="Crear cuenta" variante="secundario" onClick={onCrearCuenta} />
      </div>
    </form>
  );
}

export default LoginForm;