import Button from "./Button";

const Navigation = ({ vistaActiva, setVistaActiva }) => {
  return (
    <nav style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "24px" }}>
      <Button label="📊 Resumen" variant={vistaActiva === "resumen" ? "primary" : "secondary"} onClick={() => setVistaActiva("resumen")} />
      <Button label="📋 Mis Tareas" variant={vistaActiva === "tareas" ? "primary" : "secondary"} onClick={() => setVistaActiva("tareas")} />
      <Button label="➕ Nueva Tarea" variant={vistaActiva === "nueva" ? "primary" : "secondary"} onClick={() => setVistaActiva("nueva")} />
    </nav>
  );
};

export default Navigation;