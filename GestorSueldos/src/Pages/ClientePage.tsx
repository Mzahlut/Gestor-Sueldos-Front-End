import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
} from "@mui/material";
import axios from "axios";
import type { Cliente } from "../Types/types";
import AltaClienteDialog from "../Components/AltaClienteDialog";
import BajaClienteDialog from "../Components/BajaClienteDialog";
import { ModificarClienteDialog } from "../Components/ModificarClienteDialog";

const ClientesPage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [openFacturas, setOpenFacturas] = useState(false);
  const [openAlta, setOpenAlta] = useState(false);
  const [openBaja, setOpenBaja] = useState(false);
  const [openModificar, setOpenModificar] = useState(false);
  const [clienteAModificar, setClienteAModificar] = useState<Cliente | null>(
    null,
  );

  const [clienteAEliminar, setClienteAEliminar] = useState<Cliente | null>(
    null,
  );
  const [clienteSeleccionado, setClienteSeleccionado] =
    useState<Cliente | null>(null);

  useEffect(() => {
    axios
      .get<Cliente[]>("http://localhost:8080/api/clients")
      .then((res) => setClientes(res.data)) // ✅ directamente res.data
      .catch((err) => console.error("Error al cargar clientes:", err));
  }, []);

  const handleClienteAgregado = (cliente: Cliente) => {
    setClientes([...clientes, cliente]);
  };

  const handleClienteEliminado = (id: number) => {
    setClientes(clientes.filter((c) => c.id !== id));
  };

   const handleClienteModificado = (clienteActualizado: Cliente) => {
  setClientes(clientes.map(c => c.id === clienteActualizado.id ? clienteActualizado : c));
};



  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <Button
        onClick={() => window.history.back()}
        variant="contained"
        color="primary"
        className="mb-4"
      >
        Ir Atras
      </Button>

      <Typography variant="h4" className="mb-6 font-bold text-gray-100">
        Gestión de Clientes
      </Typography>

      <TableContainer component={Paper} className="bg-gray-800">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="text-gray-100">CUIT</TableCell>
              <TableCell className="text-gray-100">Dirección</TableCell>
              <TableCell className="text-gray-100">Email</TableCell>
              <TableCell className="text-gray-100">Nombre</TableCell>
              <TableCell className="text-gray-100">Teléfono</TableCell>
              <TableCell className="text-gray-100">Facturas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell>{cliente.cuit}</TableCell>
                <TableCell>{cliente.direccion}</TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>{cliente.nombre}</TableCell>
                <TableCell>{cliente.telefono}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setClienteSeleccionado(cliente);
                      setOpenFacturas(true);
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Ver Facturas
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      setClienteAEliminar(cliente);
                      setOpenBaja(true);
                    }}
                  >
                    Dar de Baja
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      setClienteAModificar(cliente);
                      setOpenModificar(true);
                    }}
                  >
                    Modificar
                  </Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="mt-6 flex gap-4">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAlta(true)}
        >
          Dar de Alta
        </Button>

        <Button variant="outlined" color="secondary">
          Modificar
        </Button>
      </div>
      <AltaClienteDialog
        open={openAlta}
        onClose={() => setOpenAlta(false)}
        onClienteAgregado={handleClienteAgregado}
      />
      <BajaClienteDialog
        open={openBaja}
        onClose={() => setOpenBaja(false)}
        cliente={clienteAEliminar} // 👈 pasamos el cliente seleccionado
        onClienteEliminado={handleClienteEliminado}
      />

      <ModificarClienteDialog
        open={openModificar}
        onClose={() => setOpenModificar(false)}
        cliente={clienteAModificar}
        onClienteModificado={handleClienteModificado}
      />

      <Dialog
        open={openFacturas}
        onClose={() => setOpenFacturas(false)}
        fullWidth
      >
        <DialogTitle>Facturas de {clienteSeleccionado?.nombre}</DialogTitle>
        <DialogContent>
          {clienteSeleccionado?.facturas &&
          clienteSeleccionado.facturas.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Monto Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clienteSeleccionado.facturas.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell>{f.id}</TableCell>
                    <TableCell>{f.fecha}</TableCell>
                    <TableCell>{f.montoTotal}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography>No hay facturas registradas</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFacturas(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClientesPage;
