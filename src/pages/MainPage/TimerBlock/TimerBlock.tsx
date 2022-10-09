import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  incrimentStopsCounter,
  incrimentTimeActiveTimer,
  incrimentTimePauseTimer,
} from '../../../store/static/staticSlice';
import { animated, useSpring } from 'react-spring';
import {
  addMinuteForBreak,
  addMinuteForTask,
  decreaseTimerBreak,
  decreaseTimerTask,
  resetTimer,
  setActiveTask,
  setCurrentTimeBreak,
  setTimerBreak,
  updateCountBreak,
  updateCurrentTimeForTomato,
  updateSetTimeForBigBreak,
  updateSetTimeForBreak,
  updateSetTimeForTomato,
} from '../../../store/todo/todoSlice';
import { ActionBtn, EBtnType } from '../../../components/common/Btn';
import { EIcons, Icon } from '../../../components/common/Icon';
import {
  EColor,
  TextComponent,
} from '../../../components/common/TextComponent';
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
import { useState } from 'react';
import { changeNotifications } from '../../../store/app/appSlice';
import { TimerHeader } from './TimerHeader';

export function TimerBlock() {
  const timerInfo = useAppSelector((state) => state.timerBlock);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSettingsNeedAnimation, setIsSettingsNeedAnimation] = useState(false);
  const [isSettingsWillClose, setIsSettingsWillClose] = useState(false);

  const animatedProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 400 },
    reset: isSettingsNeedAnimation,
    reverse: isSettingsWillClose,
    onRest: () => {
      if (isSettingsWillClose) {
        setIsSettingsOpen(false);
        setIsSettingsWillClose(false);
      }
      if (isSettingsNeedAnimation) {
        setIsSettingsNeedAnimation(false);
      }
    },
  });

  const dispatch = useAppDispatch();

  function formatTime(time: number) {
    const min =
      Math.floor(time / 60) > 9
        ? `${Math.floor(time / 60)}`
        : `0${Math.floor(time / 60)}`;
    const s = time % 60 > 9 ? `${time % 60}` : `0${time % 60}`;
    return `${min}:${s}`;
  }
  function getHours(time: number) {
    time = Math.floor(time / 60 / 60);
    return time % 60;
  }
  function getMinutes(time: number) {
    time = Math.floor(time / 60);
    return time % 60;
  }

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
    dispatch(setActiveTask(true));
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
      <TimerHeader />

      <div className={styles.content}>
        <button
          className={styles.settingsBtn}
          onClick={() => {
            setIsSettingsOpen(true);
            setIsSettingsNeedAnimation(true);
          }}
          disabled={
            timerInfo.numberTask &&
            !timerInfo.isTimerActive &&
            !timerInfo.isTimerBreakActive
              ? false
              : true
          }
        >
          <Icon name={EIcons.settings} widthSize={50} heightSize={50} />
        </button>
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
      {isSettingsOpen && (
        <animated.div style={animatedProps} className={styles.settingsWindow}>
          <button
            className={styles.btnCloseSettingWindow}
            onClick={() => {
              setIsSettingsWillClose(true);
            }}
          >
            <div className={styles.btnCloseCross}></div>
            <div className={styles.btnCloseCross}></div>
          </button>
          <div className={styles.label}>
            <TextComponent
              size={24}
              children={'Продолжительность помидора: '}
              color={EColor.white}
              addClass={styles.labelText}
            />

            <div className={styles.containerTime}>
              <button
                className={styles.btnChangeTime}
                onClick={() => {
                  dispatch(
                    updateSetTimeForTomato({
                      id: timerInfo.todoID,
                      time: timerInfo.setTime + 3600,
                    })
                  );
                  if (
                    !timerInfo.isTimerOnPause &&
                    !timerInfo.isTimerBreakOnPause
                  ) {
                    dispatch(updateCurrentTimeForTomato(timerInfo.todoID));
                  }
                }}
              >
                +
              </button>
              <input
                className={styles.input}
                value={getHours(timerInfo.setTime)}
                type="number"
                disabled={true}
              />
              <button
                className={styles.btnChangeTime}
                disabled={getHours(timerInfo.setTime) === 0 ? true : false}
                onClick={() => {
                  dispatch(
                    updateSetTimeForTomato({
                      id: timerInfo.todoID,
                      time: timerInfo.setTime - 3600,
                    })
                  );
                  if (
                    !timerInfo.isTimerOnPause &&
                    !timerInfo.isTimerBreakOnPause
                  ) {
                    dispatch(updateCurrentTimeForTomato(timerInfo.todoID));
                  }
                }}
              >
                -
              </button>
            </div>
            <TextComponent size={16} children={':'} color={EColor.white} />
            <div className={styles.containerTime}>
              <button
                className={styles.btnChangeTime}
                disabled={getMinutes(timerInfo.setTime) === 59 ? true : false}
                onClick={() => {
                  dispatch(
                    updateSetTimeForTomato({
                      id: timerInfo.todoID,
                      time: timerInfo.setTime + 60,
                    })
                  );
                  if (
                    !timerInfo.isTimerOnPause &&
                    !timerInfo.isTimerBreakOnPause
                  ) {
                    dispatch(updateCurrentTimeForTomato(timerInfo.todoID));
                  }
                }}
              >
                +
              </button>
              <input
                className={styles.input}
                value={getMinutes(timerInfo.setTime)}
                type="number"
                disabled={true}
              />
              <button
                disabled={getMinutes(timerInfo.setTime) <= 1}
                className={styles.btnChangeTime}
                onClick={() => {
                  dispatch(
                    updateSetTimeForTomato({
                      id: timerInfo.todoID,
                      time: timerInfo.setTime - 60,
                    })
                  );
                  if (
                    !timerInfo.isTimerOnPause &&
                    !timerInfo.isTimerBreakOnPause
                  ) {
                    dispatch(updateCurrentTimeForTomato(timerInfo.todoID));
                  }
                }}
              >
                -
              </button>
            </div>
          </div>
          <div className={styles.label}>
            <TextComponent
              size={24}
              children={'Продолжительность короткого перерыва:'}
              color={EColor.white}
              addClass={styles.labelText}
            />

            <div className={styles.containerTime}>
              <button
                className={styles.btnChangeTime}
                onClick={() => {
                  dispatch(
                    updateSetTimeForBreak({
                      id: timerInfo.todoID,
                      time: timerInfo.setBreak + 3600,
                    })
                  );
                }}
              >
                +
              </button>
              <input
                disabled={true}
                value={getHours(timerInfo.setBreak)}
                className={styles.input}
                type="number"
              />
              <button
                disabled={getHours(timerInfo.setBreak) === 0 ? true : false}
                className={styles.btnChangeTime}
                onClick={() => {
                  dispatch(
                    updateSetTimeForBreak({
                      id: timerInfo.todoID,
                      time: timerInfo.setBreak - 3600,
                    })
                  );
                }}
              >
                -
              </button>
            </div>
            <TextComponent size={16} children={':'} color={EColor.white} />
            <div className={styles.containerTime}>
              <button
                className={styles.btnChangeTime}
                disabled={getMinutes(timerInfo.setBreak) === 59 ? true : false}
                onClick={() => {
                  dispatch(
                    updateSetTimeForBreak({
                      id: timerInfo.todoID,
                      time: timerInfo.setBreak + 60,
                    })
                  );
                }}
              >
                +
              </button>
              <input
                disabled={true}
                className={styles.input}
                value={getMinutes(timerInfo.setBreak)}
                type="number"
              />
              <button
                className={styles.btnChangeTime}
                onClick={() => {
                  dispatch(
                    updateSetTimeForBreak({
                      id: timerInfo.todoID,
                      time: timerInfo.setBreak - 60,
                    })
                  );
                }}
                disabled={getMinutes(timerInfo.setBreak) === 0 ? true : false}
              >
                -
              </button>
            </div>
          </div>
          <div className={styles.label}>
            <TextComponent
              size={24}
              children={'Продолжительность длинного перерыва:'}
              color={EColor.white}
              addClass={styles.labelText}
            />

            <div className={styles.containerTime}>
              <button
                className={styles.btnChangeTime}
                onClick={() => {
                  dispatch(
                    updateSetTimeForBigBreak({
                      id: timerInfo.todoID,
                      time: timerInfo.setBigBreak + 3600,
                    })
                  );
                }}
              >
                +
              </button>
              <input
                disabled={true}
                value={getHours(timerInfo.setBigBreak)}
                className={styles.input}
                type="number"
              />
              <button
                className={styles.btnChangeTime}
                disabled={getHours(timerInfo.setBigBreak) === 0 ? true : false}
                onClick={() => {
                  dispatch(
                    updateSetTimeForBigBreak({
                      id: timerInfo.todoID,
                      time: timerInfo.setBigBreak - 3600,
                    })
                  );
                }}
              >
                -
              </button>
            </div>
            <TextComponent size={16} children={':'} color={EColor.white} />
            <div className={styles.containerTime}>
              <button
                disabled={
                  getMinutes(timerInfo.setBigBreak) === 59 ? true : false
                }
                className={styles.btnChangeTime}
                onClick={() => {
                  dispatch(
                    updateSetTimeForBigBreak({
                      id: timerInfo.todoID,
                      time: timerInfo.setBigBreak + 60,
                    })
                  );
                }}
              >
                +
              </button>
              <input
                disabled={true}
                className={styles.input}
                value={getMinutes(timerInfo.setBigBreak)}
                type="number"
              />
              <button
                className={styles.btnChangeTime}
                onClick={() => {
                  dispatch(
                    updateSetTimeForBigBreak({
                      id: timerInfo.todoID,
                      time: timerInfo.setBigBreak - 60,
                    })
                  );
                }}
                disabled={
                  getMinutes(timerInfo.setBigBreak) === 0 ? true : false
                }
              >
                -
              </button>
            </div>
          </div>
          <div className={styles.label}>
            <TextComponent
              size={24}
              children={'Частота длинных перерывов:'}
              color={EColor.white}
              addClass={styles.labelText}
            />

            <div className={styles.containerTime}>
              <button
                className={styles.btnChangeTime}
                onClick={() => {
                  dispatch(
                    updateCountBreak({
                      id: timerInfo.todoID,
                      count: timerInfo.countBreak + 1,
                    })
                  );
                }}
              >
                +
              </button>
              <input
                disabled={true}
                className={styles.input}
                value={timerInfo.countBreak}
                type="number"
              />
              <button
                className={styles.btnChangeTime}
                onClick={() => {
                  dispatch(
                    updateCountBreak({
                      id: timerInfo.todoID,
                      count: timerInfo.countBreak - 1,
                    })
                  );
                }}
              >
                -
              </button>
            </div>
          </div>
          <div className={styles.label}>
            <TextComponent
              size={24}
              children={'Уведомления:'}
              color={EColor.white}
              addClass={styles.labelText}
            />

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                defaultChecked={timerInfo.isNotoficationsActive}
                onChange={() => dispatch(changeNotifications())}
              ></input>
              <span className={styles.checkboxSwitch}></span>
            </label>
          </div>
        </animated.div>
      )}
    </div>
  );
}
