import { EIcons, Icon } from '../../common/Icon';
import styles from './Header.module.css';
import '../../../global.css';
import { EColor, TextComponent } from '../../common/TextComponent';
import { Link } from 'react-router-dom';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useAppSelector } from '../../../store/hooks';
import classNames from 'classnames';

export function Header() {
  const isTaskActive = useAppSelector((state) => state.timerBlock.isTaskActive);
  const isTaskBreakActive = useAppSelector(
    (state) => state.timerBlock.isTaskBreakActive
  );
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.container}>
          <Link to="/">
            <Icon widthSize={205} heightSize={40} name={EIcons.logo} />
          </Link>
          <div className={styles.rightSideContainer}>
            <ThemeSwitcher />
            <Link
              to="/static"
              className={
                isTaskActive || isTaskBreakActive
                  ? classNames(styles.desabledLink, styles.link)
                  : styles.link
              }
            >
              <Icon
                name={EIcons.chart}
                widthSize={16}
                heightSize={16}
                marginRight={9}
              />

              <TextComponent
                size={16}
                children={'Статистика'}
                color={EColor.red}
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
