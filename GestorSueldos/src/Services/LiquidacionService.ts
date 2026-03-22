import api from "./api";
import type { Liquidacion } from "../Types/types";

// Obtener todas las liquidaciones
export const getLiquidaciones = async (): Promise<Liquidacion[]> => {
  const response = await api.get<Liquidacion[]>("/liquidaciones");
  return response.data;
};

// Obtener liquidación por ID
export const getLiquidacionById = async (id: number): Promise<Liquidacion> => {
  const response = await api.get<Liquidacion>(`/liquidaciones/${id}`);
  return response.data;
};

// Crear liquidación
export const createLiquidacion = async (liq: Omit<Liquidacion, "id">): Promise<Liquidacion> => {
  const response = await api.post<Liquidacion>("/liquidaciones", liq);
  return response.data;
};

// Eliminar liquidación
export const deleteLiquidacion = async (id: number): Promise<void> => {
  await api.delete(`/liquidaciones/${id}`);
};