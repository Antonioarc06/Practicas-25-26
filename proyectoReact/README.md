# 📋 Task Manager

Aplicación web de gestión de tareas desarrollada con React para las PFE

## Descripción

Task Manager permite crear, visualizar, editar y eliminar tareas de forma sencilla. Las tareas se guardan automáticamente en el navegador, por lo que no se pierden al recargar la página.

## Funcionalidades

- ✅ Crear tareas con título, descripción, prioridad, estado y fecha límite
- ✅ Editar tareas existentes
- ✅ Eliminar tareas (con confirmación)
- ✅ Marcar tareas como completadas
- ✅ Filtrar por estado (Pendiente, En Progreso, Completada)
- ✅ Filtrar por prioridad (Alta, Media, Baja)
- ✅ Ordenar por varios criterios
- ✅ Persistencia de datos con localStorage
- ✅ Diseño responsive

## Tecnologías

- **React 18** - Framework de UI
- **Vite** - Herramienta de build
- **CSS** - Estilos con variables CSS
- **localStorage** - Persistencia de datos
- **uuid** - Generación de IDs únicos

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Arrancar en modo desarrollo
npm run dev
```

Luego abre el navegador en `http://localhost:5173`

## Estructura del proyecto

```
src/
├── components/
│   ├── Header.jsx       # Cabecera con contador de tareas
│   ├── TaskForm.jsx     # Formulario crear/editar
│   ├── TaskList.jsx     # Lista de tareas
│   ├── TaskCard.jsx     # Tarjeta individual de tarea
│   └── FilterBar.jsx    # Controles de filtrado y ordenación
├── hooks/
│   └── useLocalStorage.js  # Hook para persistencia
├── App.jsx              # Componente principal con toda la lógica
└── main.jsx             # Punto de entrada
```
