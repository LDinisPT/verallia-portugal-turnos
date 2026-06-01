import { useState } from "react";
import { getShift } from "../data/schedule-data";

const shiftInfo = {
  M: "🟦 Manhã",
  T: "🟩 Tarde",
  N: "🟪 Noite",
  F: "⬛ Folga",
};

const teams = ["A", "B", "C", "D", "E"];

export default function DateSearch() {
  const [date, setDate] = useState("");

  const results = [];

  if (date) {
    const d = new Date(date);

    teams.forEach((team) => {
      const shift = getShift(
        team,
        d.getFullYear(),
        d.getMonth() + 1,
        d.getDate()
      );

      results.push({
        team,
        shift,
      });
    });
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
      <h2>Pesquisa por Data</h2>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {results.map((item) => (
        <p key={item.team}>
          Equipa {item.team} → {shiftInfo[item.shift]}
        </p>
      ))}
    </div>
  );
}