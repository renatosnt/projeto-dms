import { collection, getDocs, onSnapshot } from "firebase/firestore";
import React from "react";
import { db } from "../../firebaseConnection";

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
          });
        });
        setEmployees(listOfEmployees);
      });
    }
    getEmployees();
  }, []);

  return (
    <div className="container">
      <ul>
        {employees.map((employee) => (
          <li>
            <span>{employee.id}</span>
            <span>{employee.nome}</span>
            <span>{employee.idade}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
