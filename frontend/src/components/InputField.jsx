import { useState } from 'react';
import './InputField.css';

// Campo de formulario reutilizable.
// Props:
//   etiqueta    -> texto que aparece encima del campo
//   nombre      -> identificador del campo (enlaza la etiqueta con el campo)
//   tipo        -> 'text' (por defecto), 'email', 'password', etc.
//   valor       -> lo que contiene el campo
//   onChange    -> función que se ejecuta cada vez que el usuario escribe
//   placeholder -> texto de ayuda dentro del campo
//   error       -> mensaje de error; si viene vacío no se muestra nada
function InputField({
  etiqueta,
  nombre,
  tipo = 'text',
  valor,
  onChange,
  placeholder = '',
  error = '',
}) {
  // Estado: guarda si la contraseña está visible u oculta.
  const [verContrasena, setVerContrasena] = useState(false);

  // Si es un campo de contraseña y está visible, se muestra como texto.
  const esContrasena = tipo === 'password';
  const tipoFinal = esContrasena && verContrasena ? 'text' : tipo;

  return (
    <div className="campo">
      <label htmlFor={nombre} className="campo__etiqueta">
        {etiqueta}
      </label>

      <div className="campo__contenedor">
        <input
          id={nombre}
          name={nombre}
          type={tipoFinal}
          value={valor}
          onChange={onChange}
          placeholder={placeholder}
          className={`campo__input ${error ? 'campo__input--error' : ''}`}
        />

        {/* Botón para mostrar u ocultar la contraseña */}
        {esContrasena && (
          <button
            type="button"
            className="campo__ver"
            onClick={() => setVerContrasena(!verContrasena)}
          >
            {verContrasena ? 'Ocultar' : 'Ver'}
          </button>
        )}
      </div>

      {/* Mensaje de error, solo si existe */}
      {error && <span className="campo__error">{error}</span>}
    </div>
  );
}

export default InputField;