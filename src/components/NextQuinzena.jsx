import { getShift } from "../data/schedule-data";

function formatDateLong(date) {
  return date.toLocaleDateString("pt-PT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NextQuinzena({ team }) {
  let startDate = null;
  let endDate = null;
  let count = 0;

  for (let i = 1; i <= 365; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    const shift = getShift(
      team,
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );

    if (shift === "F") {
      if (!startDate) {
        startDate = new Date(date);
      }

      endDate = new Date(date);
      count++;
    } else {
      if (count >= 10) {
        break;
      }

      startDate = null;
      endDate = null;
      count = 0;
    }
  }

  if (!startDate || count < 10) {
    return null;
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
      <h2>Próxima Quinzena</h2>

      <div style={{ fontSize: "30px" }}>⬛</div>

      <h3>Folga Grande</h3>

      <p>
        <strong>Início:</strong> {formatDateLong(startDate)}
      </p>

      <p>
        <strong>Fim:</strong> {formatDateLong(endDate)}
      </p>

      <p>
        <strong>Duração:</strong> {count} dias
      </p>
    </div>
  );
}