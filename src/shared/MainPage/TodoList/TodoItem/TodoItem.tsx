import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../../../store/hooks';
import {
  decrementCount,
  incrementCount,
  ITodoItem,
} from '../../../../store/todo/todoSlice';
import { EIcons, Icon } from '../../../utils-components/Icon';
import { Modal } from '../../../utils-components/Modal';
import { EColor, TextComponent } from '../../../utils-components/TextComponent';
import { DeleteForm } from './DeleteForm';
import { EditTextForm } from './EditTextForm';
import styles from './todoitem.module.css';

export function TodoItem({ id, allTomato, text }: ITodoItem) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpened, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpened, setIsDeleteModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
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

  const handlClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handClickIncrementCount = () => {
    dispatch(incrementCount(id));
  };
  const handClickDecrementCount = () => {
    dispatch(decrementCount(id));
  };

  return (
    <li className={styles.item}>
      <span className={styles.counter}>{allTomato}</span>
      <TextComponent children={text} size={16} />
      <div className={styles.dropdownContainer} ref={ref}>
        <button onClick={handlClick}>
          <Icon name={EIcons.menu} widthSize={26} heightSize={6} />
        </button>
        {isDropdownOpen && (
          <ul
            className={styles.dropdownList}
            onClick={() => setIsDropdownOpen(false)}
          >
            <li className={styles.dropdownItem}>
              <button
                onClick={handClickIncrementCount}
                className={styles.dropdownBtn}
              >
                <Icon
                  widthSize={15}
                  heightSize={15}
                  marginRight={9}
                  name={EIcons.smallPlus}
                />
                <TextComponent
                  children={'Увеличить'}
                  size={16}
                  color={EColor.gray99}
                />
              </button>
            </li>
            <li className={styles.dropdownItem}>
              <button
                disabled={allTomato <= 1}
                className={styles.dropdownBtn}
                onClick={handClickDecrementCount}
              >
                <Icon
                  widthSize={15}
                  heightSize={15}
                  marginRight={9}
                  name={EIcons.minus}
                />
                <TextComponent
                  children={'Уменьшить'}
                  size={16}
                  color={EColor.gray99}
                />
              </button>
            </li>
            <li className={styles.dropdownItem}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDropdownOpen(false);
                  setIsEditModalOpen(true);
                }}
                className={styles.dropdownBtn}
              >
                <Icon
                  widthSize={15}
                  heightSize={15}
                  marginRight={9}
                  name={EIcons.pen}
                />
                <TextComponent
                  children={'Редактировать'}
                  size={16}
                  color={EColor.gray99}
                />
              </button>
            </li>
            <li className={styles.dropdownItem}>
              <button
                className={styles.dropdownBtn}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDropdownOpen(false);
                  setIsDeleteModalOpen(true);
                }}
              >
                <Icon
                  widthSize={15}
                  heightSize={15}
                  marginRight={9}
                  name={EIcons.trashcan}
                />
                <TextComponent
                  children={'Удалить'}
                  size={16}
                  color={EColor.gray99}
                />
              </button>
            </li>
          </ul>
        )}
      </div>
      {isEditModalOpened && (
        <Modal
          onClose={() => {
            setIsEditModalOpen(false);
          }}
          children={
            <EditTextForm
              id={id}
              text={text}
              onClose={() => setIsEditModalOpen(false)}
            />
          }
        />
      )}
      {isDeleteModalOpened && (
        <Modal
          onClose={() => {
            setIsDeleteModalOpen(false);
          }}
          children={
            <DeleteForm id={id} onClose={() => setIsDeleteModalOpen(false)} />
          }
        />
      )}
    </li>
  );
}
