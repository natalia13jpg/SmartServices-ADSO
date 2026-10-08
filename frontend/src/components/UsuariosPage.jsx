import { useState } from 'react';
import './UsuariosPage.css';
import UserTable from './UserTable';
import ConfirmDialog from './ConfirmDialog';
import InputField from './InputField';
import SelectField from './SelectField';

// Pantalla de gestión de usuarios: listar, editar y eliminar.
// Props:
//   usuarios     -> lista de usuarios
//   setUsuarios  -> función para actualizar la lista
//   roles        -> lista de roles que se pueden elegir
function UsuariosPage({ usuarios, setUsuarios, roles }) {
  // Estado: usuario que se va a eliminar (null si no hay ninguno).
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

  // Estado: usuario que se está editando (null si no hay ninguno).
  const [usuarioAEditar, setUsuarioAEditar] = useState(null);

  // Estado: valores del formulario de edición.
  const [telefono, setTelefono] = useState('');
  const [rol, setRol] = useState('');
  const [errorTelefono, setErrorTelefono] = useState('');

  // Abre la ventana de edición con los datos actuales del usuario.
  function abrirEdicion(usuario) {
    setUsuarioAEditar(usuario);
    setTelefono(usuario.telefono);
    setRol(usuario.rol);
    setErrorTelefono('');
  }

  // Guarda los cambios (solo teléfono y rol, igual que UsuarioDAO.actualizar).
  function guardarEdicion() {
    if (!/^\d{7,10}$/.test(telefono)) {
      setErrorTelefono('Solo números (7 a 10 dígitos)');
      return;
    }
    setUsuarios(
      usuarios.map((u) =>
        u.idUsuario === usuarioAEditar.idUsuario ? { ...u, telefono, rol } : u
      )
    );
    setUsuarioAEditar(null);
  }

  // Elimina al usuario confirmado.
  function confirmarEliminacion() {
    setUsuarios(usuarios.filter((u) => u.idUsuario !== usuarioAEliminar.idUsuario));
    setUsuarioAEliminar(null);
  }

  return (
    <section className="usuarios">
      <h2 className="usuarios__titulo">Usuarios</h2>
      <p className="usuarios__subtitulo">Lista de usuarios registrados en el sistema</p>

      <UserTable
        usuarios={usuarios}
        onEditar={abrirEdicion}
        onEliminar={setUsuarioAEliminar}
      />

      {/* Ventana de confirmación para eliminar */}
      {usuarioAEliminar && (
        <ConfirmDialog
          titulo="Eliminar usuario"
          mensaje={`¿Seguro que desea eliminar a ${usuarioAEliminar.nombre} ${usuarioAEliminar.apellido}? Esta acción no se puede deshacer.`}
          textoConfirmar="Eliminar"
          variante="peligro"
          onConfirmar={confirmarEliminacion}
          onCancelar={() => setUsuarioAEliminar(null)}
        />
      )}

      {/* Ventana para editar teléfono y rol */}
      {usuarioAEditar && (
        <ConfirmDialog
          titulo="Editar usuario"
          mensaje={`${usuarioAEditar.nombre} ${usuarioAEditar.apellido}`}
          textoConfirmar="Guardar"
          onConfirmar={guardarEdicion}
          onCancelar={() => setUsuarioAEditar(null)}
        >
          <InputField
            etiqueta="Teléfono"
            nombre="telefonoEditar"
            tipo="tel"
            valor={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            error={errorTelefono}
          />
          <SelectField
            etiqueta="Rol"
            nombre="rolEditar"
            opciones={roles}
            valor={rol}
            onChange={(e) => setRol(e.target.value)}
          />
        </ConfirmDialog>
      )}
    </section>
  );
}

export default UsuariosPage;