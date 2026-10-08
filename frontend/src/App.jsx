import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

// Lista de pantallas a las que se puede navegar.
const enlaces = [
  { id: 'login', texto: 'Iniciar sesión' },
  { id: 'registro', texto: 'Registrarse' },
  { id: 'usuarios', texto: 'Usuarios' },
];

// Roles que se pueden elegir (los mismos de la tabla usuarios de la base de datos).
const roles = ['Administrador', 'Cliente', 'Negocio'];

function App() {
  // Estado: guarda qué pantalla se está mostrando.
  const [pagina, setPagina] = useState('login');

  return (
    <>
      <Navbar enlaces={enlaces} paginaActual={pagina} onNavegar={setPagina} />

      {pagina === 'login' && (
        <LoginForm
          roles={roles}
          onIngresar={(datos) => alert(`Datos válidos. Rol: ${datos.rol}`)}
          onCrearCuenta={() => setPagina('registro')}
        />
      )}

      {pagina === 'registro' && (
        <RegisterForm
          roles={roles}
          onRegistrar={(datos) => {
            alert(`Registro válido. Bienvenido, ${datos.nombre}`);
            setPagina('login');
          }}
          onIrALogin={() => setPagina('login')}
        />
      )}

      {pagina === 'usuarios' && (
        <div className="pagina-prueba">
          <h1>Pantalla: usuarios</h1>
          <p>Esta pantalla se construye en el siguiente paso.</p>
        </div>
      )}
    </>
  );
}

export default App;