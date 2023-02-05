import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  renderToStream,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {},
  section: {
    padding: "40px",
  },
  title: {
    display: "block",
  },
  text: {
    display: "block",
  },
});

const DocumentPage = (props) => {
  return (
    <Document title="funcionario cv" author="usuario" language="pt-br">
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* Informações do Funcionário: Cargo, Data de Admissão, Setor,
Salário. */}
          <Text style={styles.title}>Informações de Contato</Text>
          <Text style={styles.text}>Nome: {props.name}</Text>
          <Text style={styles.text}>Sexo: {props.gender}</Text>
          <Text style={styles.text}>Endereço: {props.address}</Text>
          <Text style={styles.text}>Telefone: {props.phoneNumber}</Text>
          <Text style={styles.text}>Foto de Perfil: {props.photo}</Text>
          <Text style={styles.text}>
            Data de aniversário: {props.birthDate}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Informações do Funcionário</Text>
          <Text style={styles.text}>Cargo: {props.role}</Text>
          <Text style={styles.text}>
            Data de Admissão: {props.admissionDate}
          </Text>
          <Text style={styles.text}>Setor: {props.sector}</Text>
          <Text style={styles.text}>Salário: {props.salary}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default DocumentPage;
