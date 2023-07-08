import styles from "./Button.module.css";
import classNames from "classnames";

export enum ButtonType {
  red = "Red",
  green = "Green",
  redBorder = "RedBorder",
}

interface ButtonProps {
  children?: React.ReactNode;
  type: ButtonType;
  addClass?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  children,
  type,
  addClass,
  onClick = () => {},
  disabled = false,
}: ButtonProps) {
  const classes = classNames(addClass, styles[`btn${type}`]);
  return (
    <button disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
