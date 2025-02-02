import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MenuProvider } from "./context/MenuContext";
import { SearchProvider } from "./context/SearchContext";
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
import About from "./pages/Static/About";
import Contact from "./pages/Static/Contact";
import Terms from "./pages/Static/TermsAndConditions";
import Privacy from "./pages/Static/PrivacyPolicy";
import AdminPanel from "./pages/AdminPanel";
import UserEdit from "./components/Admin/UserEdit";
import MenuEdit from "./components/Admin/MenuEdit";
import AssetAdd from "./components/Admin/AssetAdd";
import AssetEdit from "./components/Admin/AssetEdit";
import AssetPlot from "./pages/AssetPage/AssetPlot";
import LearnPlot from "./pages/Learn/LearnPlot";
import { LearnMenuProvider } from "./context/LearnMenuContext";

const App = () => {
  return (
    <AuthProvider>
      <MenuProvider>
      <LearnMenuProvider>
        <SearchProvider>
          <Router>
            <Navbar />
            {/* <Test /> this is for testing purpose */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/:type" element={<AssetPlot  />} />
              <Route path="/learn" element={<LearnPlot  />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
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
                  <AssetAdd />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/assets/:id"
                element={
                  <ProtectedRoute>
                  <AssetEdit />
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
          <Footer />
          </Router>
        </SearchProvider>
      </LearnMenuProvider>
      </MenuProvider>
    </AuthProvider>
  );
};

export default App;
