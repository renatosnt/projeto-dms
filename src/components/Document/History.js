import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { auth, db } from "../../services/firebase";
import styles from "./History.module.css";
const History = ({ id }) => {
  const [history, setHistory] = React.useState([]);

  React.useEffect(() => {
    async function getHistory() {
      const uid = auth.currentUser.uid;
      const docRef = doc(db, "users", uid, "history", id);

      // const docRef = doc(db, "historico", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setHistory(docSnap.data().records);
      } else {
        console.log("No such document!");
      }
    }
    getHistory();
  }, []);

  return (
    <div className={styles.history}>
      <h1 id="history">Histórico</h1>
      {history
        .slice(0)
        .reverse()
        .map((record) => (
          <table className={styles.record}>
            <thead>
              <tr>
                <th>Data de modificação: </th>
                <th>
                  {record.modifiedAt.split("GMT-0300 (Brasilia Standard Time)")}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nome: </td>
                <td>{record.name}</td>
              </tr>
              <tr>
                <td>Gênero: </td>
                <td>{record.gender}</td>
              </tr>
              <tr>
                <td>Endereço: </td>
                <td>{record.address}</td>
              </tr>
              <tr>
                <td>Telefone: </td>
                <td>{record.phoneNumber}</td>
              </tr>
              <tr>
                <td>Nascimento: </td>
                <td>{record.birthDate}</td>
              </tr>
              <tr>
                <td>Cargo: </td>
                <td>{record.role}</td>
              </tr>
              <tr>
                <td>Data de admissão: </td>
                <td>{record.admissionDate}</td>
              </tr>
              <tr>
                <td>Setor: </td>
                <td>{record.sector}</td>
              </tr>
              <tr>
                <td>Salário: </td>
                <td>{record.salary}</td>
              </tr>
            </tbody>
          </table>
        ))}
    </div>
  );
};

export default History;
