import axios from "axios";


export interface Factura {
  id: number;
  cliente: string;
  fecha: string;
  total: number;
}


const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Servicio para obtener todas las facturas
export const getFacturas = async (): Promise<Factura[]> => {
  const response = await api.get<Factura[]>("/facturas");
  return response.data;
};

// Servicio para obtener una factura por ID
export const getFacturaById = async (id: number): Promise<Factura> => {
  const response = await api.get<Factura>(`/facturas/${id}`);
  return response.data;
};

// Servicio para crear una nueva factura
export const createFactura = async (factura: Omit<Factura, "id">): Promise<Factura> => {
  const response = await api.post<Factura>("/facturas", factura);
  return response.data;
};

// Servicio para eliminar una factura
export const deleteFactura = async (id: number): Promise<void> => {
  await api.delete(`/facturas/${id}`);
};