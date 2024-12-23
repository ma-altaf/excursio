export const today = new Date();

export const fullDay = new Array<boolean>(24).fill(true);

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

export const formatTime = (date: Date) =>
  new Intl.DateTimeFormat("en-CA", {
    timeStyle: "long",
  }).format(date);

export const resetTime = (date: Date) => {
  date.setHours(0, 0, 0, 0);
  return date;
};

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
