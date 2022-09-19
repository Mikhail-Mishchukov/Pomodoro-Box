import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  incrimentStopsCounter,
  incrimentTimeActiveTimer,
  incrimentTimePauseTimer,
} from '../../../store/static/staticSlice';

import {
  addMinuteForBreak,
  addMinuteForTask,
  decreaseTimerBreak,
  decreaseTimerTask,
  resetTimer,
  setActiveTask,
  setCurrentTimeBreak,
  setTimerBreak,
} from '../../../store/todo/todoSlice';
import { ActionBtn, EBtnType } from '../../common/ActionBtn';
import { EIcons, Icon } from '../../common/Icon';
import { EColor, TextComponent } from '../../common/TextComponent';
import { formatTime } from '../../../utils/formatTime';
import styles from './TimerBlock.module.css';
import { TimerDisplay } from './TimerDisplay';
import {
  setIsTaskBreakActive,
  setIsTimerActive,
  setIsTimerBreakActive,
  setIsTimerBreakOnPause,
  setIsTimerOnPause,
  setIsTimerTaskActive,
  setTimerId,
  stopTimer,
} from '../../../store/timerBlock/timerBlockSlice';

export function TimerBlock() {
  const timerInfo = useAppSelector((state) => state.timerBlock);

  const dispatch = useAppDispatch();

  const handlClickAddMinute = () => {
    if (!timerInfo.isTaskBreakActive) {
      dispatch(addMinuteForTask(timerInfo.todoID));
    } else {
      dispatch(addMinuteForBreak(timerInfo.todoID));
    }
  };
  const handlClickStart = () => {
    clearInterval(timerInfo.timerId);
    dispatch(setIsTimerActive(true));
    dispatch(setIsTimerTaskActive(true));
    dispatch(setIsTimerOnPause(false));
    dispatch(setActiveTask(true));
    dispatch(
      setTimerId(
        setInterval(() => {
          dispatch(decreaseTimerTask(timerInfo.todoID));
          dispatch(incrimentTimeActiveTimer());
        }, 1000)
      )
    );
  };
  const handlClickPause = () => {
    clearInterval(timerInfo.timerId);
    dispatch(setIsTimerActive(false));
    dispatch(setIsTimerOnPause(true));
    dispatch(
      setTimerId(
        setInterval(() => {
          dispatch(incrimentTimePauseTimer());
        }, 1000)
      )
    );
  };
  const handlClickReset = () => {
    clearInterval(timerInfo.timerId);
    dispatch(setIsTimerActive(false));
    dispatch(setIsTimerOnPause(false));
    dispatch(setIsTimerTaskActive(false));
    dispatch(resetTimer(timerInfo.todoID));
    dispatch(setActiveTask(false));
    dispatch(incrimentStopsCounter());
  };
  const handlClickDone = () => {
    clearInterval(timerInfo.timerId);
    dispatch(setIsTimerActive(false));
    dispatch(setIsTimerOnPause(false));
    dispatch(setIsTimerTaskActive(false));
    dispatch(setTimerBreak(timerInfo.todoID));
    dispatch(setIsTimerBreakActive(true));
    dispatch(setIsTaskBreakActive(true));

    dispatch(
      setTimerId(
        setInterval(() => {
          dispatch(decreaseTimerBreak(timerInfo.todoID));
        }, 1000)
      )
    );
  };
  const handlClickBreakPause = () => {
    clearInterval(timerInfo.timerId);
    dispatch(setIsTimerBreakActive(false));
    dispatch(setIsTimerBreakOnPause(true));
  };
  const handlClickBreakContinue = () => {
    dispatch(setIsTimerBreakOnPause(false));
    dispatch(setIsTimerBreakActive(true));
    dispatch(
      setTimerId(
        setInterval(() => {
          dispatch(decreaseTimerBreak(timerInfo.todoID));
        }, 1000)
      )
    );
  };
  const handlClickBreakSkip = () => {
    dispatch(stopTimer());
    dispatch(setIsTimerBreakOnPause(false));
    dispatch(setIsTimerBreakActive(false));
    dispatch(setIsTaskBreakActive(false));
    dispatch(setCurrentTimeBreak({ id: timerInfo.todoID, time: 0 }));
  };
  return (
    <div className={styles.container}>
      <div
        className={
          timerInfo.isTaskActive
            ? classNames(styles.header, styles.headerActive)
            : timerInfo.isTaskBreakActive
            ? classNames(styles.header, styles.headerBreakActive)
            : styles.header
        }
      >
        <TextComponent
          size={16}
          children={timerInfo.name}
          As={'div'}
          color={EColor.white}
          addClass={styles.taskName}
        />
        <TextComponent
          size={16}
          children={
            timerInfo.numberTask === 0
              ? ''
              : timerInfo.isTaskBreakActive
              ? `Перерыв ${timerInfo.numberBreak}`
              : `Помидор ${timerInfo.numberTomato}`
          }
          As={'div'}
          color={EColor.white}
          addClass={styles.count}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.timerConteiner}>
          <TimerDisplay
            addClass={
              timerInfo.isTimerActive
                ? classNames(styles.timerDisplay, styles.timerDisplayActive)
                : timerInfo.isTimerBreakActive
                ? classNames(
                    styles.timerDisplay,
                    styles.timerBreakDisplayActive
                  )
                : classNames(styles.timerDisplay)
            }
            currentTime={formatTime(timerInfo.time)}
          />
          <button
            className={styles.addBtn}
            disabled={!Boolean(timerInfo.numberTask)}
            onClick={handlClickAddMinute}
          >
            <Icon name={EIcons.plus} widthSize={50} heightSize={50} />
          </button>
        </div>
        <div className={styles.discribeBlock}>
          <TextComponent
            size={16}
            children={
              Boolean(timerInfo.numberTask)
                ? `Задача ${timerInfo.numberTask} - `
                : ''
            }
            color={EColor.gray99}
          />
          <TextComponent
            size={16}
            children={Boolean(timerInfo.numberTask) ? `${timerInfo.name}` : ''}
            color={EColor.black}
          />
        </div>
        <div className={styles.btnContainer}>
          {!timerInfo.isTimerActive &&
            !timerInfo.isTimerOnPause &&
            !timerInfo.isTimerBreakActive &&
            !timerInfo.isTimerBreakOnPause && (
              <ActionBtn
                type={EBtnType.green}
                children={
                  <TextComponent
                    size={16}
                    color={EColor.white}
                    children={'Старт'}
                  />
                }
                addClass={styles.startBtn}
                onClick={handlClickStart}
                disabled={!Boolean(timerInfo.numberTask)}
              />
            )}
          {timerInfo.isTimerActive &&
            !timerInfo.isTimerOnPause &&
            !timerInfo.isTimerBreakActive && (
              <ActionBtn
                type={EBtnType.green}
                children={
                  <TextComponent
                    size={16}
                    color={EColor.white}
                    children={'Пауза'}
                  />
                }
                addClass={styles.startBtn}
                onClick={handlClickPause}
              />
            )}
          {!timerInfo.isTimerOnPause &&
            !timerInfo.isTimerBreakActive &&
            !timerInfo.isTimerBreakOnPause && (
              <ActionBtn
                type={EBtnType.redBorder}
                children={
                  <TextComponent
                    size={16}
                    color={EColor.red}
                    children={'Стоп'}
                  />
                }
                addClass={styles.stopBtn}
                disabled={!timerInfo.isTimerActive}
                onClick={handlClickReset}
              />
            )}

          {!timerInfo.isTimerActive &&
            !timerInfo.isTimerOnPause &&
            timerInfo.isTimerBreakActive && (
              <ActionBtn
                type={EBtnType.green}
                children={
                  <TextComponent
                    size={16}
                    color={EColor.white}
                    children={'Пауза'}
                  />
                }
                addClass={styles.startBtn}
                onClick={handlClickBreakPause}
              />
            )}
          {!timerInfo.isTimerActive &&
            !timerInfo.isTimerOnPause &&
            timerInfo.isTimerBreakActive && (
              <ActionBtn
                type={EBtnType.redBorder}
                children={
                  <TextComponent
                    size={16}
                    color={EColor.red}
                    children={'Пропустить'}
                  />
                }
                addClass={styles.stopBtn}
                onClick={handlClickBreakSkip}
              />
            )}
          {!timerInfo.isTimerActive &&
            !timerInfo.isTimerOnPause &&
            !timerInfo.isTimerBreakActive &&
            timerInfo.isTimerBreakOnPause && (
              <ActionBtn
                type={EBtnType.green}
                children={
                  <TextComponent
                    size={16}
                    color={EColor.white}
                    children={'Продолжить'}
                  />
                }
                addClass={styles.startBtn}
                onClick={handlClickBreakContinue}
              />
            )}
          {!timerInfo.isTimerActive &&
            !timerInfo.isTimerOnPause &&
            !timerInfo.isTimerBreakActive &&
            timerInfo.isTimerBreakOnPause && (
              <ActionBtn
                type={EBtnType.red}
                children={
                  <TextComponent
                    size={16}
                    color={EColor.white}
                    children={'Пропустить'}
                  />
                }
                addClass={styles.stopBtn}
                onClick={handlClickBreakSkip}
              />
            )}

          {!timerInfo.isTimerActive &&
            timerInfo.isTimerOnPause &&
            !timerInfo.isTimerBreakActive && (
              <ActionBtn
                type={EBtnType.green}
                children={
                  <TextComponent
                    size={16}
                    color={EColor.white}
                    children={'Продолжить'}
                  />
                }
                addClass={styles.startBtn}
                onClick={handlClickStart}
              />
            )}
          {!timerInfo.isTimerActive &&
            timerInfo.isTimerOnPause &&
            !timerInfo.isTimerBreakActive && (
              <ActionBtn
                type={EBtnType.red}
                children={
                  <TextComponent
                    size={16}
                    color={EColor.white}
                    children={'Сделано'}
                  />
                }
                addClass={styles.stopBtn}
                onClick={handlClickDone}
              />
            )}
        </div>
      </div>
    </div>
  );
}
