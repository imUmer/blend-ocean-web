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
import Test from './components/Test'; // This is for testing purpose
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import ShowModel from "./pages/ShowModel";
import { SearchProvider } from "./context/SearchContext";
import About from "./pages/About";
import AdminPanel from "./pages/AdminPanel";
import UserEdit from "./components/Admin/UserEdit";
import MenuEdit from "./components/Admin/MenuEdit";

const App = () => {
  return (
    <AuthProvider>
      <MenuProvider>
        <SearchProvider>
          <Router>
            <Navbar />
            {/* <Test /> this is for testing purpose */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/model" element={<ShowModel />} />
              <Route path="/about" element={<About />} />
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
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/user/:id"
                element={
                  <ProtectedRoute>
                    <UserEdit />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/assets"
                element={
                  <ProtectedRoute>
                  {/* <AssetEdit /> */}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/menu"
                element={
                  <ProtectedRoute>
                  <MenuEdit />
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
