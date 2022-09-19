export function hoursAndMinutes(time: number) {
  time = Math.floor(time / 60);
  const m = time % 60;
  const h = Math.floor(time / 60);
  let hoursStr: string = '';

  if (h % 10 === 1 && h !== 11) {
    hoursStr = `${h} час`;
  } else if (h % 10 > 1 && h % 10 < 5 && (h > 20 || h < 10)) {
    hoursStr = `${h} часа`;
  } else if (h === 0) {
    hoursStr = '';
  } else {
    hoursStr = `${h} часов`;
  }
  return hoursStr.concat(` ${m} мин`);
}
