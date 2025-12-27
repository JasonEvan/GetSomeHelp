import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./layout/navbar";
import Home from "./pages/Home";
import Help from "./pages/Help";
import HowToOrder from "./components/help/HowToOrder";
import FAQ from "./components/help/FAQ";
import Career from "./pages/Career";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import ApplicationForm from "./pages/ApplicationForm";
import Catalog from "./pages/Catalog";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/career" element={<Career />} />

        <Route path="/help" element={<Help />} />
        <Route path="/help/how-to-order" element={<HowToOrder />} />
        <Route path="/help/faq" element={<FAQ />} />

        <Route path='/signup' element={<SignUp/>} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/apply/:role" element={<ApplicationForm />} />
        
        <Route path="/catalog" element={<Catalog />} />
      </Routes>
    </BrowserRouter>
  );
}
