import React from 'react'
import './FilterBar.css'

function FilterBar({ filtros, onFiltroChange }) {
  return (
    <div className="filter-bar">
      <div className="filtro-grupo">
        <label>Estado</label>
        <div className="filtro-opciones">
          {['Todas', 'Pendiente', 'En Progreso', 'Completada'].map(op => (
            <button
              key={op}
              className={`filtro-btn ${filtros.estado === op ? 'activo' : ''}`}
              onClick={() => onFiltroChange('estado', op)}
            >
              {op}
            </button>
          ))}
        </div>
      </div>

      <div className="filtro-grupo">
        <label>Prioridad</label>
        <div className="filtro-opciones">
          {['Todas', 'Alta', 'Media', 'Baja'].map(op => (
            <button
              key={op}
              className={`filtro-btn ${filtros.prioridad === op ? 'activo' : ''}`}
              onClick={() => onFiltroChange('prioridad', op)}
            >
              {op}
            </button>
          ))}
        </div>
      </div>

      <div className="filtro-grupo">
        <label>Ordenar por</label>
        <select
          value={filtros.orden}
          onChange={e => onFiltroChange('orden', e.target.value)}
          className="orden-select"
        >
          <option value="recientes">Más recientes</option>
          <option value="antiguos">Más antiguos</option>
          <option value="fechaLimite">Fecha límite</option>
          <option value="prioridadAZ">Prioridad (Alta → Baja)</option>
          <option value="prioridadZA">Prioridad (Baja → Alta)</option>
          <option value="tituloAZ">Título A-Z</option>
          <option value="tituloZA">Título Z-A</option>
        </select>
      </div>
    </div>
  )
}

export default FilterBar
