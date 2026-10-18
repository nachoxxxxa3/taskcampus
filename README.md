# TaskCampus - Gestión de Tareas Académicas

Proyecto desarrollado como laboratorio final para el curso de Desarrollo de Aplicaciones Web utilizando React y Vite.

## 👥 Integrantes del Escuadrón
- Ignacio Gómez
- Francisco López

---

## 📦 Requisitos Previos (Versiones utilizadas)
Para compilar y ejecutar este proyecto, se utilizaron las siguientes versiones en el entorno de desarrollo:
- **Node.js**: v24.22.0
- **npm**: 11.19.1

---

## 🛠️ Cómo instalar y ejecutar el proyecto

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

1. **Clonar el repositorio:**
   `git clone <URL_DEL_REPOSITORIO>`

2. **Instalar las dependencias:** Navega hasta la carpeta del proyecto en tu terminal y ejecuta:
   `npm install`

3. **Ejecutar el servidor de desarrollo:**
   `npm run dev`

4. Abre tu navegador en la ruta indicada en la terminal (normalmente `http://localhost:5173/`).

---

## 🔄 Comparación: Base recibida vs Desarrollo realizado

El **proyecto base** entregaba una interfaz estática (hardcoded) con componentes acoplados. Las tareas estaban fijas en el código, los botones solo ejecutaban alertas genéricas de navegador y no existía un manejo real de estados ni comunicación con el exterior.

En el **desarrollo realizado**, transformamos la base en una *Single Page Application (SPA)* dinámica y funcional:
- Se implementó una arquitectura limpia separando responsabilidades: la comunicación HTTP en la capa `services` y la lógica de estado en `hooks` (`useTareas`).
- Se construyó el CRUD completo contra la API simulada.
- Se levantó el estado (Lifting State Up) para sincronizar filtros, contadores y listas en tiempo real.
- Se implementó renderizado condicional para navegar entre vistas ("Resumen", "Tareas" y "Nueva Tarea") sin recargar la página.
- Se crearon componentes verdaderamente reutilizables (`Button`, `Badge`, `Card`, `Modal`).

---

## ⚠️ Limitación de la API (JSONPlaceholder)

Para este proyecto estamos utilizando **JSONPlaceholder** como una API REST simulada para practicar solicitudes HTTP. Es importante destacar que **los datos no se guardan de forma permanente en el servidor**. 

Las operaciones de creación (POST), edición/completar (PATCH) y eliminación (DELETE) envían correctamente la petición y actualizan de forma inmutable el estado local de nuestra aplicación durante la sesión. Sin embargo, si se recarga la página (F5), los datos volverán a su estado inicial de 10 tareas obtenidas mediante la petición GET.

---

## 🔬 Investigación y Decisiones Técnicas Aplicadas

### 1. Navegación entre vistas
Implementamos un sistema de navegación estilo SPA sin librerías externas. Esto se logró levantando el estado local (`vistaActiva`) a `App.jsx` y usando **renderizado condicional**. El componente `Navigation.jsx` actualiza este estado, montando y desmontando dinámicamente las tarjetas (Resumen, Tareas, Nueva Tarea) según corresponda, sin que la página se recargue ni se pierda la sesión.

### 2. Estado derivado
Para mantener sincronizados los contadores del resumen y los filtros de la lista sin crear estados redundantes que puedan desincronizarse, aplicamos el patrón de *Estado Derivado*. La lista `tareasFiltradas` y los cálculos de `total`, `completadas` y `pendientes` se calculan "al vuelo" directamente a partir del array principal de `tareas` y el estado de los filtros activos (estado y búsqueda por texto).

### 3. Actualización funcional del estado
Al modificar o eliminar tareas, garantizamos la integridad de los datos utilizando la forma funcional del setter. En lugar de pasar el valor directamente (ej: `setTareas(nuevasTareas)`), utilizamos un callback (`setTareas(prev => ...)`). Esto asegura que siempre estamos trabajando con la versión más reciente del estado anterior (`prev`), evitando perder información o crear mutaciones directas sobre el array.

### 4. Identificadores y API Simulada
Al crear una nueva tarea con un POST, JSONPlaceholder siempre devuelve el mismo identificador simulado (`id: 201`). Si usáramos ese ID, React tendría colisiones con la propiedad `key` al iterar la lista. Para solucionar esto, diferenciamos los ID remotos de los locales generando identificadores únicos y estables a nivel local usando `Date.now()` en el momento de la creación.

---

## ✅ Evidencias Verificables (Casos de Prueba)

| Caso probado | Pasos | Resultado esperado | Resultado obtenido | Evidencia asociada |
| :--- | :--- | :--- | :--- | :--- |
| **Carga inicial (GET)** | Abrir la aplicación en el navegador. | Se deben cargar 10 tareas iniciales mostrando un indicador "Cargando tareas..." previo. | Las 10 tareas se renderizan, y los contadores en "Resumen" marcan 10 en Total. | Captura de la vista principal con las 10 tareas listadas. |
| **Validación de título** | Ir a "Nueva Tarea", dejar vacío o escribir 2 letras y presionar "Agregar". | Aparece un mensaje de error en rojo y la petición POST no se ejecuta. | Aparece el texto "El título debe tener al menos 3 caracteres". | Captura del mensaje de error en el formulario. |
| **Crear tarea (POST)** | Escribir "Estudiar React" en el input y presionar "Agregar". | La tarea se agrega al inicio de la lista, el estado cambia a pendiente y el formulario se limpia. | La tarea aparece en "Mis tareas", Total sube a 11. | Captura de la lista con la nueva tarea al principio. |
| **Completar tarea (PATCH)** | Clic en el Badge amarillo ("pendiente") de una tarea. | La tarea se tacha, el badge cambia a verde ("completada") y el botón derecho dice "Desmarcar". | El badge se vuelve verde, la tarea se tacha, Completadas suma 1. | Captura de la tarea específica antes y después del clic. |
| **Editar en línea (PATCH)** | Doble clic sobre el texto de una tarea, modificarlo y presionar Enter. | El texto cambia a un `input` editable. Al dar Enter, se guarda y vuelve a ser texto. | El nombre se actualiza correctamente en la interfaz sin recargar. | Captura del `input` activo durante la edición. |
| **Filtro y Búsqueda** | Escribir una palabra en el buscador y hacer clic en "Pendientes". | La lista oculta las tareas que no coinciden y muestra solo las pendientes que incluyen el texto. | La lista se filtra correctamente y el contador "Mostrando" se actualiza. | Captura de la vista "Mis Tareas" con el buscador lleno y lista reducida. |
| **Eliminar tarea (DELETE)** | Clic en el botón rojo "Eliminar" y luego "Confirmar" en el modal. | Aparece el modal oscuro de confirmación. Al aceptar, la tarea desaparece. | El modal aparece y bloquea el fondo. Tras aceptar, la tarea es removida. | Captura del modal abierto sobre la aplicación. |
| **Navegación** | Hacer clic en "Resumen", luego en "Mis Tareas". | Solo se muestra la tarjeta seleccionada. La URL no cambia ni la página recarga. | El renderizado condicional oculta las otras vistas conservando el estado. | Capturas de pantalla de las 3 vistas distintas. |
| **Bloqueo Operativo** | Eliminar o editar una tarea y observar los botones. | Los botones se deshabilitan (`disabled`) brevemente mientras se resuelve la petición. | Los botones se bloquean correctamente para evitar doble envío. | Consola de red mostrando la petición DELETE/PATCH en curso. |

> *Nota: Las capturas de pantalla de estas evidencias se adjuntan en la carpeta `evidencias` del repositorio.*