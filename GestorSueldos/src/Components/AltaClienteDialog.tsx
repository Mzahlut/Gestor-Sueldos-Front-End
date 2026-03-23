import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from "@mui/material";
import axios from "axios";
import type { Cliente } from "../Types/types";


interface AltaClienteDialogProps {
  open: boolean;
  onClose: () => void;
  onClienteAgregado: (cliente: Cliente) => void;
}

const AltaClienteDialog = ({ open, onClose, onClienteAgregado }: AltaClienteDialogProps) => {
  const [nuevoCliente, setNuevoCliente] = useState<Partial<Cliente>>({});

  const handleAddCliente = () => {
    axios.post<Cliente>("http://localhost:8080/api/clients", nuevoCliente)
      .then(res => {
        onClienteAgregado(res.data); // avisamos al padre que hay un nuevo cliente
        setNuevoCliente({});
        onClose();
      })
      .catch(err => console.error("Error al dar de alta:", err));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Nuevo Cliente</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Nombre"
          fullWidth
          value={nuevoCliente.nombre || ""}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
        />
        <TextField
          margin="dense"
          label="CUIT"
          fullWidth
          value={nuevoCliente.cuit || ""}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, cuit: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Dirección"
          fullWidth
          value={nuevoCliente.direccion || ""}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, direccion: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Email"
          fullWidth
          value={nuevoCliente.email || ""}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, email: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Teléfono"
          fullWidth
          value={nuevoCliente.telefono || ""}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleAddCliente} variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AltaClienteDialog;