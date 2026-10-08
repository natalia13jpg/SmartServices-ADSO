import './Button.css';

// Botón reutilizable para las acciones del sistema.
// Props:
//   texto         -> lo que dice el botón
//   variante      -> 'primario' (por defecto), 'secundario' o 'peligro'
//   tipo          -> 'button' (por defecto) o 'submit' si es de un formulario
//   onClick       -> función que se ejecuta al hacer clic
//   deshabilitado -> si es true, el botón no se puede pulsar
function Button({
  texto,
  variante = 'primario',
  tipo = 'button',
  onClick,
  deshabilitado = false,
}) {
  return (
    <button
      type={tipo}
      className={`boton boton--${variante}`}
      onClick={onClick}
      disabled={deshabilitado}
    >
      {texto}
    </button>
  );
}

export default Button;