import { FormEvent } from "react";
import styles from "./DeleteForm.module.css";
import { useAppDispatch } from "../../../../../store/store";
import { setWillTodoDelete } from "../../../../../store/todoSlice";
import { TextComponent } from "../../../../../components/TextComponent";
import { Button, ButtonType } from "../../../../../components/Button";

interface DeleteFormProps {
  onClose: () => void;
  id: string;
}

export function DeleteForm({ id, onClose }: DeleteFormProps) {
  const dispatch = useAppDispatch();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setWillTodoDelete(id));

    onClose();
  };
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <TextComponent
        children={"Удалить задачу?"}
        size={24}
        As={"h3"}
        addClass={styles.title}
      />

      <Button
        children={"Удалить"}
        type={ButtonType.red}
        addClass={styles.btnDelete}
      />
      <button type="button" className={styles.btnCancel} onClick={onClose}>
        <TextComponent children={"Отмена"} size={16} />
      </button>
    </form>
  );
}
