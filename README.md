# TaskCampus - Aplicación de Gestión de Tareas Académicas

Proyecto desarrollado como laboratorio final para el curso de Desarrollo de Aplicaciones Web utilizando React y Vite.

##  Integrantes del Equipo
* Ignacio Gómez
* Francisco López

##  Cómo instalar y ejecutar el proyecto

Para correr este proyecto en tu máquina local, sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```
2. **Instalar las dependencias:**
   Navega hasta la carpeta del proyecto en tu terminal y ejecuta:
   ```bash
   npm install
   ```
3. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
4. Abre tu navegador en la ruta indicada en la terminal (usualmente `http://localhost:5173/`).

## Limitación de la API (JSONPlaceholder)

Para este proyecto estamos utilizando **JSONPlaceholder** como una API REST simulada para practicar peticiones HTTP. Es importante destacar que **los datos no se guardan de forma permanente en el servidor**. 

Las operaciones de creación (POST), edición/completar (PATCH) y eliminación (DELETE) se envían correctamente al servidor y modifican el estado local de nuestra aplicación durante la sesión actual para reflejar los cambios en la interfaz. Sin embargo, si se recarga la página, los datos volverán a su estado inicial de 10 tareas obtenidas mediante la petición GET.

##  Investigación y Decisiones Técnicas Aplicadas

Durante el desarrollo, aplicamos los siguientes conceptos y patrones de React para organizar la lógica del proyecto:

### 1. Navegación entre vistas
Implementamos un sistema de navegación estilo *Single Page Application* (SPA) sin necesidad de librerías externas (como React Router). Esto se logró utilizando el estado local (`vistaActiva`) y **renderizado condicional** dentro de `App.jsx`. El componente `Navigation.jsx` se encarga de actualizar este estado, montando y desmontando los componentes (Resumen, Tareas, Nueva Tarea) según corresponda, sin que la página se recargue ni se pierda la sesión.

### 2. Estado derivado
Para mantener sincronizados los contadores del resumen y los filtros de la lista sin crear estados redundantes que puedan desincronizarse (y evitar bugs), aplicamos el patrón de *Estado Derivado*. Las listas `tareasFiltradas` y los cálculos de `total`, `completadas` y `pendientes` se calculan "al vuelo" directamente a partir del array principal de `tareas` y el estado del filtro de búsqueda activo.

### 3. Actualización funcional del estado
Para garantizar la integridad de los datos, especialmente al modificar o eliminar tareas rápidamente, utilizamos la actualización funcional del estado. En lugar de pasar el valor directamente (ej: `setTareas(nuevasTareas)`), utilizamos un callback (`setTareas(prev => ...)`). Esto nos asegura que siempre estamos trabajando con la versión más reciente del estado anterior (`prev`), evitando perder información por la naturaleza asíncrona de React.

### 4. Identificadores y API Simulada
Al crear una nueva tarea con un POST, JSONPlaceholder siempre devuelve el mismo identificador simulado (`id: 201`). Si usáramos ese ID, React tendría problemas con la propiedad `key` al iterar la lista, causando colisiones. Para solucionar esto, diferenciamos los ID de red de los ID locales generando identificadores únicos y estables localmente usando `Date.now()` en el momento de la creación.