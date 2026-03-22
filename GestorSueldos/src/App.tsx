import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Home";
import ClientesPage from "./Pages/ClientePage";
// import ClientesPage from "./pages/ClientesPage";
// import FacturasPage from "./pages/FacturasPage";
// import EmpleadosPage from "./pages/EmpleadosPage";
// import LiquidacionesPage from "./pages/LiquidacionesPage";
// import ItemsFacturaPage from "./pages/ItemsFacturaPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {<Route path="/clientes" element={<ClientesPage />} />
          // <Route path="/facturas" element={<FacturasPage />} />
          // <Route path="/empleados" element={<EmpleadosPage />} />
          // <Route path="/liquidaciones" element={<LiquidacionesPage />} />
          // <Route path="/items-factura" element={<ItemsFacturaPage />} /> 
        }
      </Routes>
    </Router>
  );
}

export default App;
