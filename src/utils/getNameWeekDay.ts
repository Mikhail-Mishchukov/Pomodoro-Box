import { EWeek } from '../store/static/staticSlice';

export function getNameWeekDay(chosenDay: EWeek) {
  switch (chosenDay) {
    case EWeek.monday:
      return 'Понедельник';
    case EWeek.tuesday:
      return 'Вторник';
    case EWeek.wednesday:
      return 'Среда';
    case EWeek.thursday:
      return 'Четверг';
    case EWeek.friday:
      return 'Пятница';
    case EWeek.saturday:
      return 'Суббота';
    case EWeek.sunday:
      return 'Воскресенье';
  }
}
