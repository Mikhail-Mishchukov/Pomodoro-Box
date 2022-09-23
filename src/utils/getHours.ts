export function getHours(time: number) {
  time = Math.floor(time / 60 / 60);
  return time % 60;
}
