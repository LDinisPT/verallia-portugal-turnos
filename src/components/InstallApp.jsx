export default function InstallApp() {
  return (
    <div
      style={{
        margin: "20px",
        padding: "20px",
        borderRadius: "12px",
        background: "#1e293b",
        color: "white",
        textAlign: "center",
      }}
    >
      <h2>📲 Instalar App</h2>

      <p>
        Podes instalar esta aplicação no telemóvel para acederes mais rápido aos turnos.
      </p>

      <div style={{ marginTop: "15px", textAlign: "left" }}>
        <p>
          <strong>Android:</strong> Chrome → menu ⋮ → Adicionar ao ecrã principal
        </p>

        <p>
          <strong>iPhone:</strong> Safari → Partilhar → Adicionar ao ecrã principal
        </p>
      </div>
    </div>
  );
}