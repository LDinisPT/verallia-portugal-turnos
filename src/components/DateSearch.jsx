import { useState } from "react";
import { getShift, getHoliday } from "../data/schedule-data";

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

const teams = ["A", "B", "C", "D", "E"];

function formatDateLong(date) {
  return date.toLocaleDateString("pt-PT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function DateSearch() {
  const [date, setDate] = useState("");

  let selectedDate = null;
  let holiday = "";

  if (date) {
    selectedDate = new Date(date);
    holiday = getHoliday(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      selectedDate.getDate()
    );
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
      <h2 style={{ textAlign: "center" }}>Pesquisa por Data</h2>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{
          width: "100%",
          marginTop: "15px",
          padding: "14px",
          borderRadius: "12px",
          border: "1px solid #334155",
          background: "#0f172a",
          color: "white",
          fontSize: "16px",
        }}
      />

      {selectedDate && (
        <>
          <div
            style={{
              marginTop: "18px",
              padding: "14px",
              borderRadius: "14px",
              background: holiday ? "#92400e" : "#0f172a",
              border: holiday ? "2px solid #fbbf24" : "1px solid #334155",
              textAlign: "center",
            }}
          >
            <strong>{formatDateLong(selectedDate)}</strong>

            {holiday && (
              <div
                style={{
                  color: "#fde68a",
                  marginTop: "8px",
                  fontWeight: "bold",
                }}
              >
                ⭐ {holiday}
              </div>
            )}
          </div>

          <div
            style={{
              marginTop: "15px",
              display: "grid",
              gap: "10px",
            }}
          >
            {teams.map((team) => {
              const shift = getShift(
                team,
                selectedDate.getFullYear(),
                selectedDate.getMonth() + 1,
                selectedDate.getDate()
              );

              const info = shiftInfo[shift] || shiftInfo.F;

              return (
                <div
                  key={team}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr auto",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px",
                    borderRadius: "14px",
                    background: "#0f172a",
                    borderLeft: `5px solid ${info.color}`,
                  }}
                >
                  <strong>Equipa {team}</strong>

                  <span>
                    {info.emoji} {info.label}
                  </span>

                  <strong
                    style={{
                      padding: "6px 10px",
                      borderRadius: "999px",
                      background: `${info.color}33`,
                    }}
                  >
                    {info.time}
                  </strong>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}