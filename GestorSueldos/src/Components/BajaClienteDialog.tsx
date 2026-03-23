import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography
} from "@mui/material";
import axios from "axios";
import type { Cliente } from "../Types/types";

interface BajaClienteDialogProps {
  open: boolean;
  onClose: () => void;
  cliente: Cliente | null;
  onClienteEliminado: (id: number) => void;
}

const BajaClienteDialog = ({ open, onClose, cliente, onClienteEliminado }: BajaClienteDialogProps) => {
  const handleDeleteCliente = () => {
    if (!cliente) return;

    axios.delete(`http://localhost:8080/api/clients/${cliente.id}`)
      .then(() => {
        onClienteEliminado(cliente.id); // avisamos al padre que se eliminó
        onClose();
      })
      .catch(err => console.error("Error al dar de baja:", err));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar Baja</DialogTitle>
      <DialogContent>
        <Typography>
          ¿Estás seguro que querés eliminar al cliente <strong>{cliente?.nombre}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleDeleteCliente} variant="contained" color="error">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BajaClienteDialog;