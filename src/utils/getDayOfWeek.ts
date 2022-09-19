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
