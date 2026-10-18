import { useState } from "react";
import Badge from "./Badge";
import Button from "./Button";

const TaskItem = ({ tarea, onCompletar, onEliminar, onEditar, operando }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(tarea.titulo);

  const handleSave = () => {
    if (editValue.trim() !== "" && editValue !== tarea.titulo) {
      onEditar(tarea.id, editValue.trim());
    } else {
      setEditValue(tarea.titulo); // Si está vacío, restaura el original
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditValue(tarea.titulo);
      setIsEditing(false);
    }
  };

  return (
    <li className="task-item">
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
        <Badge texto={tarea.completada ? "completada" : "pendiente"} onClick={() => !operando && onCompletar(tarea.id, tarea.completada)} />
        
        {isEditing ? (
          <input
            type="text"
            className="task-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
            disabled={operando}
          />
        ) : (
          <span
            onDoubleClick={() => !operando && setIsEditing(true)}
            style={{
              textDecoration: tarea.completada ? "line-through" : "none",
              color: tarea.completada ? "#94a3b8" : "inherit",
              cursor: "text", flex: 1
            }}
            title="Doble clic para editar"
          >
            {tarea.titulo}
          </span>
        )}
      </div>

      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        <Button
          label={tarea.completada ? "Desmarcar" : "Completar"}
          onClick={() => onCompletar(tarea.id, tarea.completada)}
          variant={tarea.completada ? "success" : "primary"}
          disabled={operando}
        />
        <Button label="Eliminar" onClick={() => onEliminar(tarea.id)} variant="danger" disabled={operando} />
      </div>
    </li>
  );
};

export default TaskItem;