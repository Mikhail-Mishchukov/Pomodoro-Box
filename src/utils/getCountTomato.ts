export function getCountTomato(count: number) {
  if (count % 10 === 1 && count !== 11) {
    return `${count} помидор`;
  } else if (count % 10 > 1 && count % 10 < 5 && (count > 20 || count < 10)) {
    return `${count} помидора`;
  } else if (count === 0) {
    return '';
  } else {
    return `${count} помидоров`;
  }
}
