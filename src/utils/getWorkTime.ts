export function workTime(time: number): string {
  time = Math.floor(time / 60);
  const minutes = time % 60;
  const hours = Math.floor(time / 60);
  let hoursStr = '';
  if (hours % 10 === 1 && hours !== 11) {
    hoursStr = `${hours} часа`;
  } else if (hours === 0) {
    hoursStr = '';
  } else {
    hoursStr = `${hours} часов`;
  }

  let minutesStr = '';
  if (minutes % 10 === 1 && minutes !== 11) {
    minutesStr = `${minutes} минуты`;
  } else if (minutes === 0) {
    minutesStr = '';
  } else {
    minutesStr = `${minutes} минут`;
  }

  return `${hoursStr} ${minutesStr}`;
}
