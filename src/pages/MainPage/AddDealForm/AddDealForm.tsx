import classNames from 'classnames';
import { ChangeEvent, FormEvent, useRef } from 'react';
import { animated, useSpring } from 'react-spring';
import {
  changeName,
  setErrorMessage,
  setWillErrorMessageDelete,
} from '../../../store/addTaskForm/addTaskForm';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { createTodo } from '../../../store/todo/todoSlice';
import { ActionBtn, EBtnType } from '../../../components/common/ActionBtn';
import {
  EColor,
  TextComponent,
} from '../../../components/common/TextComponent';
import styles from './AddDealForm.module.css';

export function AddDealForm() {
  const name = useAppSelector((state) => state.form.name);
  const errorMessage = useAppSelector((state) => state.form.error);
  const willErrorMessageDelete = useAppSelector(
    (state) => state.form.willErrorDelete
  );

  const animatedProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 400 },
    reset: true,
    reverse: willErrorMessageDelete,
    onRest: () => {
      if (willErrorMessageDelete) {
        dispatch(setErrorMessage(''));
        dispatch(setWillErrorMessageDelete(false));
      }
    },
  });

  const ref = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const handlSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (ref.current?.value.trim().length) {
      dispatch(createTodo(ref.current?.value));
      dispatch(changeName(''));
    } else {
      dispatch(setErrorMessage('Введите название дела'));
      ref.current?.focus();
    }
  };
  const handChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeName(event.target.value));
    if (errorMessage) {
      dispatch(setWillErrorMessageDelete(true));
    }
  };
  return (
    <form className={styles.form} onSubmit={handlSubmit}>
      {errorMessage && (
        <animated.div style={animatedProps} className={styles.errorBlock}>
          {errorMessage}
        </animated.div>
      )}

      <input
        type="text"
        className={
          errorMessage && !willErrorMessageDelete
            ? classNames(styles.input, styles.inputWrong)
            : styles.input
        }
        placeholder={'Название задачи'}
        onChange={handChange}
        value={name}
        ref={ref}
      />
      <ActionBtn
        type={EBtnType.green}
        children={
          <TextComponent children={'Добавить'} size={16} color={EColor.white} />
        }
        addClass={styles.btn}
      />
    </form>
  );
}
