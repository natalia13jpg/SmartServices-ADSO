import './InputField.css';

// Campo desplegable reutilizable (por ejemplo, para elegir un rol).
// Reutiliza los estilos de InputField.
// Props:
//   etiqueta     -> texto que aparece encima del campo
//   nombre       -> identificador del campo
//   opciones     -> lista de opciones: ['Administrador', 'Cliente', 'Negocio']
//   valor        -> opción seleccionada
//   onChange     -> función que se ejecuta al elegir una opción
//   textoInicial -> texto de la opción vacía
//   error        -> mensaje de error; si viene vacío no se muestra
function SelectField({
  etiqueta,
  nombre,
  opciones,
  valor,
  onChange,
  textoInicial = 'Seleccione una opción',
  error = '',
}) {
  return (
    <div className="campo">
      <label htmlFor={nombre} className="campo__etiqueta">
        {etiqueta}
      </label>

      <select
        id={nombre}
        name={nombre}
        value={valor}
        onChange={onChange}
        className={`campo__input ${error ? 'campo__input--error' : ''}`}
      >
        <option value="">{textoInicial}</option>
        {/* Se crea una opción por cada elemento de la lista */}
        {opciones.map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>

      {error && <span className="campo__error">{error}</span>}
    </div>
  );
}

export default SelectField;