import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Button from './components/Button';
import InputField from './components/InputField';

// Lista de pantallas a las que se puede navegar.
const enlaces = [
  { id: 'login', texto: 'Iniciar sesión' },
  { id: 'registro', texto: 'Registrarse' },
  { id: 'usuarios', texto: 'Usuarios' },
];

function App() {
  // Estado: guarda qué pantalla se está mostrando.
  const [pagina, setPagina] = useState('login');

  // Estado: guarda lo que el usuario escribe en cada campo de prueba.
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');

  return (
    <>
      <Navbar enlaces={enlaces} paginaActual={pagina} onNavegar={setPagina} />

      <div className="pagina-prueba">
        <h1>Pantalla: {pagina}</h1>

        <InputField
          etiqueta="Correo electrónico"
          nombre="correo"
          tipo="email"
          valor={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="ejemplo@correo.com"
        />

        <InputField
          etiqueta="Contraseña"
          nombre="clave"
          tipo="password"
          valor={clave}
          onChange={(e) => setClave(e.target.value)}
          error={clave.length > 0 && clave.length < 6 ? 'Mínimo 6 caracteres' : ''}
        />

        <div className="pagina-prueba__botones">
          <Button texto="Guardar" onClick={() => alert('Guardado')} />
          <Button texto="Cancelar" variante="secundario" />
          <Button texto="Eliminar" variante="peligro" />
        </div>
      </div>
    </>
  );
}

export default App;