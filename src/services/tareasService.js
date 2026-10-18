
const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const obtenerTareasAPI = async () => {
  const response = await fetch(`${API_URL}?_limit=10`);
  if (!response.ok) throw new Error("Error al obtener las tareas");
  const data = await response.json();
  return data.map(item => ({
    id: item.id,
    titulo: item.title,
    completada: item.completed
  }));
};

export const crearTareaAPI = async (titulo) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: titulo, completed: false, userId: 1 }),
  });
  if (!response.ok) throw new Error("Error al crear la tarea");
  return await response.json();
};

export const actualizarTareaAPI = async (id, datos) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (!response.ok) throw new Error("Error al actualizar la tarea");
  return await response.json();
};

export const eliminarTareaAPI = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar la tarea");
  return true;
};