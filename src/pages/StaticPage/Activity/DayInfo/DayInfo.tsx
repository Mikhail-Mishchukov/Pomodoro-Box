import {
  EColor,
  TextComponent,
} from '../../../../components/common/TextComponent';
import { useAppSelector } from '../../../../store/hooks';
import { EWeek } from '../../../../store/static/staticSlice';
import styles from './DayInfo.module.css';

interface IDayInfoProp {
  chosenWeek: 'thisWeek' | 'lastWeek' | 'prelastWeek';
  nameDayOfWeek: EWeek;
}

export function DayInfo({ chosenWeek, nameDayOfWeek }: IDayInfoProp) {
  const timeActiveTimer = useAppSelector(
    (state) =>
      state.static.staticInfo[chosenWeek][nameDayOfWeek].timeActiveTimer
  );
  const dayActiveInfo =
    timeActiveTimer < 60 ? '' : `${workTime(timeActiveTimer)}`;

  function getNameWeekDay(chosenDay: EWeek) {
    switch (chosenDay) {
      case EWeek.monday:
        return 'Понедельник';
      case EWeek.tuesday:
        return 'Вторник';
      case EWeek.wednesday:
        return 'Среда';
      case EWeek.thursday:
        return 'Четверг';
      case EWeek.friday:
        return 'Пятница';
      case EWeek.saturday:
        return 'Суббота';
      case EWeek.sunday:
        return 'Воскресенье';
    }
  }
  function workTime(time: number): string {
    time = Math.floor(time / 60);
    const minutes = time % 60;
    const hours = Math.floor(time / 60);
    let hoursStr = '';
    if (hours % 10 === 1 && hours !== 11) {
      hoursStr = `${hours} часа`;
    } else if (hours === 0) {
      hoursStr = '';
    } else {
      hoursStr = `${hours} часов`;
    }

    let minutesStr = '';
    if (minutes % 10 === 1 && minutes !== 11) {
      minutesStr = `${minutes} минуты`;
    } else if (minutes === 0) {
      minutesStr = '';
    } else {
      minutesStr = `${minutes} минут`;
    }

    return `${hoursStr} ${minutesStr}`;
  }

  return (
    <div className={styles.dayOfWeekContainer}>
      <TextComponent
        children={getNameWeekDay(nameDayOfWeek)}
        size={24}
        As={'h3'}
        addClass={styles.dayOfWeek}
      />
      <TextComponent
        children={
          timeActiveTimer < 60
            ? 'Нет данных'
            : `Вы работали над задачами в течение `
        }
        size={16}
      />
      {dayActiveInfo && (
        <TextComponent
          children={dayActiveInfo}
          color={EColor.red}
          size={16}
          addClass={styles.workTimeInfo}
        />
      )}
    </div>
  );
}
