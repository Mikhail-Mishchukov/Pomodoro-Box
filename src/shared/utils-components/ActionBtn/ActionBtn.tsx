import React from 'react';
import styles from './actionbtn.module.css';
import classNames from 'classnames';

export enum EBtnType {
  red = 'Red',
  green = 'Green',
  redBorder = 'RedBorder',
}

interface IActionBtnProps {
  children?: React.ReactNode;
  type: EBtnType;
  addClass?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function ActionBtn({
  children,
  type,
  addClass,
  onClick = () => {},
  disabled = false,
}: IActionBtnProps) {
  const classes = classNames(addClass, styles[`btn${type}`]);
  return (
    <button disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
