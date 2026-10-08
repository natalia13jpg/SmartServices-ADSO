import './ConfirmDialog.css';
import Button from './Button';

// Ventana emergente para confirmar una acción o pedir datos breves.
// Props:
//   titulo          -> título de la ventana
//   mensaje         -> texto explicativo (opcional)
//   textoConfirmar  -> texto del botón de confirmación
//   variante        -> 'primario' o 'peligro' (color del botón de confirmación)
//   onConfirmar     -> función que se ejecuta al confirmar
//   onCancelar      -> función que se ejecuta al cancelar
//   children        -> contenido extra dentro de la ventana (por ejemplo, campos)
function ConfirmDialog({
  titulo,
  mensaje,
  textoConfirmar = 'Confirmar',
  variante = 'primario',
  onConfirmar,
  onCancelar,
  children,
}) {
  return (
    <div className="dialogo__fondo">
      <div className="dialogo" role="dialog" aria-modal="true">
        <h3 className="dialogo__titulo">{titulo}</h3>
        {mensaje && <p className="dialogo__mensaje">{mensaje}</p>}

        {children}

        <div className="dialogo__acciones">
          <Button texto="Cancelar" variante="secundario" onClick={onCancelar} />
          <Button texto={textoConfirmar} variante={variante} onClick={onConfirmar} />
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;