import classNames from "classnames";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import { Button, ButtonType } from "../../../components/Button";
import { TextColor, TextComponent } from "../../../components/TextComponent";
import { useAppDispatch } from "../../../store/store";
import { createTodo } from "../../../store/todoSlice";
import classes from "./AddTodoForm.module.css";

export function AddDealForm() {
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLInputElement>(null);

  const [todoName, setTodoName] = useState("");
  const [errorText, setErrorText] = useState("");
  const [willErrorMessageDelete, setWillErrorMessageDelete] = useState(false);

  const animatedProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 400 },
    reset: true,
    reverse: willErrorMessageDelete,
    onRest: () => {
      if (willErrorMessageDelete) {
        setErrorText("");
        setWillErrorMessageDelete(false);
      }
    },
  });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (ref.current?.value.trim().length) {
      dispatch(createTodo(ref.current?.value));
      setTodoName("");
    } else {
      setErrorText("Введите название дела");
      ref.current?.focus();
    }
  };
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoName(event.target.value);
    if (errorText) {
      setWillErrorMessageDelete(true);
    }
  };
  return (
    <form className={classes.form} onSubmit={onSubmit}>
      {errorText && (
        <animated.div style={animatedProps} className={classes.errorBlock}>
          {errorText}
        </animated.div>
      )}

      <input
        type="text"
        className={
          errorText && !willErrorMessageDelete
            ? classNames(classes.input, classes.inputWrong)
            : classes.input
        }
        placeholder={"Название задачи"}
        onChange={onChange}
        value={todoName}
        ref={ref}
      />
      <Button
        type={ButtonType.green}
        children={
          <TextComponent
            children={"Добавить"}
            size={16}
            color={TextColor.white}
          />
        }
        addClass={classes.btn}
      />
    </form>
  );
}
