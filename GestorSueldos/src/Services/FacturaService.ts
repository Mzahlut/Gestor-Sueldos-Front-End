import api from "./api";
import type { Factura } from "../Types/types";

export const getFacturas = async (): Promise<Factura[]> => {
  const response = await api.get<Factura[]>("/facturas");
  return response.data;
};

export const getFacturaById = async (id: number): Promise<Factura> => {
  const response = await api.get<Factura>(`/facturas/${id}`);
  return response.data;
};

export const createFactura = async (factura: Omit<Factura, "id">): Promise<Factura> => {
  const response = await api.post<Factura>("/facturas", factura);
  return response.data;
};

export const deleteFactura = async (id: number): Promise<void> => {
  await api.delete(`/facturas/${id}`);
};
