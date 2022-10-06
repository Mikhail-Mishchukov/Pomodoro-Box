import { useAppSelector } from '../../../store/hooks';
import styles from './TodoList.module.css';
import { TodoItem } from './TodoItem';
import {
  EColor,
  TextComponent,
} from '../../../components/common/TextComponent';
import { useSpring, animated } from 'react-spring';
import { useEffect, useState } from 'react';

export function TodoList() {
  const todos = useAppSelector((state) => state.todos.list);
  const allTime = useAppSelector((state) => state.todos.allTime);
  const isActive = useAppSelector((state) => state.todos.isActiveTimer);
  const needNotifications = useAppSelector((state) => state.app.notifications);

  const [currentAllTime, setCurrentAllTime] = useState(allTime);

  useEffect(() => {
    if (Math.abs(currentAllTime - allTime) > 59) {
      setCurrentAllTime(allTime);
    }
  }, [allTime]);

  const animatedProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 400 },
    reset: Math.abs(currentAllTime - allTime) > 59 ? true : false,
    reverse:
      Math.abs(currentAllTime - allTime) > 59
        ? allTime === 0
          ? true
          : false
        : false,
  });

  function getFullTodoTime(time: number) {
    let timeString: string = '';

    if (time > 59) {
      timeString = hoursAndMinutes(time);
    }
    return timeString;
  }
  function hoursAndMinutes(time: number) {
    time = Math.floor(time / 60);
    const m = time % 60;
    const h = Math.floor(time / 60);
    let hoursStr: string = '';

    if (h % 10 === 1 && h !== 11) {
      hoursStr = `${h} час`;
    } else if (h % 10 > 1 && h % 10 < 5 && (h > 20 || h < 10)) {
      hoursStr = `${h} часа`;
    } else if (h === 0) {
      hoursStr = '';
    } else {
      hoursStr = `${h} часов`;
    }
    return hoursStr.concat(` ${m} мин`);
  }

  return (
    <div className={styles.listContainer}>
      <ul className={styles.list}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isActive={isActive}
            notifications={needNotifications}
          />
        ))}
      </ul>
      <animated.span style={animatedProps}>
        <TextComponent
          children={`${getFullTodoTime(currentAllTime)}`}
          size={16}
          color={EColor.gray99}
        />
      </animated.span>
    </div>
  );
}
