const startOfWeek = function (date) {
  let d = new Date(date);
  d.setMilliseconds(0);
  d.setSeconds(0);
  d.setMinutes(0);
  d.setHours(0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

const endOfWeek = function (date) {
  let beginning = startOfWeek(date);
  let d = new Date(beginning);
  d.setDate(d.getDate() + 7);
  return new Date(d.getTime() - 1);
}

const startOfToday = function (date) {
  let d = new Date(date);
  d.setMilliseconds(0);
  d.setSeconds(0);
  d.setMinutes(0);
  d.setHours(0);
  return d;
}

const endOfToday = function (date) {
  let beginning = startOfToday(date);
  let d = new Date(beginning);
  d.setDate(d.getDate() + 1);
  return new Date(d.getTime() - 1);
}

const endOfTomorrow = function (date) {
  let beginning = startOfToday(date);
  let d = new Date(beginning);
  d.setDate(d.getDate() + 2);
  return new Date(d.getTime() - 1);
}

