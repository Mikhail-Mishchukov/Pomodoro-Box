import { FormEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { addTodo } from '../../../store/todo/todoSlice';
import { ActionBtn, EBtnType } from '../../utils-components/ActionBtn';
import { EColor, TextComponent } from '../../utils-components/TextComponent';
import styles from './adddealform.module.css';
export function AddDealForm() {
  const [text, setText] = useState('');

  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handlSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (ref.current?.value.trim().length) {
      dispatch(addTodo(ref.current?.value));
      setText('');
    }
  };

  return (
    <form className={styles.form} onSubmit={handlSubmit}>
      <input
        type="text"
        className={styles.input}
        placeholder={'Название задачи'}
        onChange={(e) => setText(e.target.value)}
        value={text}
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
