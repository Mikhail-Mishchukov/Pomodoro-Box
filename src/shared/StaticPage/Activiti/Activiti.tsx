import classNames from 'classnames';
import { EColor, TextComponent } from '../../utils-components/TextComponent';
import styles from './activiti.module.css';
import { DropdownWeek } from './DrpodownWeek';
import imgTomato from '../../../Assets/img/tomato.png';
import { EIcons, Icon } from '../../utils-components/Icon';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Text,
} from 'recharts';
import { useState } from 'react';
import { getNameWeekDay } from '../../utils/getNameWeekDay';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { workTime } from '../../utils/getWorkTime';
import { getCountTomato } from '../../utils/getCountTomato';
import { getPauseTime } from '../../utils/getPauseTime';
import { preparationDataForChart } from '../../utils/preparationDataForChart';
import { setChoosenDayOfWeek } from '../../../store/static/staticSlice';
import { getYTicks } from '../../utils/getYTicks';
import { getChosenWeek } from '../../utils/getChosenWeek';

export function Activiti() {
  const [activeIndex, setActiveIndex] = useState(
    new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
  );
  const nameDayOfWeek = useAppSelector((state) => state.static.numberOfDay);

  const weekName = useAppSelector((state) => state.static.weekAray[0].btnName);
  const chosenWeek = getChosenWeek(weekName);
  const dataRedux = useAppSelector(
    (state) => state.static.staticInfo[chosenWeek][nameDayOfWeek]
  );

  const dataWeek = useAppSelector(
    (state) => state.static.staticInfo[chosenWeek]
  );
  const dispatch = useAppDispatch();
  const data = preparationDataForChart(dataWeek);
  const dayActiveInfo =
    dataRedux.timeActiveTimer < 60
      ? ''
      : `${workTime(dataRedux.timeActiveTimer)}`;

  const classNameContainerCard =
    dataRedux.timeActiveTimer < 60
      ? classNames(styles.infoCardContainer)
      : classNames(styles.infoCardContainer, styles.infoCardActive);

  return (
    <div className={classNames('container', styles.container)}>
      <div className={styles.header}>
        <h2>Ваша активность</h2>
        <DropdownWeek />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.dayOfWeekContainer}>
          <TextComponent
            children={getNameWeekDay(nameDayOfWeek)}
            size={24}
            As={'h3'}
            addClass={styles.dayOfWeek}
          />
          <TextComponent
            children={
              dataRedux.timeActiveTimer < 60
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
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 45, right: 0, bottom: 0, left: 0 }}
              barCategoryGap="10%"
            >
              <svg>
                <rect fill="#ECECEC" height="51" width="100%" y="437" x="0" />
              </svg>
              <svg>
                <rect fill="#ebe8e8" height="437" width="100%" y="0" x="0" />
              </svg>
              <XAxis
                dataKey="name"
                cursor="pointer"
                axisLine={false}
                tickLine={false}
                height={35}
                padding={{ left: 40, right: 20 }}
                fontSize={20}
                tick={(e) => {
                  const {
                    payload: { index, value },
                  } = e;
                  const color = index === activeIndex ? '#DC3E22' : '#999999';
                  e['fill'] = color;
                  const onClick = () => {
                    setActiveIndex(index);
                    dispatch(setChoosenDayOfWeek(index));
                  };
                  e['onClick'] = onClick;
                  return <Text {...e}>{value}</Text>;
                }}
              />
              <YAxis
                orientation={'right'}
                axisLine={false}
                width={100}
                tickLine={false}
                tickSize={0}
                tickFormatter={(value) => {
                  const m = value % 60;
                  const h = Math.floor(value / 60);
                  const hoursStr = h > 0 ? `${h} ч` : '';
                  return `${hoursStr} ${m} мин`;
                }}
                tick={{ fontSize: 12, fill: '#333333', fontWeight: 400 }}
                tickMargin={32}
                ticks={getYTicks(data)}
              />

              <CartesianGrid vertical={false} />

              <Bar
                onClick={(date, index) => {
                  setActiveIndex(index);
                  dispatch(setChoosenDayOfWeek(index));
                }}
                dataKey="time"
                minPointSize={5}
              >
                {data.map((entry, index) => {
                  let color = index === activeIndex ? '#DC3E22' : '#EA8A79';
                  if (entry.time === 0) {
                    color = '#C4C4C4';
                  }
                  return (
                    <Cell cursor="pointer" fill={color} key={`cell-${index}`} />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={styles.counterTomato}>
          {dataRedux.countTomato === 0 && (
            <div className={styles.plugCounter}>
              <img src={imgTomato} alt="Tomato" />
            </div>
          )}

          <div className={styles.imgCounterTomato}>
            <Icon name={EIcons.tomato} widthSize={81} heightSize={81} />
            <TextComponent
              children={`x ${dataRedux.countTomato}`}
              size={24}
              color={EColor.gray99}
              addClass={styles.imgCounter}
            />
          </div>

          <div className={styles.discribeCounter}>
            <TextComponent
              children={getCountTomato(dataRedux.countTomato)}
              size={24}
              color={EColor.white}
            />
          </div>
        </div>
      </div>
      <div className={classNameContainerCard}>
        <div className={classNames(styles.infoCard, styles.infoCardFocus)}>
          <TextComponent
            size={24}
            children={'Фокус'}
            addClass={styles.cardTitle}
          />
          <TextComponent
            size={64}
            children={`${
              dataRedux.timeActiveTimer < 60
                ? '0'
                : `${Math.round(
                    (dataRedux.timeActiveTimer /
                      (dataRedux.timeActiveTimer + dataRedux.pauseTime)) *
                      100
                  )}`
            }%`}
            addClass={styles.cardData}
          />
          <Icon
            name={EIcons.focusCard}
            widthSize={108}
            heightSize={108}
            addClass={styles.cardIcon}
          />
        </div>
        <div className={classNames(styles.infoCard, styles.infoCardPause)}>
          <TextComponent
            size={24}
            children={'Время на паузе'}
            addClass={styles.cardTitle}
          />
          <TextComponent
            size={64}
            children={
              dataRedux.pauseTime < 60
                ? '0M'
                : `${getPauseTime(dataRedux.pauseTime)}`
            }
            addClass={styles.cardData}
          />
          <Icon
            name={EIcons.pauseCard}
            widthSize={108}
            heightSize={108}
            addClass={styles.cardIcon}
          />
        </div>
        <div className={classNames(styles.infoCard, styles.infoCardStops)}>
          <TextComponent
            size={24}
            children={'Остановки'}
            addClass={styles.cardTitle}
          />
          <TextComponent
            size={64}
            children={`${dataRedux.countStops}`}
            addClass={styles.cardData}
          />
          <Icon
            name={EIcons.pauseCard}
            widthSize={108}
            heightSize={108}
            addClass={styles.cardIcon}
          />
        </div>
      </div>
    </div>
  );
}
