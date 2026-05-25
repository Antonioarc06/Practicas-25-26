import React from 'react'
import TaskCard from './TaskCard'
import './TaskList.css'

function TaskList({ tareas, onEditar, onEliminar, onCompletar }) {
  if (tareas.length === 0) {
    return (
      <div className="task-list-vacio">
        <p>😕 No hay tareas que mostrar</p>
        <p className="vacio-sub">Crea una nueva tarea o ajusta los filtros</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tareas.map(tarea => (
        <TaskCard
          key={tarea.id}
          tarea={tarea}
          onEditar={onEditar}
          onEliminar={onEliminar}
          onCompletar={onCompletar}
        />
      ))}
    </div>
  )
}

export default TaskList
