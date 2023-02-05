import React from "react";
import { Route, Routes } from "react-router-dom";
import DocumentEdit from "../Document/DocumentEdit";
import EmployeesTable from "../Employees/EmployeesTable";

const Employees = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<EmployeesTable />} />
        <Route path="/criar" element={<DocumentEdit />} />
        <Route path="/editar/:id" element={<DocumentEdit />} />
      </Routes>
    </div>
  );
};

export default Employees;
