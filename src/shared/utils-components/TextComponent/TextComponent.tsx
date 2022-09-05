import React from 'react';
import styles from './textcomponent.module.css';
import classNames from 'classnames';

export enum EColor {
  black = 'black',
  white = 'white',
  gray99 = 'gray99',
  red = 'red',
  green = 'green',
  darkRed = 'darkRed',
}
type TSizes = 150 | 64 | 24 | 16 | 12;
interface ItextProps {
  As?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
  children?: React.ReactNode;
  size: TSizes;
  color?: EColor;
  addClass?: string;
}

export function TextComponent(props: ItextProps) {
  const {
    As = 'span',
    children,
    size,
    color = EColor.black,
    addClass = '',
  } = props;

  const classes = classNames(styles[`s${size}`], styles[color], addClass);
  return <As className={classes}>{children}</As>;
}
