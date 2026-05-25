import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'
import { useLocalStorage } from './hooks/useLocalStorage'
import './App.css'

// Valores por defecto de los filtros
const filtrosIniciales = {
  estado: 'Todas',
  prioridad: 'Todas',
  orden: 'recientes',
}

// Orden de prioridad para ordenar
const ordenPrioridad = { Alta: 1, Media: 2, Baja: 3 }

function App() {
  const [tareas, setTareas] = useLocalStorage('tareas', [])
  const [tareaEditar, setTareaEditar] = useState(null)
  const [filtros, setFiltros] = useState(filtrosIniciales)
  const [mensaje, setMensaje] = useState('')

  // Muestra un mensaje de confirmación temporal
  function mostrarMensaje(texto) {
    setMensaje(texto)
    setTimeout(() => setMensaje(''), 3000)
  }

  // Crear o editar tarea
  function handleGuardar(form) {
    if (tareaEditar) {
      // Editar tarea existente
      setTareas(tareas.map(t => t.id === tareaEditar.id ? { ...form, id: tareaEditar.id, creadaEn: tareaEditar.creadaEn } : t))
      setTareaEditar(null)
      mostrarMensaje('✅ Tarea editada correctamente')
    } else {
      // Crear tarea nueva
      const nueva = { ...form, id: uuidv4(), creadaEn: new Date().toISOString() }
      setTareas([nueva, ...tareas])
      mostrarMensaje('✅ Tarea creada correctamente')
    }
  }

  // Eliminar tarea
  function handleEliminar(id) {
    setTareas(tareas.filter(t => t.id !== id))
    mostrarMensaje('🗑️ Tarea eliminada')
  }

  // Marcar como completada
  function handleCompletar(id) {
    setTareas(tareas.map(t => t.id === id ? { ...t, estado: 'Completada' } : t))
    mostrarMensaje('✅ Tarea completada')
  }

  // Cambiar filtros
  function handleFiltroChange(tipo, valor) {
    setFiltros({ ...filtros, [tipo]: valor })
  }

  // Cancelar edición
  function handleCancelar() {
    setTareaEditar(null)
  }

  // Filtrar y ordenar las tareas
  const tareasFiltradas = tareas
    .filter(t => {
      if (filtros.estado !== 'Todas' && t.estado !== filtros.estado) return false
      if (filtros.prioridad !== 'Todas' && t.prioridad !== filtros.prioridad) return false
      return true
    })
    .sort((a, b) => {
      switch (filtros.orden) {
        case 'recientes':
          return new Date(b.creadaEn) - new Date(a.creadaEn)
        case 'antiguos':
          return new Date(a.creadaEn) - new Date(b.creadaEn)
        case 'fechaLimite':
          if (!a.fechaLimite) return 1
          if (!b.fechaLimite) return -1
          return new Date(a.fechaLimite) - new Date(b.fechaLimite)
        case 'prioridadAZ':
          return ordenPrioridad[a.prioridad] - ordenPrioridad[b.prioridad]
        case 'prioridadZA':
          return ordenPrioridad[b.prioridad] - ordenPrioridad[a.prioridad]
        case 'tituloAZ':
          return a.titulo.localeCompare(b.titulo)
        case 'tituloZA':
          return b.titulo.localeCompare(a.titulo)
        default:
          return 0
      }
    })

  return (
    <div className="app">
      <Header totalTareas={tareas.length} />

      <main className="app-main">
        {mensaje && <div className="mensaje-toast">{mensaje}</div>}

        <TaskForm
          onGuardar={handleGuardar}
          tareaEditar={tareaEditar}
          onCancelar={handleCancelar}
        />

        <FilterBar filtros={filtros} onFiltroChange={handleFiltroChange} />

        <div className="resultados-info">
          Mostrando {tareasFiltradas.length} de {tareas.length} tareas
        </div>

        <TaskList
          tareas={tareasFiltradas}
          onEditar={setTareaEditar}
          onEliminar={handleEliminar}
          onCompletar={handleCompletar}
        />
      </main>
    </div>
  )
}

export default App
