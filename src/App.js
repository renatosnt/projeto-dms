import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* <Route path="/" element={<Home/>} /> // landing page, se der tempo */}
          <Route path="/login/*" element={<Login />} />
          {/* <Route path="/dashboard" element={<Dashboard />} */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
