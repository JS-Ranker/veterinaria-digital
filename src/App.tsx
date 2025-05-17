import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import User from "./pages/User/User";
import AddPet from "./pages/AddPet/AddPet";
import Shop from "./pages/Shop/Shop";
import EspecialidadesPage from "./pages/EspecialidadesPage/EspecialidadesPage";
import Cardiologia from "./pages/EspecialidadesPage/Cardiologia/Cardiologia";
import Endocrinologia from "./pages/EspecialidadesPage/Endocrinologia/Endocrinologia";
import Gastroenterologia from "./pages/EspecialidadesPage/Gastroenterologia/Gastroenterologia";
import Oncologia from "./pages/EspecialidadesPage/Oncologia/Oncologia";

import "./App.css";
import "animate.css";

// Componente para proteger rutas
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} /> {/* Nueva ruta para Shop */}
        <Route path="/especialidadespage" element={<EspecialidadesPage />} />
        <Route path="/cardiologia" element={<Cardiologia />} />
        <Route path="/endocrinologia" element={<Endocrinologia />} />
        <Route path="/gastroenterologia" element={<Gastroenterologia />} />
        <Route path="/oncologia" element={<Oncologia />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-pet"
          element={
            <ProtectedRoute>
              <AddPet />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
