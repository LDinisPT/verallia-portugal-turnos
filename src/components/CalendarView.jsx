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

  function goToday() {
    setDate(new Date());
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
        style={{
          background: holiday ? "#924f1d" : info.color,
          borderRadius: "14px",
          padding: "10px",
          minHeight: "70px",
          color: "white",
          textAlign: "center",
          border: holiday ? "2px solid #facc15" : "none",
          transition: "0.2s",
        }}
      >
        <strong style={{ fontSize: "24px" }}>{day}</strong>

        <br />

        <span style={{ fontSize: "28px" }}>
          {shift}
        </span>

        <br />

        <span>{info.label}</span>

        {holiday && (
          <div
            style={{
              fontSize: "11px",
              marginTop: "6px",
              color: "#fde68a",
              fontWeight: "bold",
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
        borderRadius: "20px",
        background: "#1e293b",
        color: "white",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Calendário
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={previousMonth}
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
          }}
        >
          ←
        </button>

        <div style={{ textAlign: "center" }}>
          <strong
            style={{
              textTransform: "capitalize",
              fontSize: "30px",
            }}
          >
            {monthName}
          </strong>

          <br />

          <button
            onClick={goToday}
            style={{
              marginTop: "10px",
              padding: "8px 18px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Hoje
          </button>
        </div>

        <button
          onClick={nextMonth}
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
          }}
        >
          →
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "8px",
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

      <p
        style={{
          marginTop: "20px",
          textAlign: "center",
          opacity: 0.8,
        }}
      >
        🟦 Manhã &nbsp; 🟩 Tarde &nbsp; 🟪 Noite &nbsp; ⬛ Folga
      </p>
    </div>
  );
}