import { getShift } from "../data/schedule-data";

const shiftInfo = {
  M: {
    label: "Manhã",
    time: "05h",
    color: "#2563eb",
    emoji: "🟦",
  },
  T: {
    label: "Tarde",
    time: "13h",
    color: "#16a34a",
    emoji: "🟩",
  },
  N: {
    label: "Noite",
    time: "21h",
    color: "#7c3aed",
    emoji: "🟪",
  },
  F: {
    label: "Folga",
    time: "F",
    color: "#334155",
    emoji: "⬛",
  },
};

function formatShortDate(date) {
  return date.toLocaleDateString("pt-PT", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
}

export default function NextDays({ team }) {
  const days = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    const shift = getShift(
      team,
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );

    const info = shiftInfo[shift] || shiftInfo.F;

    days.push({
      date: formatShortDate(date),
      ...info,
    });
  }

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
      <h2 style={{ textAlign: "center", marginBottom: "18px" }}>
        Próximos 7 Dias
      </h2>

      <div
        style={{
          display: "grid",
          gap: "10px",
        }}
      >
        {days.map((day, index) => (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto auto",
              alignItems: "center",
              gap: "12px",
              padding: "14px 16px",
              borderRadius: "14px",
              background: "#0f172a",
              borderLeft: `5px solid ${day.color}`,
            }}
          >
            <div>
              <strong>{day.date}</strong>
            </div>

            <div
              style={{
                color: day.color,
                fontWeight: "bold",
              }}
            >
              {day.label}
            </div>

            <div
              style={{
                minWidth: "44px",
                textAlign: "center",
                padding: "6px 10px",
                borderRadius: "999px",
                background: `${day.color}33`,
                color: "white",
                fontWeight: "bold",
              }}
            >
              {day.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}