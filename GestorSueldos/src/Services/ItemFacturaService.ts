import api from "./api";
import type { ItemFactura } from "../Types/types";

// Obtener todos los items de facturas
export const getItemsFactura = async (): Promise<ItemFactura[]> => {
  const response = await api.get<ItemFactura[]>("/items-factura");
  return response.data;
};

// Obtener un item por ID
export const getItemFacturaById = async (id: number): Promise<ItemFactura> => {
  const response = await api.get<ItemFactura>(`/items-factura/${id}`);
  return response.data;
};

// Crear un nuevo item
export const createItemFactura = async (item: Omit<ItemFactura, "id">): Promise<ItemFactura> => {
  const response = await api.post<ItemFactura>("/items-factura", item);
  return response.data;
};

// Eliminar un item
export const deleteItemFactura = async (id: number): Promise<void> => {
  await api.delete(`/items-factura/${id}`);
};