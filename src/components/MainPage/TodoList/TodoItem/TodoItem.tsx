import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../../../store/hooks';
import { useSpring, animated } from 'react-spring';
import {
  incrementCountTomato,
  decrementCountTomato,
  deleteTodo,
  setTimerBreak,
  decreaseTimerBreak,
  setWillTodoDelete,
  doneTomato,
  setActiveTask,
} from '../../../../store/todo/todoSlice';
import { EIcons, Icon } from '../../../common/Icon';
import { Modal } from '../../../common/Modal';
import { EColor, TextComponent } from '../../../common/TextComponent';
import { DeleteForm } from './DeleteForm';
import { EditTextForm } from './EditTextForm';
import styles from './TodoItem.module.css';
import {
  setIsNotificationActive,
  setIsTaskBreakActive,
  setIsTimerActive,
  setIsTimerBreakActive,
  setIsTimerBreakOnPause,
  setIsTimerOnPause,
  setIsTimerTaskActive,
  setTimer,
  setTimerId,
  stopTimer,
  updateCount,
  updateCountBreak,
  updateName,
  updateSetBigBreak,
  updateSetBreak,
  updateSetTime,
  updateTime,
} from '../../../../store/timerBlock/timerBlockSlice';
import { ITodoItem } from '../../../../store/todo/todoSlice';
import { incrimentTomatoCounter } from '../../../../store/static/staticSlice';
import { toast } from 'react-toastify';
const soundNotice = require('../../../../assets/sound/notification.mp3');

interface ITodoItemComp {
  todo: ITodoItem;
  isActive: boolean;
  notifications: boolean;
}

