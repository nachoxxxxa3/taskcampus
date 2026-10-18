function TaskSummary({ tareas }) {
  const total = tareas.length;
  const completadas = tareas.filter((t) => t.completada).length;
  const pendientes = tareas.filter((t) => !t.completada).length;

  return (
    <div className="summary-stats">
      <div className="summary-item">
        <span className="summary-number" style={{ color: '#1d4ed8' }}>{total}</span>
        <span className="summary-label">Total</span>
      </div>
      <div className="summary-item">
        <span className="summary-number" style={{ color: '#16a34a' }}>{completadas}</span>
        <span className="summary-label">Completadas</span>
      </div>
      <div className="summary-item">
        <span className="summary-number" style={{ color: '#f59e0b' }}>{pendientes}</span>
        <span className="summary-label">Pendientes</span>
      </div>
    </div>
  )
}
export default TaskSummary;