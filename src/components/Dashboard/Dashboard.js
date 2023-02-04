import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React from "react";
import { db } from "../../firebaseConnection";
import Button from "../Forms/Button";
import styles from "./Dashboard.module.css";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
const Dashboard = () => {
  const [employees, setEmployees] = React.useState([]);

  React.useEffect(() => {
    function getEmployees() {
      onSnapshot(collection(db, "funcionarios"), (snapshot) => {
        const listOfEmployees = [];
        snapshot.forEach((doc) => {
          listOfEmployees.push({
            id: doc.id,
            nome: doc.data().nome,
            idade: doc.data().idade,
            cidade: doc.data().cidade,
          });
        });
        setEmployees(listOfEmployees);
      });
    }
    getEmployees();
  }, []);

  return (
    <table className="container">
      <caption>Funcionários</caption>
      <thead>
        <tr>
          {employees[0] &&
            Object.keys(employees[0]).map((header, key) => (
              <th key={key}>{header}</th>
            ))}
          <th>Detalhes</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.nome}</td>
            <td>{employee.idade}</td>
            <td>{employee.cidade}</td>
            <td>
              <IconButton
                color="primary"
                aria-label="editar documentos"
                // component="label"
              >
                {/* <input hidden accept="image/*" type="file" /> */}
                <EditIcon />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Dashboard;
