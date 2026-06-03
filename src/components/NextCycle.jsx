import { getShift } from "../data/schedule-data";

const shiftInfo = {
  M: "🟦 05h Manhã",
  T: "🟩 13h Tarde",
  N: "🟪 21h Noite",
};

export default function NextCycle({ team }) {
  const cycle = [];

  let foundShift = null;

  for (let i = 1; i <= 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    const shift = getShift(
      team,
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );

    if (!foundShift) {
      if (shift !== "F") {
        foundShift = shift;
      } else {
        continue;
      }
    }

    if (shift !== foundShift) {
      break;
    }

    cycle.push({
      date: date.toLocaleDateString("pt-PT"),
      shift: shiftInfo[shift],
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
      <h2>Próximo Ciclo</h2>

      {cycle.map((day, index) => (
        <div
          key={index}
          style={{
            padding: "8px 0",
            borderBottom: "1px solid #334155",
          }}
        >
          <strong>{day.date}</strong> → {day.shift}
        </div>
      ))}
    </div>
  );
}