import {
  TextColor,
  TextComponent,
} from "../../../../../components/TextComponent";
import { getHours, getMinutes } from "../../../../../utils/timeUtils";
import styles from "./TimeInput.module.css";

interface TimeInputProps {
  labelText: string;
  onAddHour: () => void;
  onReduceHour: () => void;
  onAddMinute: () => void;
  onReduceMinute: () => void;
  time: number;
}

export function TimeInput({
  labelText,
  onAddHour,
  onReduceHour,
  onAddMinute,
  onReduceMinute,
  time,
}: TimeInputProps) {
  return (
    <div className={styles.label}>
      <TextComponent
        size={24}
        children={labelText}
        color={TextColor.white}
        addClass={styles.labelText}
      />

      <div className={styles.containerTime}>
        <button
          className={styles.btnChangeTime}
          onClick={() => {
            onAddHour();
          }}
        >
          +
        </button>
        <input
          className={styles.input}
          value={getHours(time)}
          type="number"
          disabled={true}
        />
        <button
          className={styles.btnChangeTime}
          disabled={getHours(time) === 0 ? true : false}
          onClick={() => {
            onReduceHour();
          }}
        >
          -
        </button>
      </div>
      <TextComponent size={16} children={":"} color={TextColor.white} />
      <div className={styles.containerTime}>
        <button
          className={styles.btnChangeTime}
          disabled={getMinutes(time) === 59 ? true : false}
          onClick={() => {
            onAddMinute();
          }}
        >
          +
        </button>
        <input
          className={styles.input}
          value={getMinutes(time)}
          type="number"
          disabled={true}
        />
        <button
          disabled={getMinutes(time) <= 1}
          className={styles.btnChangeTime}
          onClick={() => {
            onReduceMinute();
          }}
        >
          -
        </button>
      </div>
    </div>
  );
}
