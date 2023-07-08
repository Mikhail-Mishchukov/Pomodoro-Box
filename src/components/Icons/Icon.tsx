import classNames from "classnames";
import { ChartIcon } from "./ChartIcon";
import { CrossIcon } from "./CrossIcon";
import { FocusCardIcon } from "./FocusCardIcon";
import styles from "./Icon.module.css";
import { LogoIcon } from "./LogoIcon";
import { MenuIcon } from "./MenuIcon";
import { MinusIcon } from "./MinusIcon";
import { PauseCardIcon } from "./PauseCardIcon";
import { PenIcon } from "./PenIcon";
import { PlusIcon } from "./PlusIcon";
import { SettingsIcon } from "./SettingsIcon";
import { SmallPlusIcon } from "./SmallPlusIcon";
import { StopsCardIcon } from "./StopsCardIcon";
import { TomatoIcon } from "./TomatoIcon";
import { TrashcanIcon } from "./TrashcanIcon";

export enum IconsType {
  logo = "LogoIcon",
  chart = "ChartIcon",
  plus = "PlusIcon",
  menu = "MenuIcon",
  smallPlus = "SmallPlusIcon",
  minus = "MinusIcon",
  pen = "PenIcon",
  trashcan = "TrashcanIcon",
  cross = "CrossIcon",
  tomato = "TomatoIcon",
  focusCard = "FocusCardIcon",
  pauseCard = "PauseCardIcon",
  stopsCard = "StopsCardIcon",
  settings = "SettingsIcon",
}
const icons = {
  LogoIcon: <LogoIcon />,
  ChartIcon: <ChartIcon />,
  PlusIcon: <PlusIcon />,
  MenuIcon: <MenuIcon />,
  SmallPlusIcon: <SmallPlusIcon />,
  MinusIcon: <MinusIcon />,
  PenIcon: <PenIcon />,
  TrashcanIcon: <TrashcanIcon />,
  CrossIcon: <CrossIcon />,
  TomatoIcon: <TomatoIcon />,
  FocusCardIcon: <FocusCardIcon />,
  PauseCardIcon: <PauseCardIcon />,
  StopsCardIcon: <StopsCardIcon />,
  SettingsIcon: <SettingsIcon />,
};

type IconWidth = 205 | 108 | 81 | 50 | 26 | 16 | 15;
type IconHeight = 108 | 81 | 50 | 40 | 16 | 15 | 6;
type MarginRight = 9;

interface IconProps {
  name: IconsType;
  width: IconWidth;
  height: IconHeight;
  marginRight?: MarginRight;
  addClass?: string;
}

export function Icon({
  name,
  width,
  height,
  marginRight,
  addClass = "",
}: IconProps) {
  const classes = classNames(
    styles[`w${width}`],
    styles[`h${height}`],
    { [styles[`marginRight${marginRight}`]]: marginRight },
    addClass
  );
  const Icon = icons[name].type;
  return (
    <div className={classes}>
      <Icon />
    </div>
  );
}
