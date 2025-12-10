import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/feature" element={<></>} />
        <Route path="/career" element={<></>} />
        <Route path="/help" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
}
