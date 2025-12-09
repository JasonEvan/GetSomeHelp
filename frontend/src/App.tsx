import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Get Some Help</Link>
        <Link to="/feature">Feature</Link>
        <Link to="/career">Career</Link>
        <Link to="/help">Help</Link>
      </nav>

      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/feature" element={<></>} />
        <Route path="/career" element={<></>} />
        <Route path="/help" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
}
