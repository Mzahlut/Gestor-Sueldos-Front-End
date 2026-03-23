import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from "@mui/material";
import axios from "axios";
import type { Cliente } from "../Types/types";
import { useState } from "react";

interface ModificarClienteDialogProps {
  open: boolean;
  onClose: () => void;
  cliente: Cliente | null;
  onClienteModificado: (cliente: Cliente) => void;
}

export const ModificarClienteDialog = ({ open, onClose, cliente, onClienteModificado }: ModificarClienteDialogProps) => {
  // Estado local inicializado con el cliente recibido
  const [clienteEditado, setClienteEditado] = useState<Cliente | null>(cliente ? { ...cliente } : null);

  // Cuando cambia el prop `cliente`, actualizamos el estado
  if (cliente && (!clienteEditado || clienteEditado.id !== cliente.id)) {
    setClienteEditado({ ...cliente });
  }

  const handleUpdateCliente = () => {
    if (!clienteEditado) return;

    axios.put<Cliente>(`http://localhost:8080/api/clients/${clienteEditado.id}`, clienteEditado)
      .then(res => {
        onClienteModificado(res.data);
        onClose();
      })
      .catch(err => console.error("Error al modificar cliente:", err));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Modificar Cliente</DialogTitle>
      <DialogContent>
        {clienteEditado && (
          <>
            <TextField
              margin="dense"
              label="Nombre"
              fullWidth
              value={clienteEditado.nombre}
              onChange={(e) => setClienteEditado({ ...clienteEditado, nombre: e.target.value })}
            />
            <TextField
              margin="dense"
              label="CUIT"
              fullWidth
              value={clienteEditado.cuit}
              onChange={(e) => setClienteEditado({ ...clienteEditado, cuit: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Dirección"
              fullWidth
              value={clienteEditado.direccion}
              onChange={(e) => setClienteEditado({ ...clienteEditado, direccion: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              value={clienteEditado.email}
              onChange={(e) => setClienteEditado({ ...clienteEditado, email: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Teléfono"
              fullWidth
              value={clienteEditado.telefono}
              onChange={(e) => setClienteEditado({ ...clienteEditado, telefono: e.target.value })}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleUpdateCliente} variant="contained" color="secondary">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};