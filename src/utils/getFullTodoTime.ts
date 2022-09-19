import { hoursAndMinutes } from './hoursAndMinutes';

export function getFullTodoTime(time: number) {
  let timeString: string = '';

  if (time > 59) {
    timeString = hoursAndMinutes(time);
  }
  return timeString;
}
