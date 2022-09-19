import { FormEvent } from 'react';
import { useAppDispatch } from '../../../../../store/hooks';

import { setWillTodoDelete } from '../../../../../store/todo/todoSlice';
import { ActionBtn, EBtnType } from '../../../../common/ActionBtn';
import { TextComponent } from '../../../../common/TextComponent';
import styles from './DeleteForm.module.css';

interface IDeleteFormProps {
  onClose: () => void;
  id: string;
}

export function DeleteForm({ id, onClose }: IDeleteFormProps) {
  const dispatch = useAppDispatch();

  const handlSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setWillTodoDelete(id));

    onClose();
  };
  return (
    <form className={styles.form} onSubmit={handlSubmit}>
      <TextComponent
        children={'Удалить задачу?'}
        size={24}
        As={'h3'}
        addClass={styles.title}
      />

      <ActionBtn
        children={'Удалить'}
        type={EBtnType.red}
        addClass={styles.btnDelete}
      />
      <button type="button" className={styles.btnCancel} onClick={onClose}>
        <TextComponent children={'Отмена'} size={16} />
      </button>
    </form>
  );
}
