import Button from "./Button";
import EmptyState from "./EmptyState";
import TaskItem from "./TaskItem";

function TaskList({ tareas, filtro, setFiltro, busqueda, setBusqueda, onCompletar, onEliminar, onEditar, cargando, error, operando }) {
  if (cargando) return <p>⏳ Cargando tareas...</p>;
  if (error) return <p className="form-error">⚠️ Error: {error}</p>;

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
        {/* Buscador de texto */}
        <input
          type="text"
          className="task-input"
          placeholder="🔍 Buscar tarea por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        
        {/* Botones de filtro */}
        <div style={{ display: "flex", gap: "8px" }}>
          <Button label="📄 Todas" onClick={() => setFiltro("todas")} variant={filtro === "todas" ? "primary" : "secondary"} />
          <Button label="⏳ Pendientes" onClick={() => setFiltro("pendientes")} variant={filtro === "pendientes" ? "primary" : "secondary"} />
          <Button label="✅ Completadas" onClick={() => setFiltro("completadas")} variant={filtro === "completadas" ? "primary" : "secondary"} />
        </div>
      </div>

      <ul className="task-list">
        {tareas.map((tarea) => (
          <TaskItem key={tarea.id} tarea={tarea} onCompletar={onCompletar} onEliminar={onEliminar} onEditar={onEditar} operando={operando} />
        ))}
      </ul>

      {tareas.length === 0 && (
        <EmptyState 
          icono={busqueda ? "🕵️‍♂️" : filtro === "completadas" ? "📝" : "🎉"}
          mensaje={
            busqueda ? "No se encontraron tareas con esa búsqueda." :
            filtro === "completadas" ? "No tienes tareas completadas aún." :
            filtro === "pendientes" ? "¡Genial! No tienes tareas pendientes." :
            "No hay tareas en tu lista."
          } 
        />
      )}
    </div>
  );
}

export default TaskList;