export function TodoItem({ todo, isActive, notifications }: ITodoItemComp) {
  const {
    id,
    name,
    numberOfTask,
    allTomato,
    currentTomato,
    countBreak,
    currentTimeForTomato,
    currentTimeForBreak,
    willDelete,
    setCountBreak,
    setTimeForBigBreak,
    setTimeForBreak,
    setTimeForTomato,
  } = todo;

  const dispatch = useAppDispatch();

  const Sound = new Audio(soundNotice);

  useEffect(() => {
    dispatch(updateTime({ id: id, time: currentTimeForTomato }));
    if (isActive) {
      if (currentTimeForTomato === 0) {
        dispatch(stopTimer());
        dispatch(setIsTimerActive(false));
        dispatch(setIsTimerOnPause(false));
        dispatch(setIsTimerTaskActive(false));
        dispatch(setTimerBreak(id));
        dispatch(setIsTimerBreakActive(true));
        dispatch(setIsTaskBreakActive(true));
        dispatch(
          setTimerId(
            setInterval(() => {
              dispatch(decreaseTimerBreak(id));
            }, 1000)
          )
        );
        if (notifications) {
          Sound.play();
          toast.success(
            <div className={styles.notification}>
              Помидор окончен, можно сделать перерыв.
            </div>
          );
        }
      }
    }
  }, [currentTimeForTomato]);

  useEffect(() => {
    if (isActive) {
      dispatch(updateTime({ id: id, time: currentTimeForBreak }));
      if (currentTimeForBreak === 0) {
        dispatch(stopTimer());
        dispatch(setIsTimerBreakOnPause(false));
        dispatch(setIsTimerBreakActive(false));
        dispatch(setIsTaskBreakActive(false));
        dispatch(setIsTimerBreakActive(false));
        dispatch(setActiveTask(false));
        if (allTomato === currentTomato) {
          dispatch(setWillTodoDelete(id));
          dispatch(incrimentTomatoCounter());
        } else {
          dispatch(incrimentTomatoCounter());
          dispatch(doneTomato(id));
        }
        if (notifications) {
          Sound.play();
          toast.success(
            <div className={styles.notification}>Перерыв окончен.</div>
          );
        }
      }
    }
  }, [currentTimeForBreak]);

  useEffect(() => {
    dispatch(updateName({ id: id, name: name }));
  }, [name]);
  useEffect(() => {
    dispatch(updateCountBreak({ id: id, count: setCountBreak }));
  }, [setCountBreak]);

  useEffect(() => {
    dispatch(setIsNotificationActive(notifications));
  }, [notifications]);

  useEffect(() => {
    dispatch(updateCount({ id: id, count: currentTomato }));
  }, [currentTomato]);

  useEffect(() => {
    dispatch(updateSetBigBreak({ id: id, time: setTimeForBigBreak }));
  }, [setTimeForBigBreak]);
  useEffect(() => {
    dispatch(updateSetBreak({ id: id, time: setTimeForBreak }));
  }, [setTimeForBreak]);
  useEffect(() => {
    dispatch(updateSetTime({ id: id, time: setTimeForTomato }));
  }, [setTimeForTomato]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [willModalClose, setWillModalClose] = useState(false);
  const [isDeleteModalOpened, setIsDeleteModalOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const animatedProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 400 },
    reverse: willDelete,
    onRest: () => {
      if (willDelete) {
        dispatch(deleteTodo(id));
        dispatch(stopTimer());
        dispatch(setActiveTask(false));
        dispatch(
          setTimer({
            todoID: '',
            time: 0,
            name: '',
            numberTask: 0,
            numberTomato: 0,
            numberBreak: 0,
            timerId: undefined,
            isTimerActive: false,
            isTaskActive: false,
            isTimerOnPause: false,
            isTimerBreakActive: false,
            isTaskBreakActive: false,
            isTimerBreakOnPause: false,
            isNotoficationsActive: notifications,
            countBreak: setCountBreak,
            setBigBreak: setTimeForBigBreak,
            setBreak: setTimeForBreak,
            setTime: setTimeForTomato,
          })
        );
      }
    },
  });

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

  const handlClickButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handClickIncrementCount = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(incrementCountTomato(id));
    setIsDropdownOpen(false);
  };
  const handClickDecrementCount = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(decrementCountTomato(id));
    setIsDropdownOpen(false);
  };
  const handClickChooseTodo = () => {
    if (!isActive) {
      if (currentTimeForTomato !== 0) {
        dispatch(
          setTimer({
            todoID: id,
            time: currentTimeForTomato,
            name: name,
            numberTask: numberOfTask,
            numberTomato: currentTomato,
            numberBreak: countBreak,
            timerId: undefined,
            isTimerActive: false,
            isTaskActive: false,
            isTimerOnPause: false,
            isTimerBreakActive: false,
            isTaskBreakActive: false,
            isTimerBreakOnPause: false,
            isNotoficationsActive: notifications,
            countBreak: setCountBreak,
            setBigBreak: setTimeForBigBreak,
            setBreak: setTimeForBreak,
            setTime: setTimeForTomato,
          })
        );
      } else {
        dispatch(
          setTimer({
            todoID: id,
            time: currentTimeForBreak,
            name: name,
            numberTask: numberOfTask,
            numberTomato: currentTomato,
            numberBreak: countBreak,
            timerId: undefined,
            isTimerActive: false,
            isTaskActive: false,
            isTimerOnPause: false,
            isTimerBreakActive: false,
            isTaskBreakActive: true,
            isTimerBreakOnPause: true,
            isNotoficationsActive: notifications,
            countBreak: setCountBreak,
            setBigBreak: setTimeForBigBreak,
            setBreak: setTimeForBreak,
            setTime: setTimeForTomato,
          })
        );
        dispatch(setActiveTask(true));
      }
    }
  };
  return (
    <>
      <animated.li
        style={animatedProps}
        className={styles.item}
        onClick={handClickChooseTodo}
      >
        <span className={styles.counter}>{allTomato}</span>
        <TextComponent children={name} size={16} />
        <div className={styles.dropdownContainer} ref={ref}>
          <button onClick={handlClickButton}>
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
                  disabled={allTomato <= 1 || allTomato === currentTomato}
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
      </animated.li>
      {isEditModalOpen && (
        <Modal
          onClose={() => {
            setIsEditModalOpen(false);
          }}
          onWillClose={(will: boolean) => {
            setWillModalClose(will);
          }}
          willClose={willModalClose}
          children={
            <EditTextForm
              id={id}
              text={name}
              onClose={() => setWillModalClose(true)}
            />
          }
        />
      )}
      {isDeleteModalOpened && (
        <Modal
          onClose={() => {
            setIsDeleteModalOpen(false);
          }}
          onWillClose={(will: boolean) => {
            setWillModalClose(will);
          }}
          willClose={willModalClose}
          children={
            <DeleteForm id={id} onClose={() => setWillModalClose(true)} />
          }
        />
      )}
    </>
  );
}
