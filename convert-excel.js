import XLSX from "xlsx";
import fs from "fs";

const excelPath =
  "C:\\Users\\luisd\\OneDrive\\Ambiente de Trabalho\\verallia-netlify\\Horário 5 equipas 2026.xlsx";

const workbook = XLSX.readFile(excelPath);
const sheet = workbook.Sheets["Plano 2026"];

const rows = XLSX.utils.sheet_to_json(sheet, {
  header: 1,
  raw: false,
  blankrows: false,
});

const schedule = {
  A: {},
  B: {},
  C: {},
  D: {},
  E: {},
};

const months = {
  JANEIRO: 1,
  FEVEREIRO: 2,
  MARÇO: 3,
  ABRIL: 4,
  MAIO: 5,
  JUNHO: 6,
  JULHO: 7,
  AGOSTO: 8,
  SETEMBRO: 9,
  OUTUBRO: 10,
  NOVEMBRO: 11,
  DEZEMBRO: 12,
};

for (let r = 0; r < rows.length; r++) {
  const monthRow = rows[r];

  const monthPositions = monthRow
    .map((cell, index) => ({
      name: typeof cell === "string" ? cell.trim().toUpperCase() : cell,
      index,
    }))
    .filter((item) => months[item.name]);

  if (monthPositions.length === 0) continue;

  const dayRow = rows[r + 1];
  const teamRows = rows.slice(r + 2, r + 7);

  for (let i = 0; i < monthPositions.length; i++) {
    const monthName = monthPositions[i].name;
    const month = months[monthName];

    const startCol = monthPositions[i].index;
    const endCol =
      i + 1 < monthPositions.length
        ? monthPositions[i + 1].index
        : dayRow.length;

    for (let col = startCol; col < endCol; col++) {
      const day = Number(dayRow[col]);
      if (!day) continue;

      const date =
        `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

      for (const teamRow of teamRows) {
        const team = teamRow[0];

        if (!["A", "B", "C", "D", "E"].includes(team)) continue;

        const value = teamRow[col];

        const shift =
          value === "M" || value === "T" || value === "N"
            ? value
            : "F";

        schedule[team][date] = shift;
      }
    }
  }
}

const output = `
export const schedule = ${JSON.stringify(schedule, null, 2)};

export function getShift(team, year, month, day) {
  const date =
    \`\${year}-\${String(month).padStart(2, "0")}-\${String(day).padStart(2, "0")}\`;

  return schedule[team]?.[date] || "F";
}
`;

fs.writeFileSync("src/data/schedule-data.js", output, "utf8");

console.log("schedule-data.js gerado com sucesso!");
console.log("Equipa A:", Object.keys(schedule.A).length, "dias");
console.log("Equipa B:", Object.keys(schedule.B).length, "dias");
console.log("Equipa C:", Object.keys(schedule.C).length, "dias");
console.log("Equipa D:", Object.keys(schedule.D).length, "dias");
console.log("Equipa E:", Object.keys(schedule.E).length, "dias");