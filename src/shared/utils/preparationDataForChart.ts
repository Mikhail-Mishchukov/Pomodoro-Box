import { EWeek, IWeekInfo } from '../../store/static/staticSlice';

export function preparationDataForChart(data: IWeekInfo) {
  return [
    {
      name: 'Пн',
      time: Math.floor(data[EWeek.monday].timeActiveTimer / 60),
    },
    {
      name: 'Вт',
      time: Math.floor(data[EWeek.tuesday].timeActiveTimer / 60),
    },
    {
      name: 'Ср',
      time: Math.floor(data[EWeek.wednesday].timeActiveTimer / 60),
    },
    {
      name: 'Чт',
      time: Math.floor(data[EWeek.thursday].timeActiveTimer / 60),
    },
    {
      name: 'Пт',
      time: Math.floor(data[EWeek.friday].timeActiveTimer / 60),
    },
    {
      name: 'Сб',
      time: Math.floor(data[EWeek.saturday].timeActiveTimer / 60),
    },
    {
      name: 'Вс',
      time: Math.floor(data[EWeek.sunday].timeActiveTimer / 60),
    },
  ];
}
