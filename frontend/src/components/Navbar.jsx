import './Navbar.css';

// Barra de navegación superior.
// Props:
//   enlaces      -> lista de enlaces: [{ id: 'login', texto: 'Iniciar sesión' }, ...]
//   paginaActual -> id del enlace de la pantalla que está abierta
//   onNavegar    -> función que se ejecuta al pulsar un enlace (recibe el id)
function Navbar({ enlaces, paginaActual, onNavegar }) {
  return (
    <header className="navbar">
      <span className="navbar__logo">SmartService</span>

      <nav className="navbar__enlaces">
        {/* Se crea un botón por cada enlace de la lista */}
        {enlaces.map((enlace) => (
          <button
            key={enlace.id}
            type="button"
            className={`navbar__enlace ${
              paginaActual === enlace.id ? 'navbar__enlace--activo' : ''
            }`}
            onClick={() => onNavegar(enlace.id)}
          >
            {enlace.texto}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;