import { FormEvent, useRef, useState } from 'react';
import { useAppDispatch } from '../../../../../store/hooks';
import { updateTextTodo } from '../../../../../store/todo/todoSlice';
import { ActionBtn, EBtnType } from '../../../../utils-components/ActionBtn';
import { TextComponent } from '../../../../utils-components/TextComponent';
import styles from './edittextform.module.css';

interface IEditTextFormProps {
  onClose: () => void;
  id: string;
  text: string;
}

export function EditTextForm({ id, text, onClose }: IEditTextFormProps) {
  const [textTask, setText] = useState(text);
  const [error, setError] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const handlSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (ref.current?.value) {
      dispatch(updateTextTodo({ id, text: ref.current?.value }));
      setError('');
      onClose();
      return;
    }
    setError('Поле обязательно для заполенния');
  };

  return (
    <form className={styles.form} onSubmit={handlSubmit}>
      <TextComponent
        children={'Измените название задачи'}
        size={24}
        As={'h3'}
        addClass={styles.title}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
      <input
        type="text"
        className={styles.input}
        autoFocus
        ref={ref}
        value={textTask}
        onChange={(e) => setText(e.target.value)}
      />
      <ActionBtn
        children={'Принять'}
        type={EBtnType.green}
        addClass={styles.btnAccept}
      />
      <button type="button" className={styles.btnCancel} onClick={onClose}>
        <TextComponent children={'Отмена'} size={16} />
      </button>
    </form>
  );
}
