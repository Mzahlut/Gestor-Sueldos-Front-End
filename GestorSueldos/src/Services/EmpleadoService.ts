import api from "./api";
import type { Empleado } from "../Types/types";

// Obtener todos los empleados
export const getEmpleados = async (): Promise<Empleado[]> => {
  const response = await api.get<Empleado[]>("/empleados");
  return response.data;
};

// Obtener empleado por ID
export const getEmpleadoById = async (id: number): Promise<Empleado> => {
  const response = await api.get<Empleado>(`/empleados/${id}`);
  return response.data;
};

// Crear empleado
export const createEmpleado = async (empleado: Omit<Empleado, "id">): Promise<Empleado> => {
  const response = await api.post<Empleado>("/empleados", empleado);
  return response.data;
};

// Eliminar empleado
export const deleteEmpleado = async (id: number): Promise<void> => {
  await api.delete(`/empleados/${id}`);
};