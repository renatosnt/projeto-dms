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
            name: doc.data().name,
            gender: doc.data().gender,
            address: doc.data().address,
            phoneNumber: doc.data().phoneNumber,
            photo: doc.data().photo,
            birthDate: doc.data().birthDate,
            role: doc.data().role,
            admissionDate: doc.data().admissionDate,
            sector: doc.data().sector,
            salary: doc.data().salary,
            pdf: doc.data().pdf,
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
          <th>ID</th>
          <th>Nome</th>
          <th>Endereço</th>
          <th>Salário</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            {console.log(employee)}
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.address}</td>
            <td>{employee.salary}</td>
            <td>
              <IconButton
                // TODO AO CLICAR AQUI, REDIRECIONA PARA A EDIÇÂO DO PDF DO USUÁRIO, se salvar a edição, o conteudo do campo pdf é sobrescrito na firestore.

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
