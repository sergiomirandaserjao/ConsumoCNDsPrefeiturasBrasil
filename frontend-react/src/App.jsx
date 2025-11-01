import React from "react";
import ConsultaCND from "./components/ConsultaCND";

export default function App() {
  return (
    <div style={{ fontFamily: "Arial", padding: "30px" }}>
      <h1>Consulta de Certidão Negativa de Débitos (CND)</h1>
      <ConsultaCND />
    </div>
  );
}
