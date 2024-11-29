import dayjs from "dayjs";

const HOLIDAYS = [
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

function getDayAndMonth(date: Date) {
  const [fullDate, ..._] = date.toLocaleString().split(",");
  const [day, month, _year] = fullDate.split("/");
  return day + "/" + month;
}

function isWeekEnd(date: Date) {
  const day = date.getDay();
  return day === 6 || day === 0;
}

function isHoliday(date: Date) {
  let result = false;
  for (const holiday of HOLIDAYS) {
    const dayAndMonth = getDayAndMonth(date);
    if (dayAndMonth === holiday.date) {
      result = true;
    }
    if (result) break;
  }
  return result;
}

type GetIntervalInput = {
  startDate: Date;
  endDate: Date;
};

function getInterval({ startDate, endDate }: GetIntervalInput): number {
  const diff = dayjs(endDate).diff(startDate);
  let currDate = dayjs(startDate);
  const days = diff / 1000 / 60 / 60 / 24;
  let workDays = 0;
  for (let i = 0; i < days; i++) {
    const dt = currDate.toDate();
    if (!isHoliday(dt) && !isWeekEnd(dt)) {
      workDays++;
    }
    currDate = currDate.add(1, "day");
  }
  return workDays;
}

type GetEndDateInput = {
  startDate: Date;
  days: number;
};

function getEndDate({ startDate, days }: GetEndDateInput): Date {
  let currDate = dayjs(startDate);
  let d = 0;
  while (d < days) {
    const holiday = isHoliday(currDate.toDate());
    const weekend = isWeekEnd(currDate.toDate());
    if (!holiday && !weekend) {
      d++;
    }
    currDate = currDate.add(1, "day");
  }
  return currDate.toDate();
}

const WorkDays = {
  getEndDate,
  getInterval
}

export default WorkDays
