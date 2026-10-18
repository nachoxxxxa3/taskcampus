
import { useState, useEffect } from "react";
import { obtenerTareasAPI, crearTareaAPI, actualizarTareaAPI, eliminarTareaAPI } from "../services/tareasService";

export const useTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [operando, setOperando] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      try {
        const datos = await obtenerTareasAPI();
        setTareas(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  const agregarTarea = async (titulo) => {
    setOperando(true);
    try {
      const nueva = await crearTareaAPI(titulo);
      setTareas(prev => [{ id: Date.now(), titulo: nueva.title, completada: nueva.completed }, ...prev]);
    } catch (err) {
      setError(err.message);
    } finally {
      setOperando(false);
    }
  };

  const completarTarea = async (id, completadaActual) => {
    setOperando(true);
    setTareas(prev => prev.map(t => t.id === id ? { ...t, completada: !completadaActual } : t));
    try {
      await actualizarTareaAPI(id, { completed: !completadaActual });
    } catch (err) {
      setError(err.message);
    } finally {
      setOperando(false);
    }
  };

  const editarTitulo = async (id, nuevoTitulo) => {
    setOperando(true);
    setTareas(prev => prev.map(t => t.id === id ? { ...t, titulo: nuevoTitulo } : t));
    try {
      await actualizarTareaAPI(id, { title: nuevoTitulo });
    } catch (err) {
      setError(err.message);
    } finally {
      setOperando(false);
    }
  };

  const eliminarTarea = async (id) => {
    setOperando(true);
    setTareas(prev => prev.filter(t => t.id !== id));
    try {
      await eliminarTareaAPI(id);
    } catch (err) {
      setError(err.message);
    } finally {
      setOperando(false);
    }
  };

  return { tareas, cargando, error, operando, agregarTarea, completarTarea, editarTitulo, eliminarTarea };
};