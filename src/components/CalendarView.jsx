import { useState } from "react";
import { getShift, getHoliday } from "../data/schedule-data";

const shiftInfo = {
  M: { label: "05h", color: "#2563eb" },
  T: { label: "13h", color: "#16a34a" },
  N: { label: "21h", color: "#7c3aed" },
  F: { label: "", color: "#334155" },
};

export default function CalendarView({ team }) {
  const [date, setDate] = useState(new Date());

  const year = date.getFullYear();
  const month = date.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekDay = new Date(year, month, 1).getDay();

  const monthName = date.toLocaleDateString("pt-PT", {
    month: "long",
    year: "numeric",
  });

  function previousMonth() {
    setDate(new Date(year, month - 1, 1));
  }

  function nextMonth() {
    setDate(new Date(year, month + 1, 1));
  }

  const cells = [];

  for (let i = 0; i < firstWeekDay; i++) {
    cells.push(<div key={`empty-${i}`} />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const shift = getShift(team, year, month + 1, day);
    const info = shiftInfo[shift] || shiftInfo.F;
    const holiday = getHoliday(year, month + 1, day);

    cells.push(
      <div
  key={day}
  title={holiday || ""}
  style={{

          background: holiday ? "#d97706" : info.color,
border: holiday ? "2px solid #fbbf24" : "none",
borderRadius: "10px",
          padding: "10px",
          minHeight: "55px",
          color: "white",
          textAlign: "center",
        }}
      >
    <strong>{day}</strong>
<br />
<span>{info.label}</span>

{holiday && (
  <div
    style={{
      fontSize: "10px",
      marginTop: "4px",
      color: "#fef3c7"
    }}
  >
    ⭐
  </div>
)}
      </div>
    );
  }

  return (
    <div
      style={{
        margin: "20px",
        padding: "20px",
        borderRadius: "12px",
        background: "#1e293b",
      }}
    >
      <h2>Calendário</h2>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={previousMonth}>←</button>
        <strong style={{ textTransform: "capitalize" }}>{monthName}</strong>
        <button onClick={nextMonth}>→</button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "6px",
          marginTop: "15px",
        }}
      >
        <strong>Dom</strong>
        <strong>Seg</strong>
        <strong>Ter</strong>
        <strong>Qua</strong>
        <strong>Qui</strong>
        <strong>Sex</strong>
        <strong>Sáb</strong>

        {cells}
      </div>

      <p style={{ marginTop: "15px" }}>
        🟦 Manhã &nbsp; 🟩 Tarde &nbsp; 🟪 Noite &nbsp; ⬛ Folga
      </p>
    </div>
  );
}