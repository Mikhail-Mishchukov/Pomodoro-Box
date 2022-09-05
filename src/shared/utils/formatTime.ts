export function formatTime(time: number) {
  const min =
    Math.floor(time / 60) > 9
      ? `${Math.floor(time / 60)}`
      : `0${Math.floor(time / 60)}`;
  const s = time % 60 > 9 ? `${time % 60}` : `0${time % 60}`;
  return `${min}:${s}`;
}
