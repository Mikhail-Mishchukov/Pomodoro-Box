import styles from "./TodoList.module.css";
import { useSpring, animated } from "react-spring";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../store/store";
import { TextColor, TextComponent } from "../../../components/TextComponent";
import { getFullTodoTime } from "../../../utils/timeUtils";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const todos = useAppSelector((state) => state.todos.list);
  const allTime = useAppSelector((state) => state.todos.allTime);
  const isActive = useAppSelector((state) => state.todos.isTimerActive);
  const needNotifications = useAppSelector(
    (state) => state.globalSettings.notifications
  );

  const [currentAllTime, setCurrentAllTime] = useState(allTime);

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

  useEffect(() => {
    if (Math.abs(currentAllTime - allTime) > 59) {
      setCurrentAllTime(allTime);
    }
  }, [allTime, currentAllTime]);
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
          color={TextColor.gray99}
        />
      </animated.span>
    </div>
  );
}
