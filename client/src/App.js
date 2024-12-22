import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MenuProvider } from "./context/MenuContext";
import ProtectedRoute from "./components/ProtectedRoute";
// import Login from "./pages/Login";
import Login from "./pages/Signin";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import ShowModel from "./pages/ShowModel";
import { SearchProvider } from "./context/SearchContext";

const App = () => {
  return (
    <AuthProvider>
      <MenuProvider>
        <SearchProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/model" element={<ShowModel />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
          <Footer />
        </SearchProvider>
      </MenuProvider>
    </AuthProvider>
  );
};

export default App;
