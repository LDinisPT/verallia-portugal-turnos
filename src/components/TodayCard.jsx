import { getShift } from "../data/schedule-data";

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

  const shift = getShift(
    team,
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );

  const info = shiftInfo[shift] || shiftInfo.F;

  return (
    <div
      style={{
        margin: "20px",
        padding: "24px",
        borderRadius: "16px",
        background: "#1e293b",
        color: "white",
        textAlign: "center",
      }}
    >
      <p style={{ color: "#94a3b8" }}>
        {formatDate(today)}
      </p>

      <h2>Hoje</h2>

      <h3>Equipa {team}</h3>

      <div style={{ fontSize: "34px", margin: "15px 0" }}>
        {info.emoji}
      </div>

      <h1 style={{ margin: "5px 0" }}>
        {info.code}
      </h1>

      <h2>{info.label}</h2>

      {info.hours && (
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>
          {info.hours}
        </p>
      )}
    </div>
  );
}