import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Welcome from "./component/Welcome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/api/todo" element={<Home />} />
    </Routes>
  );
}

export default App;
