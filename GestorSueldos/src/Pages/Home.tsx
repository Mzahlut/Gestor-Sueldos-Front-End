import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const sections = [
  { title: "Clientes", path: "/clientes" },
  { title: "Facturas", path: "/facturas" },
  { title: "Productos", path: "/items-factura" },
  { title: "Empleados", path: "/empleados" },
  { title: "Liquidaciones", path: "/liquidaciones" },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-6">
      {/* Título */}
      <Typography variant="h3" className="text-gray-100 font-bold mb-2">
        Gestor de Sueldos
      </Typography>
      <Typography variant="subtitle1" className="text-gray-400 mb-10">
        Selecciona una sección para comenzar
      </Typography>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {sections.map((item) => (
          <Card
            key={item.title}
            className="bg-gray-800 shadow-md hover:bg-gray-700 transition-colors"
          >
            <CardContent className="flex flex-col items-center">
              <Typography variant="h6" className=" text-black-100 font-semibold">
                {item.title}
              </Typography>
              <Button
                component={Link}
                to={item.path}
                variant="contained"
                color="primary"
                className="mt-4"
              >
                Ir a {item.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;