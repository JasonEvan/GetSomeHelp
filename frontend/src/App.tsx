import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./layout/navbar";
import Home from "./pages/Home";
import Help from "./pages/Help";
import HowToOrder from "./components/help/HowToOrder";
import FAQ from "./components/help/FAQ";
import Career from "./pages/Career";

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
      </Routes>
    </BrowserRouter>
  );
}
