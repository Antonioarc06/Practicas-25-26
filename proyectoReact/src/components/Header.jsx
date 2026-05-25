import React from 'react'
import './Header.css'

function Header({ totalTareas }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1>📋 Task Manager</h1>
        <span className="contador">{totalTareas} {totalTareas === 1 ? 'tarea' : 'tareas'}</span>
      </div>
    </header>
  )
}

export default Header
