export function getYTicks(data: { name: string; time: number }[]) {
  let ticks: number[] = [];
  let max = data[0].time;
  for (let i = 1; i < data.length; i++) {
    if (data[i].time > max) {
      max = data[i].time;
    }
  }
  const tickCount = Math.floor(max / 25);

  if (tickCount < 4) {
    return [0, 25, 50, 75];
  }

  for (let i = 1; i < 5; i++) {
    ticks.push(i * 25);
  }

  return ticks;
}
