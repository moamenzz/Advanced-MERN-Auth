import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Auth from "./pages/Auth.jsx";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import FloatingShape from "./components/FloatingShape.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Toaster from "react-hot-toast";
import Home from "./pages/Home.jsx";
import Missing from "./pages/Missing.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import Layout from "./components/Layout.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
// import { useAuthStore } from "../store/authStore.js";
// import { useEffect } from "react";

function App() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden"
    >
      <FloatingShape
        color="bg-green-500"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-emerald-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-lime-500"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<ProtectedRoutes allowedRoles={[2001]} />}>
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/*" element={<Missing />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
