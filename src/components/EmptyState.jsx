const EmptyState = ({ mensaje, icono }) => {
  return (
    <div style={{ textAlign: "center", color: "#64748b", padding: "20px 0" }}>
      <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>{icono}</div>
      <p>{mensaje}</p>
    </div>
  );
};

export default EmptyState;