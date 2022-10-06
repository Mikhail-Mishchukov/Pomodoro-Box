import { EWeek } from '../store/static/staticSlice';

export function getDayOfWeek(date: Date | number): EWeek {
  const week: EWeek[] = [
    EWeek.sunday,
    EWeek.monday,
    EWeek.tuesday,
    EWeek.wednesday,
    EWeek.thursday,
    EWeek.friday,
    EWeek.saturday,
  ];
  if (typeof date === 'number') {
    return week[date];
  } else {
    return week[date.getDay()];
  }
}
export function getNumberOfWeek() {
  const day = new Date();
  const oneJan = new Date(day.getFullYear(), 0, 1);
  const numberOfDays =
    Math.floor((day.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000)) + 1;

  return Math.ceil((day.getDay() + 1 + numberOfDays) / 7) - 1;
}
