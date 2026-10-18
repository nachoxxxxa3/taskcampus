import { useState } from "react";
import { useTareas } from "./hooks/useTareas";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Card from "./components/Card";
import TaskList from "./components/TaskList";
import TaskSummary from "./components/TaskSummary";
import TaskForm from "./components/TaskForm";
import Modal from "./components/Modal";
import "./App.css";

const App = () => {
  const { tareas, cargando, error, operando, agregarTarea, completarTarea, editarTitulo, eliminarTarea } = useTareas();
  
  // Estados levantados (Lifting State Up)
  const [vistaActiva, setVistaActiva] = useState("resumen");
  const [filtro, setFiltro] = useState("todas");
  const [busqueda, setBusqueda] = useState("");
  const [tareaAEliminar, setTareaAEliminar] = useState(null);

  // Derivación de datos: Tareas Filtradas y Buscadas
  const tareasFiltradas = tareas.filter((t) => {
    const matchFiltro = filtro === "todas" || (filtro === "pendientes" && !t.completada) || (filtro === "completadas" && t.completada);
    const matchBusqueda = t.titulo.toLowerCase().includes(busqueda.toLowerCase());
    return matchFiltro && matchBusqueda;
  });

  const handleAgregar = (titulo) => {
    agregarTarea(titulo);
    setVistaActiva("tareas"); // Manda al usuario a la lista tras agregar
  };

  const handleConfirmarEliminacion = () => {
    eliminarTarea(tareaAEliminar);
    setTareaAEliminar(null);
  };

  return (
    <div className="app-container">
      <Header title="TaskCampus" description="Gestiona tus tareas académicas" />
      
      {/* Navegación entre vistas */}
      <Navigation vistaActiva={vistaActiva} setVistaActiva={setVistaActiva} />

      {/* Renderizado Condicional de las Vistas */}
      {vistaActiva === "resumen" && (
        <Card titulo="Resumen de tareas">
          <TaskSummary 
            total={tareas.length}
            completadas={tareas.filter(t => t.completada).length}
            pendientes={tareas.filter(t => !t.completada).length}
            mostrando={tareasFiltradas.length}
            filtroActual={filtro}
          />
        </Card>
      )}

      {vistaActiva === "nueva" && (
        <Card titulo="Agregar Nueva Tarea">
          <TaskForm onAgregar={handleAgregar} operando={operando} />
        </Card>
      )}

      {vistaActiva === "tareas" && (
        <Card titulo="Mis tareas">
          <TaskList 
            tareas={tareasFiltradas} 
            filtro={filtro} setFiltro={setFiltro}
            busqueda={busqueda} setBusqueda={setBusqueda}
            onCompletar={completarTarea} 
            onEliminar={setTareaAEliminar} 
            onEditar={editarTitulo}
            cargando={cargando} 
            error={error} 
            operando={operando}
          />
        </Card>
      )}

      <Modal
        visible={tareaAEliminar !== null}
        mensaje="¿Seguro que deseas eliminar esta tarea? Esta acción no se puede deshacer."
        onConfirmar={handleConfirmarEliminacion}
        onCancelar={() => setTareaAEliminar(null)}
      />
    </div>
  );
};

export default App;