import api from "./api";
import type { Cliente } from "../Types/types";

// Obtener todos los clientes
export const getClientes = async (): Promise<Cliente[]> => {
  const response = await api.get<Cliente[]>("/clientes");
  return response.data;
};

// Obtener cliente por ID
export const getClienteById = async (id: number): Promise<Cliente> => {
  const response = await api.get<Cliente>(`/clientes/${id}`);
  return response.data;
};

// Crear cliente
export const createCliente = async (cliente: Omit<Cliente, "id">): Promise<Cliente> => {
  const response = await api.post<Cliente>("/clientes", cliente);
  return response.data;
};

// Eliminar cliente
export const deleteCliente = async (id: number): Promise<void> => {
  await api.delete(`/clientes/${id}`);
};