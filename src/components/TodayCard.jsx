import { getShift, getHoliday } from "../data/schedule-data";

const shiftInfo = {
  M: {
    emoji: "🟦",
    label: "Manhã",
    code: "05h",
    hours: "05:00 - 13:00",
  },
  T: {
    emoji: "🟩",
    label: "Tarde",
    code: "13h",
    hours: "13:00 - 21:00",
  },
  N: {
    emoji: "🟪",
    label: "Noite",
    code: "21h",
    hours: "21:00 - 05:00",
  },
  F: {
    emoji: "⬛",
    label: "Folga",
    code: "F",
    hours: "",
  },
};

function formatDate(date) {
  return date.toLocaleDateString("pt-PT", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function TodayCard({ team }) {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const shift = getShift(team, year, month, day);
  const holiday = getHoliday(year, month, day);

  const info = shiftInfo[shift] || shiftInfo.F;

  return (
    <div
      style={{
        margin: "20px",
        padding: "24px",
        borderRadius: "16px",
        background: holiday ? "#92400e" : "#1e293b",
        color: "white",
        textAlign: "center",
        border: holiday ? "2px solid #fbbf24" : "none",
      }}
    >
      <p style={{ color: "#cbd5e1" }}>{formatDate(today)}</p>

      {holiday && (
        <p
          style={{
            color: "#fde68a",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          ⭐ {holiday}
        </p>
      )}

      <h2>Hoje</h2>

      <h3>Equipa {team}</h3>

      <div style={{ fontSize: "34px", margin: "15px 0" }}>
        {info.emoji}
      </div>

      <h1 style={{ margin: "5px 0" }}>{info.code}</h1>

      <h2>{info.label}</h2>

      {info.hours && (
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>
          {info.hours}
        </p>
      )}
    </div>
  );
}