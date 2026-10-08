import './UserTable.css';
import Button from './Button';

// Tabla que muestra la lista de usuarios.
// Props:
//   usuarios   -> lista de usuarios a mostrar
//   onEditar   -> función que se ejecuta al pulsar "Editar" (recibe el usuario)
//   onEliminar -> función que se ejecuta al pulsar "Eliminar" (recibe el usuario)
function UserTable({ usuarios, onEditar, onEliminar }) {
  // Si no hay usuarios, se muestra un mensaje en lugar de la tabla.
  if (usuarios.length === 0) {
    return <p className="tabla__vacia">No hay usuarios registrados.</p>;
  }

  return (
    <div className="tabla__contenedor">
      <table className="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Se crea una fila por cada usuario */}
          {usuarios.map((usuario) => (
            <tr key={usuario.idUsuario}>
              <td>{usuario.idUsuario}</td>
              <td>
                {usuario.nombre} {usuario.apellido}
              </td>
              <td>{usuario.correo}</td>
              <td>{usuario.telefono}</td>
              <td>{usuario.rol}</td>
              <td>{usuario.estado ? 'Activo' : 'Inactivo'}</td>
              <td className="tabla__acciones">
                <Button
                  texto="Editar"
                  variante="secundario"
                  onClick={() => onEditar(usuario)}
                />
                <Button
                  texto="Eliminar"
                  variante="peligro"
                  onClick={() => onEliminar(usuario)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;