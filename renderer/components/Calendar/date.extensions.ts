export class iDate extends Date {
  addMonths:Function
  isLeapYear: Function
  getDaysInMonth: Function
}

export const isLeapYear = (year) => {
  return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
};

export const getDaysInMonthDeep = (date, year, month) => {
  return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

export const getDaysInMonth = (date) => {
  return getDaysInMonthDeep(date, date.getFullYear(), date.getMonth());
};

export const addMonths = function (date, value):Date {
  var n = date.getDate();
  date.setDate(1);
  date.setMonth(date.getMonth() + value);
  date.setDate(Math.min(n, getDaysInMonth(date)));
  return date;
};