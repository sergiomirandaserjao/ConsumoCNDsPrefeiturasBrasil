import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";
import { getCND } from "../utils/api";

const cities = {
  sp: { name: "São Paulo", endpoint: "http://localhost/cnd/api/sp.php" },
  curitiba: { name: "Curitiba", endpoint: "http://localhost/cnd/api/curitiba.php" },
  poa: { name: "Porto Alegre", endpoint: "http://localhost/cnd/api/portoalegre.php" }
};

export default function CityPage() {
  const { id } = useParams();
  const city = cities[id];
  const [cnpj, setCnpj] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleConsult = async () => {
    if (!cnpj) return alert("Informe um CNPJ válido");
    setLoading(true);
    try {
      const data = await getCND(city.endpoint, cnpj);
      setPdfUrl(data.pdf_url);
    } catch (err) {
      alert("Erro ao consultar a CND");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!pdfUrl) return;
    const response = await axios.get(pdfUrl, { responseType: "blob" });
    saveAs(response.data, `CND-${city.id}.pdf`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Consulta CND - {city.name}</h2>
      <input
        style={styles.input}
        type="text"
        placeholder="Digite o CNPJ"
        value={cnpj}
        onChange={(e) => setCnpj(e.target.value)}
      />
      <button onClick={handleConsult} style={styles.button} disabled={loading}>
        {loading ? "Consultando..." : "Consultar"}
      </button>

      {pdfUrl && (
        <div style={{ marginTop: "20px" }}>
          <p>Certidão disponível!</p>
          <button onClick={handleDownload} style={styles.button}>
            Baixar PDF
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "60px" },
  title: { fontSize: "22px", color: "#222" },
  input: { padding: "10px", fontSize: "16px", width: "300px", marginRight: "10px" },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};
