import classNames from 'classnames';

import styles from './Activity.module.css';
import { DropdownWeek } from './DropdownWeek';

import { useAppSelector } from '../../../store/hooks';
import { EBtnWeek } from '../../../store/static/staticSlice';
import { StaticCards } from './StaticCards';
import { CounterTomato } from './CounterTomato';
import { ActivityChart } from './ActivityChart';
import { DayInfo } from './DayInfo';

export function Activity() {
  const nameDayOfWeek = useAppSelector((state) => state.static.numberOfDay);

  const weekName = useAppSelector((state) => state.static.weekAray[0].btnName);
  const chosenWeek = getChosenWeek(weekName);

  function getChosenWeek(week: EBtnWeek) {
    switch (week) {
      case EBtnWeek.thisWeek:
        return 'thisWeek';
      case EBtnWeek.lastWeek:
        return 'lastWeek';
      case EBtnWeek.preLastWeek:
        return 'prelastWeek';
    }
  }

  return (
    <div className={classNames('container', styles.container)}>
      <div className={styles.header}>
        <h2>Ваша активность</h2>
        <DropdownWeek />
      </div>
      <div className={styles.infoContainer}>
        <DayInfo chosenWeek={chosenWeek} nameDayOfWeek={nameDayOfWeek} />

        <ActivityChart chosenWeek={chosenWeek} />

        <CounterTomato chosenWeek={chosenWeek} nameDayOfWeek={nameDayOfWeek} />
      </div>
      <StaticCards chosenWeek={chosenWeek} nameDayOfWeek={nameDayOfWeek} />
    </div>
  );
}
