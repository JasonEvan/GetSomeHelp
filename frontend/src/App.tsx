import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./layout/navbar";
import Home from "./pages/Home";
import Help from "./pages/Help";
import HowToOrder from "./components/help/HowToOrder";
import FAQ from "./components/help/FAQ";
import Career from "./pages/Career";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import UserDashboard from "./pages/dashboard/UserDashboard";
import ApplicationForm from "./pages/ApplicationForm";
import Catalog from "./pages/Catalog";
import CatalogDetail from "./pages/CatalogDetail";
import ProtectedRoute from "./lib/ProtectedRoute";
import GuestOnlyRoute from "./lib/GuestOnlyRoute";
import ProviderDashboard from "./pages/dashboard/ProviderDashboard";
import Forbidden403 from "./pages/Forbidden403";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/apply/:role" element={<ApplicationForm />} />
          <Route path="/catalog/:detail" element={<CatalogDetail />} />
        </Route>

        <Route path="/provider-dashboard" element={<ProviderDashboard />} />

        {/* GUEST ONLY ROUTES */}
        <Route element={<GuestOnlyRoute />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/career" element={<Career />} />

        <Route path="/help" element={<Help />} />
        <Route path="/help/how-to-order" element={<HowToOrder />} />
        <Route path="/help/faq" element={<FAQ />} />

        <Route path="/catalog" element={<Catalog />} />

        <Route path="/403" element={<Forbidden403 />} />
      </Routes>
    </BrowserRouter>
  );
}
