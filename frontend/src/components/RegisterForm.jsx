import { useState } from 'react';
import './RegisterForm.css';
import Button from './Button';
import InputField from './InputField';
import SelectField from './SelectField';

// Formulario de registro de usuarios (pantalla 2 del prototipo).
// Props:
//   roles        -> lista de roles que se pueden elegir
//   onRegistrar  -> función que se ejecuta si los datos son válidos
//   onIrALogin   -> función que se ejecuta al pulsar "Inicia sesión"
function RegisterForm({ roles, onRegistrar, onIrALogin }) {
  // Estado: todos los campos del formulario en un solo objeto.
  const [datos, setDatos] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    negocio: '',
    clave: '',
    rol: '',
    confirmar: '',
    ciudad: '',
  });

  // Estado: mensajes de error de cada campo.
  const [errores, setErrores] = useState({});

  // Actualiza un solo campo sin perder los demás.
  function cambiar(campo, valor) {
    setDatos({ ...datos, [campo]: valor });
  }

  // Revisa los datos y devuelve los errores encontrados.
  function validar() {
    const e = {};
    if (!datos.nombre.trim()) e.nombre = 'Ingrese su nombre completo';
    if (!/^\d{7,10}$/.test(datos.telefono)) e.telefono = 'Solo números (7 a 10 dígitos)';
    if (!datos.correo.includes('@')) e.correo = 'Ingrese un correo válido';
    if (datos.rol === 'Negocio' && !datos.negocio.trim()) {
      e.negocio = 'Ingrese el nombre del negocio';
    }
    if (datos.clave.length < 6) e.clave = 'Mínimo 6 caracteres';
    if (!datos.rol) e.rol = 'Seleccione un rol';
    if (datos.confirmar !== datos.clave) e.confirmar = 'Las contraseñas no coinciden';
    if (!datos.ciudad.trim()) e.ciudad = 'Ingrese su ciudad';
    return e;
  }

  // Se ejecuta al enviar el formulario.
  function manejarEnvio(evento) {
    evento.preventDefault(); // evita que la página se recargue
    const nuevosErrores = validar();
    setErrores(nuevosErrores);

    // Si no hay errores, se avisa a la pantalla principal.
    if (Object.keys(nuevosErrores).length === 0) {
      onRegistrar(datos);
    }
  }

  return (
    <form className="registro" onSubmit={manejarEnvio} noValidate>
      <h2 className="registro__titulo">Registro de nuevos usuarios</h2>
      <p className="registro__subtitulo">
        Crea tu cuenta para empezar a publicar tu negocio
      </p>

      <InputField
        etiqueta="Nombre completo"
        nombre="nombre"
        valor={datos.nombre}
        onChange={(e) => cambiar('nombre', e.target.value)}
        error={errores.nombre}
      />

      <InputField
        etiqueta="Teléfono"
        nombre="telefono"
        tipo="tel"
        valor={datos.telefono}
        onChange={(e) => cambiar('telefono', e.target.value)}
        error={errores.telefono}
      />

      <InputField
        etiqueta="Correo electrónico"
        nombre="correo"
        tipo="email"
        valor={datos.correo}
        onChange={(e) => cambiar('correo', e.target.value)}
        placeholder="ejemplo@correo.com"
        error={errores.correo}
      />

      <SelectField
        etiqueta="Rol"
        nombre="rol"
        opciones={roles}
        valor={datos.rol}
        onChange={(e) => cambiar('rol', e.target.value)}
        textoInicial="Seleccione un rol"
        error={errores.rol}
      />

      {/* El campo del negocio solo aparece si el rol es Negocio */}
      {datos.rol === 'Negocio' && (
        <InputField
          etiqueta="Nombre del negocio"
          nombre="negocio"
          valor={datos.negocio}
          onChange={(e) => cambiar('negocio', e.target.value)}
          error={errores.negocio}
        />
      )}

      <InputField
        etiqueta="Ciudad"
        nombre="ciudad"
        valor={datos.ciudad}
        onChange={(e) => cambiar('ciudad', e.target.value)}
        error={errores.ciudad}
      />

      <InputField
        etiqueta="Contraseña"
        nombre="clave"
        tipo="password"
        valor={datos.clave}
        onChange={(e) => cambiar('clave', e.target.value)}
        error={errores.clave}
      />

      <InputField
        etiqueta="Confirmar contraseña"
        nombre="confirmar"
        tipo="password"
        valor={datos.confirmar}
        onChange={(e) => cambiar('confirmar', e.target.value)}
        error={errores.confirmar}
      />

      <div className="registro__acciones">
        <Button texto="Registrarse" tipo="submit" />
        <p className="registro__enlace">
          ¿Ya tienes cuenta?{' '}
          <button type="button" className="registro__boton-enlace" onClick={onIrALogin}>
            Inicia sesión
          </button>
        </p>
      </div>
    </form>
  );
}

export default RegisterForm;