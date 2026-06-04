import { getShift } from "../data/schedule-data";

const info = {
  M: {
    label: "Manhã",
    time: "05h",
    color: "#2563eb",
    emoji: "🟦",
    hours: "05:00 - 13:00",
  },

  T: {
    label: "Tarde",
    time: "13h",
    color: "#16a34a",
    emoji: "🟩",
    hours: "13:00 - 21:00",
  },

  N: {
    label: "Noite",
    time: "21h",
    color: "#7c3aed",
    emoji: "🟪",
    hours: "21:00 - 05:00",
  },

  F: {
    label: "Folga",
    time: "F",
    color: "#334155",
    emoji: "⬛",
    hours: "Folga",
  },
};

export default function DashboardCards({ team }) {
  const today = new Date();

  const shift = getShift(
    team,
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );

  const current = info[shift] || info.F;

  function getNextShift() {
    for (let i = 1; i <= 30; i++) {
      const next = new Date();
      next.setDate(today.getDate() + i);

      const s = getShift(
        team,
        next.getFullYear(),
        next.getMonth() + 1,
        next.getDate()
      );

      if (s !== shift) {
        return {
          ...info[s],
          date: next.toLocaleDateString("pt-PT", {
            weekday: "short",
            day: "2-digit",
            month: "short",
          }),
        };
      }
    }

    return null;
  }

  const nextShift = getNextShift();

  return (
    <div
      style={{
        margin: "20px",
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "15px",
      }}
    >
      <div
        style={{
          padding: "28px",
          borderRadius: "20px",
          background: `linear-gradient(135deg, ${current.color}, #0f172a)`,
          color: "white",
          boxShadow: `0 0 25px ${current.color}55`,
        }}
      >
        <div style={{ opacity: 0.7, marginBottom: "10px" }}>
          Hoje
        </div>

        <div style={{ fontSize: "70px", lineHeight: 1 }}>
          {current.time}
        </div>

        <div
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            marginTop: "5px",
          }}
        >
          {current.label}
        </div>

        <div style={{ opacity: 0.8 }}>
          {current.hours}
        </div>

        {nextShift && (
          <div
            style={{
              marginTop: "25px",
              paddingTop: "15px",
              borderTop: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <div style={{ opacity: 0.7 }}>
              Próximo turno
            </div>

            <div
              style={{
                marginTop: "6px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {nextShift.emoji} {nextShift.label}
            </div>

            <div style={{ opacity: 0.8 }}>
              {nextShift.date} • {nextShift.time}
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          padding: "20px",
          borderRadius: "20px",
          background: "#1e293b",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ opacity: 0.7 }}>
          Equipa
        </div>

        <div
          style={{
            fontSize: "60px",
            fontWeight: "bold",
          }}
        >
          {team}
        </div>

        <div style={{ opacity: 0.7 }}>
          Turno atual
        </div>

        <div
          style={{
            marginTop: "8px",
            fontSize: "20px",
          }}
        >
          {current.emoji} {current.label}
        </div>
      </div>
    </div>
  );
}