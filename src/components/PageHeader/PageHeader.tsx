import { Link } from "react-router-dom";
import { Icon, IconsType } from "../Icons";
import { ThemeSwitcher } from "../ThemeSwitcher";
import classes from "./PageHeader.module.css";
import { TextColor, TextComponent } from "../TextComponent";
// import classNames from "classnames";
// import { useAppSelector } from "../../store/store";

export function PageHeader() {
  // const isTaskActive = useAppSelector((state) => state.timerBlock.isTaskActive);
  // const isTaskBreakActive = useAppSelector(
  //   (state) => state.timerBlock.isTaskBreakActive
  // );
  return (
    <header className={classes.header}>
      <div className="container">
        <div className={classes.container}>
          <Link to="/">
            <Icon width={205} height={40} name={IconsType.logo} />
          </Link>
          <div className={classes.rightSideContainer}>
            <ThemeSwitcher />
            <Link
              to="/static"
              // className={
              //   isTaskActive || isTaskBreakActive
              //     ? classNames(classes.disabledLink, classes.link)
              //     : classes.link
              // }
            >
              <Icon
                name={IconsType.chart}
                width={16}
                height={16}
                marginRight={9}
              />
              <TextComponent
                size={16}
                children={"Статистика"}
                color={TextColor.red}
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
