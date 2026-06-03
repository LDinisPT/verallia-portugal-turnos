import { getShift } from "../data/schedule-data";

const shiftInfo = {
  M: { label: "05h Manhã" },
  T: { label: "13h Tarde" },
  N: { label: "21h Noite" },
  F: { label: "Folga" },
};

export default function NextDays({ team }) {
  const days = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const shift = getShift(team, year, month, day);
    const info = shiftInfo[shift] || shiftInfo.F;

    days.push({
      date: date.toLocaleDateString("pt-PT"),
      shift: info.label,
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
      <h2>Próximos 7 Dias</h2>

      {days.map((d, index) => (
        <div
          key={index}
          style={{
            padding: "8px 0",
            borderBottom: "1px solid #334155",
          }}
        >
          <strong>{d.date}</strong> → {d.shift}
        </div>
      ))}
    </div>
  );
}