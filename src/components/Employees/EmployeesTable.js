import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import React from "react";
import styles from "./EmployeesTable.module.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { redirect, useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Avatar } from "@mui/material";
import { auth, db } from "../../services/firebase";
import { DataGrid } from "@mui/x-data-grid";
const Employees = () => {
  const [employees, setEmployees] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    function getEmployees() {
      const uid = auth.currentUser.uid;
      const docRef = collection(db, "users", uid, "employees");
      onSnapshot(docRef, (snapshot) => {
        const listOfEmployees = [];
        snapshot.forEach((doc) => {
          listOfEmployees.push({
            id: doc.id,
            name: doc.data().name,
            gender: doc.data().gender,
            address: doc.data().address,
            phoneNumber: doc.data().phoneNumber,
            photoUrl: doc.data().photoUrl,
            birthDate: doc.data().birthDate,
            role: doc.data().role,
            admissionDate: doc.data().admissionDate,
            sector: doc.data().sector,
            salary: doc.data().salary,
            active: doc.data().active,
          });
        });
        setEmployees(listOfEmployees);
      });
    }
    getEmployees();
  }, []);

  function goToEditMode(id) {
    navigate("editar/" + id);
  }

  function goToCreate() {
    navigate("criar");
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "header",
      headerAlign: "center",
    },
    { field: "photo", headerName: "Foto" },
    { field: "name", headerName: "Nome" },
    { field: "role", headerName: "Cargo" },
    { field: "sector", headerName: "Setor" },
    { field: "salary", headerName: "Salário" },
  ];

  const rows = employees.map((employee) => {
    return {
      id: employee.id,
      photo: employee.photoUrl,
      name: employee.name,
      role: employee.role,
      sector: employee.sector,
      salary: employee.salary,
    };
  });
  return (
    <div className="container">
      <div className={styles.menu}>
        <Button
          onClick={goToCreate}
          variant="contained"
          endIcon={<AddBoxIcon />}
        >
          Adicionar
        </Button>
      </div>
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Setor</th>
              <th>Salário</th>
              <th>Contrato Ativo</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                {console.log(employee.active)}
                <td className={styles.avatar}>
                  <Avatar src={employee.photoUrl}></Avatar>
                  {console.log(employee.name, employee.photoUrl)}
                </td>
                <td>{employee.name}</td>
                <td>{employee.role}</td>
                <td>{employee.sector}</td>
                <td>{employee.salary}</td>
                <td>{employee.active === "Ativo" ? "Sim" : "Não"}</td>
                <td>
                  <IconButton
                    onClick={() => goToEditMode(employee.id)}
                    color="primary"
                    aria-label="editar documentos"
                  >
                    <EditIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <DataGrid
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
          rows={rows}
          columns={columns}
        /> */}
      </div>
    </div>
  );
};

export default Employees;
