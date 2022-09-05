export function getPauseTime(time: number): string {
  time = Math.floor(time / 60);
  const minutes = time % 60;
  const hours = Math.floor(time / 60);
  let hoursStr = '';
  if (hours > 0) {
    hoursStr = `${hours}Ч`;
  }
  let minutesStr = ``;
  if (minutes > 0) {
    minutesStr = `${minutes}M`;
  }

  return `${hoursStr} ${minutesStr}`;
}
