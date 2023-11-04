import { BrowserRouter, Route, Routes } from "react-router-dom"
import Auth from "./pages/Auth"
import AuthLayout from "./layouts/AuthLayout"
import { AuthProvider } from "./context/AuthProvider"
import RutaProtegida from "./layouts/RutaProtegida"
import Productos from "./pages/Productos"
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProductosProvider } from "./context/ProductoProvider"

function App() {

  return (
  <BrowserRouter>
    <AuthProvider >
      <ProductosProvider >
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Auth />} />
          </Route>

          <Route path="/productos" element={<RutaProtegida />}>
            <Route index element={<Productos />} />
          </Route>
        </Routes>
      </ProductosProvider>
    </AuthProvider>
  </BrowserRouter>
  )
}

export default App
