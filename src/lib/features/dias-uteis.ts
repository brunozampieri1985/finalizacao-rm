export type HolidayType = {
  description: string;
  date: string;
};

export const HOLIDAYS = [
  { description: "Ano Novo", date: "01/01" },
  { description: "Carnaval", date: "12/02" },
  { description: "Paixão de Cristo", date: "29/03" },
  { description: "Tiradentes", date: "21/04" },
  { description: "Dia do Trabalho", date: "01/05" },
  { description: "Corpus Christi", date: "20/06" },
  { description: "Independência do Brasil", date: "07/09" },
  { description: "Nossa Senhora Aparecida", date: "12/10" },
  { description: "Finados", date: "02/11" },
  { description: "Proclamação da República", date: "15/11" },
  { description: "Natal", date: "25/12" },
  { description: "Revolução Constitucionalista", date: "09/07" },
  { description: "Consciência Negra", date: "20/11" },
];

function getDayAndMonth(date: Date | string) {
  let dt;
  if (typeof date === "string") {
    dt = date;
  } else {
    dt = date.toLocaleString();
  }
  const [fullDate, ..._] = dt.split(",");
  const [day, month, year] = fullDate.split("/");
  return day + "/" + month;
}

function isWeekEnd(date: Date | String) {}
