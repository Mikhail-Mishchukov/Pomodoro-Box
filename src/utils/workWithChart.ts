import { Week } from "../store/staticSlice";
//
export function getDayOfWeek(date: Date | number): Week {
  const week: Week[] = [
    Week.sunday,
    Week.monday,
    Week.tuesday,
    Week.wednesday,
    Week.thursday,
    Week.friday,
    Week.saturday,
  ];
  if (typeof date === "number") {
    return week[date];
  } else {
    return week[date.getDay()];
  }
}
// export function getNumberOfWeek() {
//   const day = new Date();
//   const oneJan = new Date(day.getFullYear(), 0, 1);
//   const numberOfDays =
//     Math.floor((day.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000)) + 1;

//   return Math.ceil((day.getDay() + 1 + numberOfDays) / 7) - 1;
// }
