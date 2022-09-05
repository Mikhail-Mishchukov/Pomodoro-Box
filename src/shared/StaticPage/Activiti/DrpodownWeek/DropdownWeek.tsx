import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { setWeek } from '../../../../store/static/staticSlice';
import { TextComponent } from '../../../utils-components/TextComponent';
import styles from './dropdownweek.module.css';
export function DropdownWeek() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const listOfWeek = useAppSelector((state) => state.static.weekAray);
  const ref = useRef<HTMLDivElement>(null);
  let classes;
  if (!isDropdownOpen) {
    classes = classNames(styles.btnChoosen);
  } else {
    classes = classNames(styles.btnActive, styles.btnChoosen);
  }
  const dispatch = useAppDispatch();
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target))
        setIsDropdownOpen(false);
    }
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
  const handlClickOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handlClickChooseSecond = () => {
    setIsDropdownOpen(!isDropdownOpen);
    dispatch(setWeek(listOfWeek[1].id));
  };
  const handlClickChooseThird = () => {
    setIsDropdownOpen(!isDropdownOpen);
    dispatch(setWeek(listOfWeek[2].id));
  };

  return (
    <div className={styles.container} ref={ref}>
      <button className={classes} onClick={handlClickOpen}>
        <TextComponent children={listOfWeek[0].btnName} size={16} />
      </button>

      {isDropdownOpen && (
        <button className={styles.btnChoosen} onClick={handlClickChooseSecond}>
          <TextComponent children={listOfWeek[1].btnName} size={16} />
        </button>
      )}
      {isDropdownOpen && (
        <button className={styles.btnChoosen} onClick={handlClickChooseThird}>
          <TextComponent children={listOfWeek[2].btnName} size={16} />
        </button>
      )}
    </div>
  );
}
