import styles from "./TextComponent.module.css";
import classNames from "classnames";

export enum TextColor {
  black = "black",
  white = "white",
  gray99 = "gray99",
  red = "red",
  green = "green",
  darkRed = "darkRed",
}
type Sizes = 150 | 64 | 24 | 16 | 12;

interface TextComponentProps {
  As?: "span" | "h1" | "h2" | "h3" | "h4" | "p" | "div";
  children?: React.ReactNode;
  size: Sizes;
  color?: TextColor;
  addClass?: string;
}

export function TextComponent(props: TextComponentProps) {
  const {
    As = "span",
    children,
    size,
    color = TextColor.black,
    addClass = "",
  } = props;

  const classes = classNames(styles[`s${size}`], styles[color], addClass);

  return <As className={classes}>{children}</As>;
}
