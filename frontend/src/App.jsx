import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UsuariosPage from './components/UsuariosPage';

// Lista de pantallas a las que se puede navegar.
const enlaces = [
  { id: 'login', texto: 'Iniciar sesión' },
  { id: 'registro', texto: 'Registrarse' },
  { id: 'usuarios', texto: 'Usuarios' },
];

// Roles que se pueden elegir (los mismos de la tabla usuarios de la base de datos).
const roles = ['Administrador', 'Cliente', 'Negocio'];

// Usuarios de ejemplo. Más adelante se reemplazarán por los datos reales
// que entregue el backend cuando se conecte la API.
const usuariosEjemplo = [
  {
    idUsuario: 1,
    nombre: 'Laura',
    apellido: 'Gómez',
    correo: 'laura.gomez@ejemplo.com',
    telefono: '3001234567',
    rol: 'Administrador',
    estado: true,
  },
  {
    idUsuario: 2,
    nombre: 'Carlos',
    apellido: 'Rojas',
    correo: 'carlos.rojas@ejemplo.com',
    telefono: '3109876543',
    rol: 'Negocio',
    estado: true,
  },
  {
    idUsuario: 3,
    nombre: 'Marta',
    apellido: 'Pérez',
    correo: 'marta.perez@ejemplo.com',
    telefono: '3201112233',
    rol: 'Cliente',
    estado: false,
  },
];

function App() {
  // Estado: guarda qué pantalla se está mostrando.
  const [pagina, setPagina] = useState('login');

  // Estado: lista de usuarios del sistema.
  const [usuarios, setUsuarios] = useState(usuariosEjemplo);

  // Agrega a la lista al usuario que se acaba de registrar.
  function registrarUsuario(datos) {
    const partes = datos.nombre.trim().split(' ');
    const nuevoId = usuarios.length ? Math.max(...usuarios.map((u) => u.idUsuario)) + 1 : 1;

    const nuevoUsuario = {
      idUsuario: nuevoId,
      nombre: partes[0],
      apellido: partes.slice(1).join(' '),
      correo: datos.correo,
      telefono: datos.telefono,
      rol: datos.rol,
      estado: true,
    };

    setUsuarios([...usuarios, nuevoUsuario]);
    alert(`Registro válido. Bienvenido, ${nuevoUsuario.nombre}`);
    setPagina('login');
  }

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
          onRegistrar={registrarUsuario}
          onIrALogin={() => setPagina('login')}
        />
      )}

      {pagina === 'usuarios' && (
        <UsuariosPage usuarios={usuarios} setUsuarios={setUsuarios} roles={roles} />
      )}
    </>
  );
}

export default App;