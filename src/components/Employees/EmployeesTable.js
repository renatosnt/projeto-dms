import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React from "react";
import { db } from "../../firebaseConnection";
import styles from "./EmployeesTable.module.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { redirect, useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";

const Employees = () => {
  const [employees, setEmployees] = React.useState([]);
  const navigate = useNavigate();

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

  function goToEditMode(id) {
    // TODO pega do firestore o pdf correto pra ser editado, converte pra blob e coloca pra ser editado
    navigate("editar/" + id);
  }

  function goToCreate() {
    navigate("criar");
  }

  return (
    <div>
      <Button onClick={goToCreate} variant="contained" endIcon={<AddBoxIcon />}>
        Adicionar
      </Button>
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
                  onClick={() => goToEditMode(employee.id)}
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
    </div>
  );
};

export default Employees;
