export function getMinutes(time: number) {
  time = Math.floor(time / 60);

  return time % 60;
}
