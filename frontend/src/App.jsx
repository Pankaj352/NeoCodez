import { Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import AdminLayout from "./pages/Admin/AdminLayout";
import Admin from "./pages/Admin/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import ThreeDBackground from "./components/ThreeDBackground";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import VerifyOtp from "./pages/Auth/VerifyOTP";
import ResetPassword from "./pages/Auth/ResetPassword";
import Register from "./pages/Auth/Register";
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          {/* Main Website Routes */}
          <Route
            element={
              <div className="min-h-screen bg-background text-text">
                <ThreeDBackground />
                <Navbar />
                <main className="relative z-10">
                  <Outlet />
                </main>
                <Footer />
              </div>
            }>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute requireAuth={true} requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }>
            <Route index element={<Admin />} />
            <Route path="dashboard" element={<Admin activeTab="dashboard" />} />
            <Route path="projects" element={<Admin activeTab="projects" />} />
            <Route path="blog" element={<Admin activeTab="blog" />} />
            <Route path="contacts" element={<Admin activeTab="contacts" />} />
            <Route path="analytics" element={<Admin activeTab="analytics" />} />
            <Route path="settings" element={<Admin activeTab="settings" />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
