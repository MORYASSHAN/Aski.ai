import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import DashboardLayout from "./components/dashboard/DashboardLayout.jsx";
import DashboardHome from "./pages/dashboard/DashboardHome.jsx";
import RoomsPage from "./pages/dashboard/RoomsPage.jsx";
import MeetingsPage from "./pages/dashboard/MeetingsPage.jsx";
import BookingsPage from "./pages/dashboard/BookingsPage.jsx";
import IntegrationsPage from "./pages/dashboard/IntegrationsPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="rooms" element={<RoomsPage />} />
          <Route path="meetings" element={<MeetingsPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="integrations" element={<IntegrationsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
