import { firestore } from 'firebase/app';

export function timestampAfterMilliseconds(timestamp, milliseconds) {
  const timeAsDate = new Date(timestamp.toDate().getTime() + milliseconds);
  return firestore.Timestamp.fromDate(timeAsDate);
}

export function startOfWeek(date) {
  let d = new Date(date);
  d.setMilliseconds(0);
  d.setSeconds(0);
  d.setMinutes(0);
  d.setHours(0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

export function endOfWeek(date) {
  let beginning = startOfWeek(date);
  let d = new Date(beginning);
  d.setDate(d.getDate() + 7);
  return new Date(d.getTime() - 1);
}

export function startOfToday(date) {
  let d = new Date(date);
  d.setMilliseconds(0);
  d.setSeconds(0);
  d.setMinutes(0);
  d.setHours(0);
  return d;
}

export function endOfToday(date) {
  let beginning = startOfToday(date);
  let d = new Date(beginning);
  d.setDate(d.getDate() + 1);
  return new Date(d.getTime() - 1);
}

export function endOfTomorrow(date) {
  let beginning = startOfToday(date);
  let d = new Date(beginning);
  d.setDate(d.getDate() + 2);
  return new Date(d.getTime() - 1);
}
