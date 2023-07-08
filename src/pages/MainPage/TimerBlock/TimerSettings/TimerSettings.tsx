import { animated, useSpring } from "react-spring";
import styles from "./TimerSettings.module.css";
import inputStyles from "./TimeInput/TimeInput.module.css";
import { useEffect, useState } from "react";
import { TimeInput } from "./TimeInput";
import {
  updateTodoCountBreak,
  updateCurrentTimeForTomato,
  updateSetTimeForBigBreak,
  updateSetTimeForBreak,
  updateTimeForTomato,
} from "../../../../store/todoSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { secondsInHour, secondsInMinute } from "../../../../utils/timeUtils";
import { TextColor, TextComponent } from "../../../../components/TextComponent";
import { changeNotifications } from "../../../../store/globalSettingsSlice";
import { updateCountBreak } from "../../../../store/timerBlockSlice";

interface TimerSettingsProps {
  onClose: () => void;
}

export function TimerSettings({ onClose }: TimerSettingsProps) {
  const dispatch = useAppDispatch();

  const timerInfo = useAppSelector((state) => state.timerBlock);

  const [isSettingsWillClose, setIsSettingsWillClose] = useState(false);

  useEffect(() => {
    console.log(timerInfo.countBreak);
  }, [timerInfo.countBreak]);

  const animatedProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 400 },
    reverse: isSettingsWillClose,
    onRest: () => {
      if (isSettingsWillClose) {
        onClose();
      }
    },
  });
  return (
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

      <TimeInput
        labelText={"Продолжительность помидора:"}
        time={timerInfo.setTime}
        onAddMinute={() => {
          dispatch(
            updateTimeForTomato({
              id: timerInfo.todoID,
              time: timerInfo.setTime + secondsInMinute,
            })
          );
          if (!timerInfo.isTimerOnPause && !timerInfo.isTimerBreakOnPause) {
            dispatch(updateCurrentTimeForTomato(timerInfo.todoID));
          }
        }}
        onReduceMinute={() => {
          dispatch(
            updateTimeForTomato({
              id: timerInfo.todoID,
              time: timerInfo.setTime - secondsInMinute,
            })
          );
          if (!timerInfo.isTimerOnPause && !timerInfo.isTimerBreakOnPause) {
            dispatch(updateCurrentTimeForTomato(timerInfo.todoID));
          }
        }}
        onAddHour={() => {
          dispatch(
            updateTimeForTomato({
              id: timerInfo.todoID,
              time: timerInfo.setTime + secondsInHour,
            })
          );
          if (!timerInfo.isTimerOnPause && !timerInfo.isTimerBreakOnPause) {
            dispatch(updateCurrentTimeForTomato(timerInfo.todoID));
          }
        }}
        onReduceHour={() => {
          dispatch(
            updateTimeForTomato({
              id: timerInfo.todoID,
              time: timerInfo.setTime - secondsInHour,
            })
          );
          if (!timerInfo.isTimerOnPause && !timerInfo.isTimerBreakOnPause) {
            dispatch(updateCurrentTimeForTomato(timerInfo.todoID));
          }
        }}
      />

      <TimeInput
        labelText={"Продолжительность короткого перерыва:"}
        time={timerInfo.setBreak}
        onAddMinute={() => {
          dispatch(
            updateSetTimeForBreak({
              id: timerInfo.todoID,
              time: timerInfo.setBreak + secondsInMinute,
            })
          );
        }}
        onReduceMinute={() => {
          dispatch(
            updateSetTimeForBreak({
              id: timerInfo.todoID,
              time: timerInfo.setBreak - secondsInMinute,
            })
          );
        }}
        onAddHour={() => {
          dispatch(
            updateSetTimeForBreak({
              id: timerInfo.todoID,
              time: timerInfo.setBreak + secondsInHour,
            })
          );
        }}
        onReduceHour={() => {
          dispatch(
            updateSetTimeForBreak({
              id: timerInfo.todoID,
              time: timerInfo.setBreak - secondsInHour,
            })
          );
        }}
      />

      <TimeInput
        labelText={"Продолжительность длинного перерыва:"}
        time={timerInfo.setBigBreak}
        onAddHour={() => {
          dispatch(
            updateSetTimeForBigBreak({
              id: timerInfo.todoID,
              time: timerInfo.setBigBreak + secondsInHour,
            })
          );
        }}
        onReduceHour={() => {
          dispatch(
            updateSetTimeForBigBreak({
              id: timerInfo.todoID,
              time: timerInfo.setBigBreak - secondsInHour,
            })
          );
        }}
        onAddMinute={() => {
          dispatch(
            updateSetTimeForBigBreak({
              id: timerInfo.todoID,
              time: timerInfo.setBigBreak + secondsInMinute,
            })
          );
        }}
        onReduceMinute={() => {
          dispatch(
            updateSetTimeForBigBreak({
              id: timerInfo.todoID,
              time: timerInfo.setBigBreak - secondsInMinute,
            })
          );
        }}
      />

      <div className={inputStyles.label}>
        <TextComponent
          size={24}
          children={"Частота длинных перерывов:"}
          color={TextColor.white}
          addClass={inputStyles.labelText}
        />

        <div className={inputStyles.containerTime}>
          <button
            className={inputStyles.btnChangeTime}
            onClick={() => {
              dispatch(
                updateTodoCountBreak({
                  id: timerInfo.todoID,
                  count: timerInfo.countBreak + 1,
                })
              );
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
            className={inputStyles.input}
            value={timerInfo.countBreak}
            type="number"
          />
          <button
            className={inputStyles.btnChangeTime}
            onClick={() => {
              if (timerInfo.countBreak > 1) {
                dispatch(
                  updateTodoCountBreak({
                    id: timerInfo.todoID,
                    count: timerInfo.countBreak - 1,
                  })
                );
                dispatch(
                  updateCountBreak({
                    id: timerInfo.todoID,
                    count: timerInfo.countBreak - 1,
                  })
                );
              }
            }}
          >
            -
          </button>
        </div>
      </div>

      <div className={inputStyles.label}>
        <TextComponent
          size={24}
          children={"Уведомления:"}
          color={TextColor.white}
          addClass={inputStyles.labelText}
        />

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            defaultChecked={timerInfo.isNotificationsActive}
            onChange={() => dispatch(changeNotifications())}
          ></input>
          <span className={styles.checkboxSwitch} />
        </label>
      </div>
    </animated.div>
  );
}
