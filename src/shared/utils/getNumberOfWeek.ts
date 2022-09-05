export function getNumberOfWeek() {
  const day = new Date();
  const oneJan = new Date(day.getFullYear(), 0, 1);
  const numberOfDays =
    Math.floor((day.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000)) + 1;

  return Math.ceil((day.getDay() + 1 + numberOfDays) / 7) - 1;
}
