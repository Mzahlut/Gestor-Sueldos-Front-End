// Cliente
export interface Cliente {
  id: number;
  nombre: string;
  cuit: string;
  direccion: string;
  email: string;
  telefono: string;
  facturas?: Factura[]; 
}

// Factura
export interface Factura {
  id: number;
  cliente: Cliente;
  fecha: string;  
  montoTotal: number;
  items: ItemFactura[];
}

// ItemFactura
export interface ItemFactura {
  id: number;
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
}

// Empleado
export interface Empleado {
  id: number;
  nombre: string;
  puesto: string;
  sueldo: number;
}

// Liquidación
export interface Liquidacion {
  id: number;
  empleado: Empleado;
  fecha: string;
  monto: number;
}