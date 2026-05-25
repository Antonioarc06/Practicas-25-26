import React, { useState, useEffect } from 'react'
import './TaskForm.css'

const estadoInicial = {
  titulo: '',
  descripcion: '',
  prioridad: 'Media',
  estado: 'Pendiente',
  fechaLimite: '',
}

function TaskForm({ onGuardar, tareaEditar, onCancelar }) {
  const [form, setForm] = useState(estadoInicial)
  const [error, setError] = useState('')

  // Si hay una tarea para editar, cargamos sus datos en el formulario
  useEffect(() => {
    if (tareaEditar) {
      setForm(tareaEditar)
    } else {
      setForm(estadoInicial)
    }
  }, [tareaEditar])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.titulo.trim()) {
      setError('El título es obligatorio')
      return
    }
    onGuardar(form)
    setForm(estadoInicial)
  }

  return (
    <div className="task-form-container">
      <h2>{tareaEditar ? '✏️ Editar Tarea' : '➕ Nueva Tarea'}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="campo">
          <label>Título *</label>
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            maxLength={100}
            placeholder="Escribe el título de la tarea..."
          />
          {error && <span className="error">{error}</span>}
        </div>

        <div className="campo">
          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            maxLength={500}
            rows={3}
            placeholder="Descripción opcional..."
          />
        </div>

        <div className="fila-campos">
          <div className="campo">
            <label>Prioridad</label>
            <select name="prioridad" value={form.prioridad} onChange={handleChange}>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>

          <div className="campo">
            <label>Estado</label>
            <select name="estado" value={form.estado} onChange={handleChange}>
              <option value="Pendiente">Pendiente</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Completada">Completada</option>
            </select>
          </div>

          <div className="campo">
            <label>Fecha Límite</label>
            <input
              type="date"
              name="fechaLimite"
              value={form.fechaLimite}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-botones">
          <button type="submit" className="btn-guardar">
            {tareaEditar ? 'Guardar Cambios' : 'Crear Tarea'}
          </button>
          {tareaEditar && (
            <button type="button" className="btn-cancelar" onClick={onCancelar}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default TaskForm
