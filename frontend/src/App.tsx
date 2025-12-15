import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./layout/navbar";
import Home from "./pages/Home";
import Help from "./pages/Help";
import HowToOrder from "./components/help/HowToOrder";
import FAQ from "./components/help/FAQ";
import Career from "./pages/Career";
import ApplicationForm from "./pages/ApplicationForm";

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
        <Route path="/apply/:role" element={<ApplicationForm />} />
      </Routes>
    </BrowserRouter>
  );
}
