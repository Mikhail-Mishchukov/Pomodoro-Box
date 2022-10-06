import { changeTheme } from '../../../../store/app/appSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import styles from './ThemeSwitcher.module.css';
export function ThemeSwitcher() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.app.theme);
  return (
    <div className={styles.container}>
      <span>Темная тема:</span>
      <label className={styles.checkbox}>
        <input
          onChange={() => dispatch(changeTheme())}
          type="checkbox"
          checked={theme === 'light' ? false : true}
        ></input>
        <span className={styles.checkboxSwitch}></span>
      </label>
    </div>
  );
}
