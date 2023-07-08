import { useState } from "react";
import { Icon, IconsType } from "../../../components/Icons";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import styles from "./TimerBlock.module.css";
import { TimerHeader } from "./TimerHeader";
import { TimerSettings } from "./TimerSettings";
import { TimerDisplay } from "./TimerDisplay";
import classNames from "classnames";
import { formatTime } from "../../../utils/timeUtils";
import {
  addMinuteForBreak,
  addMinuteForTask,
  decreaseTimerBreak,
  decreaseTimerTask,
  resetTimer,
  setActiveTask,
  setCurrentTimeBreak,
  setTimerBreak,
} from "../../../store/todoSlice";
import { TextColor, TextComponent } from "../../../components/TextComponent";
import { Button, ButtonType } from "../../../components/Button";
import {
  setIsTaskBreakActive,
  setIsTimerActive,
  setIsTimerBreakActive,
  setIsTimerBreakOnPause,
  setIsTimerOnPause,
  setIsTimerTaskActive,
  setTimerId,
  stopTimer,
} from "../../../store/timerBlockSlice";
import {
  incrementStopsCounter,
  incrementTimeActiveTimer,
  incrementTimePauseTimer,
} from "../../../store/staticSlice";

export function TimerBlock() {
  const dispatch = useAppDispatch();

  const timerInfo = useAppSelector((state) => state.timerBlock);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const onClickAddMinute = () => {
    if (!timerInfo.isTaskBreakActive) {
      dispatch(addMinuteForTask(timerInfo.todoID));
    } else {
      dispatch(addMinuteForBreak(timerInfo.todoID));
    }
  };
  const onClickStart = () => {
    clearInterval(timerInfo.timerId);
    dispatch(setIsTimerActive(true));
    dispatch(setIsTimerTaskActive(true));
    dispatch(setIsTimerOnPause(false));
    dispatch(setActiveTask(true));
    dispatch(
      setTimerId(
        setInterval(() => {
          dispatch(decreaseTimerTask(timerInfo.todoID));
          dispatch(incrementTimeActiveTimer());
        }, 1000)
      )
    );
  };
  const onClickPause = () => {
    clearInterval(timerInfo.timerId);
    dispatch(setIsTimerActive(false));
    dispatch(setIsTimerOnPause(true));
    dispatch(
      setTimerId(
        setInterval(() => {
          dispatch(incrementTimePauseTimer());
        }, 1000)
      )
    );
  };
  const onClickReset = () => {
    clearInterval(timerInfo.timerId);
    dispatch(setIsTimerActive(false));
    dispatch(setIsTimerOnPause(false));
    dispatch(setIsTimerTaskActive(false));
    dispatch(resetTimer(timerInfo.todoID));
    dispatch(setActiveTask(false));
    dispatch(incrementStopsCounter());
  };
  const onClickDone = () => {
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
  const onClickBreakPause = () => {
    clearInterval(timerInfo.timerId);
    dispatch(setIsTimerBreakActive(false));
    dispatch(setIsTimerBreakOnPause(true));
  };
  const onClickBreakContinue = () => {
    dispatch(setIsTimerBreakOnPause(false));
    dispatch(setIsTimerBreakActive(true));
    dispatch(setActiveTask(true));
    dispatch(
      setTimerId(
        setInterval(() => {
          dispatch(decreaseTimerBreak(timerInfo.todoID));
        }, 1000)
      )
    );
  };
  const onClickBreakSkip = () => {
    dispatch(stopTimer());
    dispatch(setIsTimerBreakOnPause(false));
    dispatch(setIsTimerBreakActive(false));
    dispatch(setIsTaskBreakActive(false));
    dispatch(setCurrentTimeBreak({ id: timerInfo.todoID, time: 0 }));
  };

  return (
    <div className={styles.container}>
      <TimerHeader />

      {!isSettingsOpen && (
        <div className={styles.content}>
          <button
            className={styles.settingsBtn}
            onClick={() => {
              setIsSettingsOpen(true);
            }}
            disabled={
              timerInfo.numberTask &&
              !timerInfo.isTimerActive &&
              !timerInfo.isTimerBreakActive
                ? false
                : true
            }
          >
            <Icon name={IconsType.settings} width={50} height={50} />
          </button>
          <div className={styles.timerContainer}>
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
              onClick={onClickAddMinute}
            >
              <Icon name={IconsType.plus} width={50} height={50} />
            </button>
          </div>
          <div className={styles.describeBlock}>
            <TextComponent
              size={16}
              children={
                Boolean(timerInfo.numberTask)
                  ? `Задача ${timerInfo.numberTask} - `
                  : ""
              }
              color={TextColor.gray99}
            />
            <TextComponent
              size={16}
              children={
                Boolean(timerInfo.numberTask) ? `${timerInfo.name}` : ""
              }
              color={TextColor.black}
            />
          </div>
          <div className={styles.btnContainer}>
            {!timerInfo.isTimerActive &&
              !timerInfo.isTimerOnPause &&
              !timerInfo.isTimerBreakActive &&
              !timerInfo.isTimerBreakOnPause && (
                <Button
                  type={ButtonType.green}
                  children={
                    <TextComponent
                      size={16}
                      color={TextColor.white}
                      children={"Старт"}
                    />
                  }
                  addClass={styles.startBtn}
                  onClick={onClickStart}
                  disabled={!Boolean(timerInfo.numberTask)}
                />
              )}
            {timerInfo.isTimerActive &&
              !timerInfo.isTimerOnPause &&
              !timerInfo.isTimerBreakActive && (
                <Button
                  type={ButtonType.green}
                  children={
                    <TextComponent
                      size={16}
                      color={TextColor.white}
                      children={"Пауза"}
                    />
                  }
                  addClass={styles.startBtn}
                  onClick={onClickPause}
                />
              )}
            {!timerInfo.isTimerOnPause &&
              !timerInfo.isTimerBreakActive &&
              !timerInfo.isTimerBreakOnPause && (
                <Button
                  type={ButtonType.redBorder}
                  children={
                    <TextComponent
                      size={16}
                      color={TextColor.red}
                      children={"Стоп"}
                    />
                  }
                  addClass={styles.stopBtn}
                  disabled={!timerInfo.isTimerActive}
                  onClick={onClickReset}
                />
              )}

            {!timerInfo.isTimerActive &&
              !timerInfo.isTimerOnPause &&
              timerInfo.isTimerBreakActive && (
                <Button
                  type={ButtonType.green}
                  children={
                    <TextComponent
                      size={16}
                      color={TextColor.white}
                      children={"Пауза"}
                    />
                  }
                  addClass={styles.startBtn}
                  onClick={onClickBreakPause}
                />
              )}
            {!timerInfo.isTimerActive &&
              !timerInfo.isTimerOnPause &&
              timerInfo.isTimerBreakActive && (
                <Button
                  type={ButtonType.redBorder}
                  children={
                    <TextComponent
                      size={16}
                      color={TextColor.red}
                      children={"Пропустить"}
                    />
                  }
                  addClass={styles.stopBtn}
                  onClick={onClickBreakSkip}
                />
              )}
            {!timerInfo.isTimerActive &&
              !timerInfo.isTimerOnPause &&
              !timerInfo.isTimerBreakActive &&
              timerInfo.isTimerBreakOnPause && (
                <Button
                  type={ButtonType.green}
                  children={
                    <TextComponent
                      size={16}
                      color={TextColor.white}
                      children={"Продолжить"}
                    />
                  }
                  addClass={styles.startBtn}
                  onClick={onClickBreakContinue}
                />
              )}
            {!timerInfo.isTimerActive &&
              !timerInfo.isTimerOnPause &&
              !timerInfo.isTimerBreakActive &&
              timerInfo.isTimerBreakOnPause && (
                <Button
                  type={ButtonType.red}
                  children={
                    <TextComponent
                      size={16}
                      color={TextColor.white}
                      children={"Пропустить"}
                    />
                  }
                  addClass={styles.stopBtn}
                  onClick={onClickBreakSkip}
                />
              )}

            {!timerInfo.isTimerActive &&
              timerInfo.isTimerOnPause &&
              !timerInfo.isTimerBreakActive && (
                <Button
                  type={ButtonType.green}
                  children={
                    <TextComponent
                      size={16}
                      color={TextColor.white}
                      children={"Продолжить"}
                    />
                  }
                  addClass={styles.startBtn}
                  onClick={onClickStart}
                />
              )}
            {!timerInfo.isTimerActive &&
              timerInfo.isTimerOnPause &&
              !timerInfo.isTimerBreakActive && (
                <Button
                  type={ButtonType.red}
                  children={
                    <TextComponent
                      size={16}
                      color={TextColor.white}
                      children={"Сделано"}
                    />
                  }
                  addClass={styles.stopBtn}
                  onClick={onClickDone}
                />
              )}
          </div>
        </div>
      )}
      {isSettingsOpen && (
        <TimerSettings onClose={() => setIsSettingsOpen(false)} />
      )}
    </div>
  );
}
