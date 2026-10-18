import { useState } from "react";
import Button from "./Button";

const TaskForm = ({ onAgregar, operando }) => {
  const [titulo, setTitulo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (titulo.trim().length < 3) {
      setError("El título debe tener al menos 3 caracteres.");
      return;
    }
    onAgregar(titulo.trim());
    setTitulo("");
    setError("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          className="task-input"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Escribe el título de la tarea..."
          disabled={operando}
        />
        <Button label="Agregar" variant="primary" disabled={operando} />
      </form>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default TaskForm;