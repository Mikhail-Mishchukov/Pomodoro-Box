import { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "react-spring";
import styles from "./TodoItem.module.css";
import { toast } from "react-toastify";
import {
  TodoItem as ITodoItem,
  decreaseTimerBreak,
  decrementCountTomato,
  deleteTodo,
  doneTomato,
  incrementCountTomato,
  setActiveTask,
  setTimerBreak,
  setWillTodoDelete,
  updateTodoCountBreak,
} from "../../../../store/todoSlice";
import { useAppDispatch } from "../../../../store/store";
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
  updateName,
  updateSetBigBreak,
  updateSetBreak,
  updateSetTime,
  updateTime,
} from "../../../../store/timerBlockSlice";
import { incrementTomatoCounter } from "../../../../store/staticSlice";
import { TextColor, TextComponent } from "../../../../components/TextComponent";
import { Icon, IconsType } from "../../../../components/Icons";
import { Modal } from "../../../../components/Modal";
import { EditTextForm } from "./EditTextForm/EditTextForm";
import { DeleteForm } from "./DeleteForm";
const soundNotice = require("../../../../assets/sound/notification.mp3");

interface TodoItemProp {
  todo: ITodoItem;
  isActive: boolean;
  notifications: boolean;
}

export function TodoItem({ todo, isActive, notifications }: TodoItemProp) {
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
    timeForBigBreak,
    timeForBreak,
    timeForTomato,
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
        dispatch(setActiveTask(false));
        if (allTomato === currentTomato) {
          dispatch(setWillTodoDelete(id));
          dispatch(incrementTomatoCounter());
        } else {
          dispatch(incrementTomatoCounter());
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
  }, [dispatch, id, name]);

  useEffect(() => {
    dispatch(updateTodoCountBreak({ id: id, count: countBreak }));
  }, [countBreak, dispatch, id]);

  useEffect(() => {
    dispatch(setIsNotificationActive(notifications));
  }, [dispatch, notifications]);

  useEffect(() => {
    dispatch(updateCount({ id: id, count: currentTomato }));
  }, [currentTomato, dispatch, id]);

  useEffect(() => {
    dispatch(updateSetBigBreak({ id: id, time: timeForBigBreak }));
  }, [dispatch, id, timeForBigBreak]);

  useEffect(() => {
    dispatch(updateSetBreak({ id: id, time: timeForBreak }));
  }, [dispatch, id, timeForBreak]);

  useEffect(() => {
    dispatch(updateSetTime({ id: id, time: timeForTomato }));
  }, [dispatch, id, timeForTomato]);

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
            todoID: "",
            time: 0,
            name: "",
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
            isNotificationsActive: notifications,
            countBreak: countBreak,
            setBigBreak: timeForBigBreak,
            setBreak: timeForBreak,
            setTime: timeForTomato,
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
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const onClickButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };
  const onClickIncrementCount = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(incrementCountTomato(id));
    setIsDropdownOpen(false);
  };
  const onClickDecrementCount = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(decrementCountTomato(id));
    setIsDropdownOpen(false);
  };
  const onClickChooseTodo = () => {
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
            isNotificationsActive: notifications,
            countBreak: countBreak,
            setBigBreak: timeForBigBreak,
            setBreak: timeForBreak,
            setTime: timeForTomato,
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
            isNotificationsActive: notifications,
            countBreak: countBreak,
            setBigBreak: timeForBigBreak,
            setBreak: timeForBreak,
            setTime: timeForTomato,
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
        onClick={onClickChooseTodo}
      >
        <span className={styles.counter}>{allTomato}</span>
        <TextComponent children={name} size={16} />
        <div className={styles.dropdownContainer} ref={ref}>
          <button onClick={onClickButton}>
            <Icon name={IconsType.menu} width={26} height={6} />
          </button>
          {isDropdownOpen && (
            <ul
              className={styles.dropdownList}
              onClick={() => setIsDropdownOpen(false)}
            >
              <li className={styles.dropdownItem}>
                <button
                  onClick={onClickIncrementCount}
                  className={styles.dropdownBtn}
                >
                  <Icon
                    width={15}
                    height={15}
                    marginRight={9}
                    name={IconsType.smallPlus}
                  />
                  <TextComponent
                    children={"Увеличить"}
                    size={16}
                    color={TextColor.gray99}
                  />
                </button>
              </li>
              <li className={styles.dropdownItem}>
                <button
                  disabled={allTomato <= 1 || allTomato === currentTomato}
                  className={styles.dropdownBtn}
                  onClick={onClickDecrementCount}
                >
                  <Icon
                    width={15}
                    height={15}
                    marginRight={9}
                    name={IconsType.minus}
                  />
                  <TextComponent
                    children={"Уменьшить"}
                    size={16}
                    color={TextColor.gray99}
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
                    width={15}
                    height={15}
                    marginRight={9}
                    name={IconsType.pen}
                  />
                  <TextComponent
                    children={"Редактировать"}
                    size={16}
                    color={TextColor.gray99}
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
                    width={15}
                    height={15}
                    marginRight={9}
                    name={IconsType.trashcan}
                  />
                  <TextComponent
                    children={"Удалить"}
                    size={16}
                    color={TextColor.gray99}
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
