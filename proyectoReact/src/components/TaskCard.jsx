import React from 'react'
import './TaskCard.css'

// Mapeo de colores por prioridad
const prioridadConfig = {
  Alta: { clase: 'alta', emoji: '🔴' },
  Media: { clase: 'media', emoji: '🟡' },
  Baja: { clase: 'baja', emoji: '🟢' },
}

const estadoConfig = {
  Pendiente: { clase: 'pendiente', emoji: '⏳' },
  'En Progreso': { clase: 'progreso', emoji: '🔄' },
  Completada: { clase: 'completada', emoji: '✅' },
}

function TaskCard({ tarea, onEditar, onEliminar, onCompletar }) {
  const prioridad = prioridadConfig[tarea.prioridad] || prioridadConfig.Media
  const estado = estadoConfig[tarea.estado] || estadoConfig.Pendiente
  const estaCompletada = tarea.estado === 'Completada'

  // Formatear la fecha para mostrar de forma legible
  function formatearFecha(fecha) {
    if (!fecha) return null
    const [anio, mes, dia] = fecha.split('-')
    return `${dia}/${mes}/${anio}`
  }

  function confirmarEliminar() {
    if (window.confirm(`¿Seguro que quieres eliminar "${tarea.titulo}"?`)) {
      onEliminar(tarea.id)
    }
  }

  return (
    <div className={`task-card ${estaCompletada ? 'completada' : ''}`}>
      {/* Indicador de prioridad */}
      <div className={`prioridad-barra ${prioridad.clase}`} />

      <div className="task-card-body">
        <div className="task-card-top">
          <h3 className={`task-titulo ${estaCompletada ? 'tachado' : ''}`}>
            {tarea.titulo}
          </h3>
          <div className="task-badges">
            <span className={`badge prioridad-badge ${prioridad.clase}`}>
              {prioridad.emoji} {tarea.prioridad}
            </span>
            <span className={`badge estado-badge ${estado.clase}`}>
              {estado.emoji} {tarea.estado}
            </span>
          </div>
        </div>

        {tarea.descripcion && (
          <p className="task-descripcion">
            {tarea.descripcion.length > 100
              ? tarea.descripcion.substring(0, 100) + '...'
              : tarea.descripcion}
          </p>
        )}

        {tarea.fechaLimite && (
          <p className="task-fecha">📅 Fecha límite: {formatearFecha(tarea.fechaLimite)}</p>
        )}

        <div className="task-acciones">
          {!estaCompletada && (
            <button className="btn-completar" onClick={() => onCompletar(tarea.id)}>
              ✅ Completar
            </button>
          )}
          <button className="btn-editar" onClick={() => onEditar(tarea)}>
            ✏️ Editar
          </button>
          <button className="btn-eliminar" onClick={confirmarEliminar}>
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
