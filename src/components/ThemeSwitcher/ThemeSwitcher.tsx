import { changeTheme } from "../../store/globalSettingsSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../store/store";
import styles from "./ThemeSwitcher.module.css";

export function ThemeSwitcher() {
  const dispatch = useAppDispatch();

  const theme = useAppSelector(
    (state: RootState) => state.globalSettings.theme
  );

  return (
    <div className={styles.container}>
      <span>Темная тема:</span>
      <label className={styles.checkbox}>
        <input
          onChange={() => dispatch(changeTheme())}
          type="checkbox"
          checked={theme === "light" ? false : true}
        ></input>
        <span className={styles.checkboxSwitch}></span>
      </label>
    </div>
  );
}
