import { getShift } from "../data/schedule-data";

const colors = {
  M: "#2563eb",
  T: "#16a34a",
  N: "#7c3aed",
  F: "#334155",
};

function getCircleSegment(percent, offset) {
  const circumference = 2 * Math.PI * 45;

  return {
    strokeDasharray: `${percent * circumference} ${circumference}`,
    strokeDashoffset: -offset * circumference,
  };
}

export default function Stats({ team }) {
  const year = 2026;

  const stats = {
    M: 0,
    T: 0,
    N: 0,
    F: 0,
  };

  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);

  for (
    let date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    const shift = getShift(
      team,
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );

    stats[shift] = (stats[shift] || 0) + 1;
  }

  const total = stats.M + stats.T + stats.N + stats.F;

  const values = [
    { key: "M", label: "Manhã", emoji: "🟦", value: stats.M },
    { key: "T", label: "Tarde", emoji: "🟩", value: stats.T },
    { key: "N", label: "Noite", emoji: "🟪", value: stats.N },
    { key: "F", label: "Folgas", emoji: "⬛", value: stats.F },
  ];

  let offset = 0;

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
      <h2>Estatísticas 2026</h2>

      <p>Equipa {team}</p>

      <svg width="180" height="180" viewBox="0 0 100 100">
        {values.map((item) => {
          const percent = item.value / total;

          const segment = getCircleSegment(percent, offset);

          offset += percent;

          return (
            <circle
              key={item.key}
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke={colors[item.key]}
              strokeWidth="10"
              transform="rotate(-90 50 50)"
              {...segment}
            />
          );
        })}

        <circle
          cx="50"
          cy="50"
          r="30"
          fill="#1e293b"
        />

        <text
          x="50"
          y="48"
          textAnchor="middle"
          fill="white"
          fontSize="8"
        >
          {total}
        </text>

        <text
          x="50"
          y="58"
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="6"
        >
          dias
        </text>
      </svg>

      <div style={{ marginTop: "15px", textAlign: "left" }}>
        {values.map((item) => (
          <p key={item.key}>
            {item.emoji} {item.label}:{" "}
            <strong>{item.value}</strong>
          </p>
        ))}
      </div>
    </div>
  );
}