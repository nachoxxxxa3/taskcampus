function Header({ title, description, nombreUsuario }) {
  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      <p className="header-description">{description}</p>
      {/* Tarea formativa: Mostrar el nombre del usuario */}
      <h3 style={{ color: '#2563eb', marginTop: '10px' }}>Estudiante: {nombreUsuario}</h3>
    </header>
  )
}

export default Header