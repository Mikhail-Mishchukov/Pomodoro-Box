import classNames from 'classnames';
import {
  ChartIcon,
  CrossIcon,
  FocusCardIcon,
  LogoIcon,
  MenuIcon,
  MinusIcon,
  PauseCardIcon,
  PenIcon,
  PlusIcon,
  SmallPlusIcon,
  StopsCardIcon,
  TomatoIcon,
  TrashcanIcon,
} from './icons';
import styles from './Icon.module.css';

export enum EIcons {
  logo = 'LogoIcon',
  chart = 'ChartIcon',
  plus = 'PlusIcon',
  menu = 'MenuIcon',
  smallPlus = 'SmallPlusIcon',
  minus = 'MinusIcon',
  pen = 'PenIcon',
  trashcan = 'TrashcanIcon',
  cross = 'CrossIcon',
  tomato = 'TomatoIcon',
  focusCard = 'FocusCardIcon',
  pauseCard = 'PauseCardIcon',
  stopsCard = 'StopsCardIcon',
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
};

type TWidthSize = 205 | 108 | 81 | 50 | 26 | 16 | 15;
type THeightSize = 108 | 81 | 50 | 40 | 16 | 15 | 6;
type TMarignRight = 9;
interface IIconProps {
  name: EIcons;
  widthSize: TWidthSize;
  heightSize: THeightSize;
  marginRight?: TMarignRight;
  addClass?: string;
}

export function Icon({
  name,
  widthSize,
  heightSize,
  marginRight,
  addClass = '',
}: IIconProps) {
  const classes = classNames(
    styles[`w${widthSize}`],
    styles[`h${heightSize}`],
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
