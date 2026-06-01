const teams = ["A", "B", "C", "D", "E"];

export default function TeamSelector({ team, setTeam }) {
  return (
    <div style={{ padding: "20px" }}>
      {teams.map((t) => (
        <button
          key={t}
          onClick={() => setTeam(t)}
          style={{
            margin: "5px",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor: team === t ? "#2563eb" : "#555",
            color: "white",
          }}
        >
          Equipa {t}
        </button>
      ))}
    </div>
  );
}