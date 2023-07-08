import { FormEvent, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import styles from "./EditTextForm.module.css";
import { useAppDispatch } from "../../../../../store/store";
import { updateNameTodo } from "../../../../../store/todoSlice";
import { TextComponent } from "../../../../../components/TextComponent";
import { Button, ButtonType } from "../../../../../components/Button";

interface EditTextFormProps {
  onClose: () => void;
  id: string;
  text: string;
}

export function EditTextForm({ id, text, onClose }: EditTextFormProps) {
  const [textTask, setText] = useState(text);
  const [error, setError] = useState("");
  const [willDelete, setWillDelete] = useState(false);

  const ref = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const animatedProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 400 },
    reset: true,
    reverse: willDelete,
    onRest: () => {
      if (willDelete) {
        setError("");
        setWillDelete(false);
      }
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (ref.current?.value.trim().length) {
      dispatch(updateNameTodo({ id, name: ref.current?.value }));
      onClose();
      return;
    }
    setError("Поле обязательно для заполенния");
    ref.current?.focus();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <TextComponent
        children={"Измените название задачи"}
        size={24}
        As={"h3"}
        addClass={styles.title}
      />
      {error && (
        <animated.span className={styles.errorMessage} style={animatedProps}>
          {error}
        </animated.span>
      )}
      <input
        type="text"
        className={styles.input}
        autoFocus
        ref={ref}
        value={textTask}
        onChange={(e) => {
          setText(e.target.value);
          if (!willDelete) {
            setWillDelete(true);
          }
        }}
      />
      <Button
        children={"Принять"}
        type={ButtonType.green}
        addClass={styles.btnAccept}
      />
      <button type="button" className={styles.btnCancel} onClick={onClose}>
        <TextComponent children={"Отмена"} size={16} />
      </button>
    </form>
  );
}
