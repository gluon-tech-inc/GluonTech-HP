import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import GeopPrivacy from "./GeopPrivacy";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/geop-privacy" element={<GeopPrivacy />} />
    </Routes>
  );
}
