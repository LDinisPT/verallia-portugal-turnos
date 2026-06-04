import { getShift } from "../data/schedule-data";

const colors = {
  M: "#2563eb",
  T: "#16a34a",
  N: "#7c3aed",
  F: "#334155",
};

const labels = {
  M: "Manhã",
  T: "Tarde",
  N: "Noite",
  F: "Folgas",
};

const emojis = {
  M: "🟦",
  T: "🟩",
  N: "🟪",
  F: "⬛",
};

export default function Stats({ team }) {
  const stats = { M: 0, T: 0, N: 0, F: 0 };
  const year = 2026;

  for (let month = 1; month <= 12; month++) {
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const shift = getShift(team, year, month, day);
      if (stats[shift] !== undefined) stats[shift]++;
    }
  }

  const total = stats.M + stats.T + stats.N + stats.F;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;

  const items = ["M", "T", "N", "F"].map((key) => {
    const value = stats[key];
    const percent = value / total;
    const dash = `${percent * circumference} ${circumference}`;
    const dashOffset = -offset * circumference;

    offset += percent;

    return { key, value, percent, dash, dashOffset };
  });

  return (
    <div
      style={{
        margin: "20px",
        padding: "22px",
        borderRadius: "20px",
        background: "#1e293b",
        color: "white",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Estatísticas 2026</h2>

      <p style={{ textAlign: "center", opacity: 0.75 }}>
        Equipa {team}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <svg width="220" height="220" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#0f172a"
              strokeWidth="12"
            />

            {items.map((item) => (
              <circle
                key={item.key}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={colors[item.key]}
                strokeWidth="12"
                strokeDasharray={item.dash}
                strokeDashoffset={item.dashOffset}
                transform="rotate(-90 50 50)"
              />
            ))}

            <circle cx="50" cy="50" r="28" fill="#1e293b" />

            <text
              x="50"
              y="48"
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="bold"
            >
              {total}
            </text>

            <text
              x="50"
              y="60"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="7"
            >
              dias
            </text>
          </svg>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "12px",
          }}
        >
          {items.map((item) => (
            <div
              key={item.key}
              style={{
                background: "#0f172a",
                borderRadius: "16px",
                padding: "16px",
                borderLeft: `5px solid ${colors[item.key]}`,
              }}
            >
              <div>{emojis[item.key]} {labels[item.key]}</div>

              <div
                style={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  marginTop: "8px",
                }}
              >
                {item.value}
              </div>

              <div style={{ opacity: 0.7 }}>
                {Math.round(item.percent * 100)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}