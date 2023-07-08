import classNames from "classnames";
import styles from "./TimerHeader.module.css";
import { useAppSelector } from "../../../../store/store";
import { TextColor, TextComponent } from "../../../../components/TextComponent";

export function TimerHeader() {
  const isTaskActive = useAppSelector((state) => state.timerBlock.isTaskActive);
  const isTaskBreakActive = useAppSelector(
    (state) => state.timerBlock.isTaskBreakActive
  );
  const name = useAppSelector((state) => state.timerBlock.name);
  const numberTask = useAppSelector((state) => state.timerBlock.numberTask);
  const numberBreak = useAppSelector((state) => state.timerBlock.numberBreak);
  const numberTomato = useAppSelector((state) => state.timerBlock.numberTomato);
  return (
    <div
      className={
        isTaskActive
          ? classNames(styles.header, styles.headerActive)
          : isTaskBreakActive
          ? classNames(styles.header, styles.headerBreakActive)
          : styles.header
      }
    >
      <TextComponent
        size={16}
        children={name}
        As={"div"}
        color={TextColor.white}
        addClass={styles.taskName}
      />
      <TextComponent
        size={16}
        children={
          numberTask === 0
            ? ""
            : isTaskBreakActive
            ? `Перерыв ${numberBreak}`
            : `Помидор ${numberTomato}`
        }
        As={"div"}
        color={TextColor.white}
        addClass={styles.count}
      />
    </div>
  );
}
