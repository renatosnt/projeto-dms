import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import DocumentEdit from "./components/Document/DocumentEdit";
import Header from "./components/Header";
import Login from "./components/Login/Login";
import Private from "./Private";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* <Route path="/" element={<Home/>} /> // landing page, se der tempo */}
          <Route path="/login/*" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <Private>
                <Dashboard />
              </Private>
            }
          />
          <Route path="/edit" element={<DocumentEdit />} /> // TODO make it
          private!!!!
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
