import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../firebaseConnection";
import styles from "./History.module.css";
const History = ({ id }) => {
  const [history, setHistory] = React.useState([]);

  React.useEffect(() => {
    async function getHistory() {
      const docRef = doc(db, "historico", id);
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
          <div className={styles.records}>
            <div className={styles.recordHeader}>
              <h2 className={styles.recordTitle}>
                Data de modificação: {record.modifiedAt}{" "}
              </h2>
            </div>
            <ul>
              <li>Nome: {record.name}</li>
              <li>Gênero: {record.gender}</li>
              <li>Endereço: {record.address}</li>
              <li>Telefone: {record.phoneNumber}</li>
              <li>Foto: {record.photo}</li>
              <li>Nascimento: {record.birthDate}</li>
              <li>Cargo: {record.role}</li>
              <li>Data de admissão: {record.admissionDate}</li>
              <li>Setor: {record.sector}</li>
              <li>Salário: {record.salary}</li>
            </ul>
          </div>
        ))}
    </div>
  );
};

export default History;
