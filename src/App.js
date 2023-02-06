import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DocumentEdit from "./components/Document/DocumentEdit";
import Header from "./components/Header";
import Login from "./components/Login/Login";
import Private from "./Private";
import Employees from "./components/Employees/Employees";
import Home from "./Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/*" element={<Login />} />
          <Route
            path="/funcionarios/*"
            element={
              <Private>
                <Employees />
              </Private>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
