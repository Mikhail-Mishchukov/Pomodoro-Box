export const secondsInHour = 3600;
export const secondsInMinute = 60;

export function getHours(time: number) {
  time = Math.floor(time / 60 / 60);
  return time % 60;
}

export function getMinutes(time: number) {
  time = Math.floor(time / 60);
  return time % 60;
}

export function formatTime(time: number) {
  const min =
    Math.floor(time / 60) > 9
      ? `${Math.floor(time / 60)}`
      : `0${Math.floor(time / 60)}`;
  const s = time % 60 > 9 ? `${time % 60}` : `0${time % 60}`;
  return `${min}:${s}`;
}

export function getFullTodoTime(time: number) {
  let timeString: string = "";

  if (time > 59) {
    timeString = hoursAndMinutes(time);
  }
  return timeString;
}

function hoursAndMinutes(time: number) {
  time = Math.floor(time / 60);
  const m = time % 60;
  const h = Math.floor(time / 60);
  let hoursStr: string = "";

  if (h % 10 === 1 && h !== 11) {
    hoursStr = `${h} час`;
  } else if (h % 10 > 1 && h % 10 < 5 && (h > 20 || h < 10)) {
    hoursStr = `${h} часа`;
  } else if (h === 0) {
    hoursStr = "";
  } else {
    hoursStr = `${h} часов`;
  }
  return hoursStr.concat(` ${m} мин`);
}
