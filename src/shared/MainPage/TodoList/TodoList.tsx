import { useAppSelector } from '../../../store/hooks';
import { hoursAndMinutes } from '../../utils/hoursAndMinutes';
import styles from './todolist.module.css';
import { TodoItem } from './TodoItem';
import { EColor, TextComponent } from '../../utils-components/TextComponent';

export function TodoList() {
  const todos = useAppSelector((state) => state.todos.list);
  const isTimerBreakActive = useAppSelector(
    (state) => state.timerBlock.isTaskBreakActive
  );
  let allTime: number = 0;
  todos.forEach((todo) => {
    if (!isTimerBreakActive) {
      allTime += todo.currentTimer;
    }

    let count = todo.allTomato - 1;
    allTime += 1500 * count;
  });
  let timeString: string = '';
  if (allTime > 60) {
    timeString = hoursAndMinutes(allTime);
  }

  return (
    <div>
      <ul className={styles.list}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
      <span>
        <TextComponent
          children={`${timeString}`}
          size={16}
          color={EColor.gray99}
        />
      </span>
    </div>
  );
}
