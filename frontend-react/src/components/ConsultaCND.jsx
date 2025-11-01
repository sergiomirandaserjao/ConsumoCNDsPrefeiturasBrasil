import React, { useState } from "react";

export default function ConsultaCND() {
  const [cidade, setCidade] = useState("sp");
  const [cnpj, setCnpj] = useState("");
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  const consultar = async () => {
    if (!cnpj) {
      setErro("Informe um CNPJ válido.");
      return;
    }

    setErro(null);
    setCarregando(true);
    setResultado(null);

    try {
      const response = await fetch(
        `http://localhost:8080/index.php?cidade=${cidade}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cnpj }),
        }
      );

      const data = await response.json();
      setResultado(data);
    } catch (err) {
      setErro("Erro ao conectar com o servidor PHP.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        marginTop: "30px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <label>Cidade:</label>
      <select
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      >
        <option value="sp">São Paulo</option>
        <option value="curitiba">Curitiba</option>
        <option value="porto-alegre">Porto Alegre</option>
      </select>

      <label>CNPJ:</label>
      <input
        type="text"
        placeholder="Digite o CNPJ"
        value={cnpj}
        onChange={(e) => setCnpj(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <button
        onClick={consultar}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        disabled={carregando}
      >
        {carregando ? "Consultando..." : "Consultar CND"}
      </button>

      {erro && (
        <p style={{ color: "red", marginTop: "15px" }}>
          ⚠️ {erro}
        </p>
      )}

      {resultado && (
        <div style={{ marginTop: "20px" }}>
          <h3>Resultado:</h3>
          <pre
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            {JSON.stringify(resultado, null, 2)}
          </pre>

          {resultado.pdf_url && (
            <a
              href={resultado.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                marginTop: "10px",
                color: "#007bff",
                textDecoration: "none",
              }}
            >
              📄 Abrir PDF da CND
            </a>
          )}
        </div>
      )}
    </div>
  );
}
