export type DateMap = Map<number, Map<number, Map<number, boolean[]>>>;

export const today = resetTime(new Date());

export const fullDay = new Array<boolean>(24).fill(true);

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeStyle: "long",
  }).format(date);
}

export function resetTime(date: Date) {
  date.setHours(0, 0, 0, 0);
  return date;
}

export const namedDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const namedMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function datesToDateMap(dates: Map<string, boolean[]>) {
  const res: DateMap = new Map(new Map(new Map()));

  dates.forEach((value, key) => {
    const d = key.split("-");

    const year = Number(d[0]);
    const month = Number(d[1]) - 1;
    const date = Number(d[2]);

    if (!res.get(year)) {
      res.set(year, new Map());
    }

    if (!res.get(year)?.get(month)) {
      res.get(year)?.set(month, new Map());
    }

    res.get(year)?.get(month)?.set(date, value);
  });

  return res;
}

export function dateMapToDates(dateMap: DateMap) {
  const res = new Map();

  dateMap.keys().forEach((year) => {
    dateMap
      .get(year)
      ?.keys()
      .forEach((month) => {
        dateMap
          .get(year)
          ?.get(month)
          ?.forEach((value, date) => {
            res.set(`${year}-${month}-${date}`, value);
          });
      });
  });

  return res;
}
