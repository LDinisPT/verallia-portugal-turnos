export default function BottomNav() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%",
        background: "#0f172a",
        borderTop: "1px solid #334155",
        display: "flex",
        justifyContent: "space-around",
        padding: "12px 0",
        zIndex: 999,
      }}
    >
      <button style={btn}>
        <span>🏠</span>
        <span>Hoje</span>
      </button>

      <button style={btn}>
        <span>📅</span>
        <span>Calendário</span>
      </button>

      <button style={btn}>
        <span>📊</span>
        <span>Stats</span>
      </button>

      <button style={btn}>
        <span>⚙️</span>
        <span>Mais</span>
      </button>
    </div>
  );
}

const btn = {
  background: "none",
  border: "none",
  color: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
  fontSize: "12px",
  cursor: "pointer",
};