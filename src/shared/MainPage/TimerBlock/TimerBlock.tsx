import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  incrimentStopsCounter,
  incrimentTimeActiveTimer,
  incrimentTimePauseTimer,
  incrimentTomatoCounter,
} from '../../../store/static/staticSlice';
import {
  setIsTimerActive,
  setTimerId,
  setIsTimerTaskActive,
  setIsTimerOnPause,
  setIsTimerBreakActive,
  setIsTaskBreakActive,
  setIsTimerBreakOnPause,
} from '../../../store/timerBlock/timerBlockSlice';
import {
  addMinute,
  decreaseTimer,
  doneTodo,
  resetTimer,
  setTimerBreak,
} from '../../../store/todo/todoSlice';
import { ActionBtn, EBtnType } from '../../utils-components/ActionBtn';
import { EIcons, Icon } from '../../utils-components/Icon';
import { EColor, TextComponent } from '../../utils-components/TextComponent';
import { formatTime } from '../../utils/formatTime';
import styles from './timerblock.module.css';
import { TimerDisplay } from './TimerDisplay';

export function TimerBlock() {
  const timerId = useAppSelector((state) => state.timerBlock.timerId);
  const isTimerActive = useAppSelector(
    (state) => state.timerBlock.isTimerActive
  );
  const isTaskActive = useAppSelector((state) => state.timerBlock.isTaskActive);
  const isTimerOnPause = useAppSelector(
    (state) => state.timerBlock.isTimerOnPause
  );
  const isTimerBreakActive = useAppSelector(
    (state) => state.timerBlock.isTimerBreakActive
  );
  const isTaskBreakActive = useAppSelector(
    (state) => state.timerBlock.isTaskBreakActive
  );
  const isTimerBreakOnPause = useAppSelector(
    (state) => state.timerBlock.isTimerBreakOnPause
  );

  const todo = useAppSelector((state) => state.todos.list[0]);
  const dispatch = useAppDispatch();

  let classesHeader;
  let classesTimer;
  if (isTimerActive) {
    classesTimer = classNames(styles.timerDisplay, styles.timerDisplayActive);
  } else if (isTimerBreakActive) {
    classesTimer = classNames(
      styles.timerDisplay,
      styles.timerBreakDisplayActive
    );
  } else {
    classesTimer = classNames(styles.timerDisplay);
  }
  if (isTaskActive) {
    classesHeader = classNames(styles.header, styles.headerActive);
  } else if (isTaskBreakActive) {
    classesHeader = classNames(styles.header, styles.headerBreakActive);
  } else {
    classesHeader = classNames(styles.header);
  }

  let taskName = '';
  let tomatoCount = '';
  let currentTime = '00:00';
  let discribeTask = '';
  if (todo) {
    taskName = todo.text;
    if (!isTaskBreakActive) {
      tomatoCount = `Помидор ${todo.currentTomato}`;
    }
    if (isTaskBreakActive) {
      tomatoCount = `Перерыв ${todo.countBreak}`;
    }
    currentTime = formatTime(todo.currentTimer);
    discribeTask = 'Задача 1 - ';
  }
  useEffect(() => {
    if (todo) {
      if (todo.currentTimer === 0 && !isTaskBreakActive) {
        clearInterval(timerId);
        dispatch(setIsTimerActive(false));
        dispatch(setIsTimerTaskActive(false));
        dispatch(setIsTimerOnPause(false));
        dispatch(setIsTimerBreakActive(true));
        dispatch(setIsTaskBreakActive(true));

        dispatch(setTimerBreak(todo.id));
        dispatch(
          setTimerId(
            setInterval(() => {
              dispatch(decreaseTimer(todo.id));
            }, 1000)
          )
        );
      }
      if (todo.currentTimer === 0 && isTaskBreakActive) {
        clearInterval(timerId);
        dispatch(setIsTimerActive(false));
        dispatch(setIsTimerTaskActive(false));
        dispatch(setIsTimerOnPause(false));
        dispatch(setIsTimerBreakActive(false));
        dispatch(setIsTaskBreakActive(false));
        dispatch(doneTodo(todo.id));
        dispatch(incrimentTomatoCounter());
      }
    }
  }, [todo, timerId]);
  const handlClickAddMinute = () => {
    dispatch(addMinute(todo.id));
  };
  const handlClickStart = () => {
    clearInterval(timerId);
    dispatch(setIsTimerTaskActive(true));
    dispatch(setIsTimerActive(true));
    dispatch(setIsTimerOnPause(false));
    dispatch(
      setTimerId(
        setInterval(() => {
          dispatch(decreaseTimer(todo.id));
          dispatch(incrimentTimeActiveTimer());
        }, 1000)
      )
    );
  };
  const handlClickPause = () => {
    clearInterval(timerId);

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
    clearInterval(timerId);
    dispatch(setIsTimerActive(false));
    dispatch(setIsTimerOnPause(false));
    dispatch(setIsTimerTaskActive(false));
    dispatch(resetTimer(todo.id));
    dispatch(incrimentStopsCounter());
  };
  const handlClickDone = () => {
    clearInterval(timerId);
    dispatch(setIsTimerActive(false));
    dispatch(setIsTimerOnPause(false));
    dispatch(setIsTimerTaskActive(false));
    dispatch(setTimerBreak(todo.id));
    dispatch(setIsTimerBreakActive(true));
    dispatch(setIsTaskBreakActive(true));
    dispatch(
      setTimerId(
        setInterval(() => {
          dispatch(decreaseTimer(todo.id));
        }, 1000)
      )
    );
  };
  const handlClickBreakPause = () => {
    dispatch(setIsTimerBreakActive(false));
    dispatch(setIsTimerBreakOnPause(true));

    clearInterval(timerId);
  };
  const handlClickBreakContinue = () => {
    dispatch(setIsTimerBreakOnPause(false));

    dispatch(setIsTimerBreakActive(true));
    dispatch(
      setTimerId(
        setInterval(() => {
          dispatch(decreaseTimer(todo.id));
          dispatch(incrimentTimeActiveTimer());
        }, 1000)
      )
    );
  };
  const handlClickBreakSkip = () => {
    dispatch(setIsTimerBreakOnPause(false));
    dispatch(setIsTimerBreakActive(false));
    dispatch(setIsTaskBreakActive(false));
    clearInterval(timerId);
    dispatch(doneTodo(todo.id));
    dispatch(incrimentTomatoCounter());
  };
  return (
    <div className={styles.container}>
      <div className={classesHeader}>
        <TextComponent
          size={16}
          children={taskName}
          As={'div'}
          color={EColor.white}
          addClass={styles.taskName}
        />
        <TextComponent
          size={16}
          children={tomatoCount}
          As={'div'}
          color={EColor.white}
          addClass={styles.count}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.timerConteiner}>
          <TimerDisplay addClass={classesTimer} currentTime={currentTime} />
          <button
            className={styles.addBtn}
            disabled={!Boolean(todo)}
            onClick={handlClickAddMinute}
          >
            <Icon name={EIcons.plus} widthSize={50} heightSize={50} />
          </button>
        </div>
        <div className={styles.discribeBlock}>
          <TextComponent
            size={16}
            children={discribeTask}
            color={EColor.gray99}
          />
          <TextComponent size={16} children={taskName} color={EColor.black} />
        </div>
        <div className={styles.btnContainer}>
          {!isTimerActive &&
            !isTimerOnPause &&
            !isTimerBreakActive &&
            !isTimerBreakOnPause && (
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
                disabled={!Boolean(todo)}
              />
            )}
          {isTimerActive && !isTimerOnPause && !isTimerBreakActive && (
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
          {!isTimerActive && !isTimerOnPause && isTimerBreakActive && (
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
          {!isTimerActive && !isTimerOnPause && isTimerBreakActive && (
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
          {!isTimerActive &&
            !isTimerOnPause &&
            !isTimerBreakActive &&
            isTimerBreakOnPause && (
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
          {!isTimerActive &&
            !isTimerOnPause &&
            !isTimerBreakActive &&
            isTimerBreakOnPause && (
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
          {!isTimerOnPause && !isTimerBreakActive && !isTimerBreakOnPause && (
            <ActionBtn
              type={EBtnType.redBorder}
              children={
                <TextComponent size={16} color={EColor.red} children={'Стоп'} />
              }
              addClass={styles.stopBtn}
              disabled={!isTimerActive}
              onClick={handlClickReset}
            />
          )}

          {!isTimerActive && isTimerOnPause && !isTimerBreakActive && (
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
          {!isTimerActive && isTimerOnPause && !isTimerBreakActive && (
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
