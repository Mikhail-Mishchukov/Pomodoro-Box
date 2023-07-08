import { PageHeader } from "../../components/PageHeader";
import { TextComponent } from "../../components/TextComponent";
import "../../global.css";
import classes from "./MainPage.module.css";
import { useState } from "react";
import { nanoid } from "nanoid";
import { AddDealForm } from "./AddTodoForm";
import { TimerBlock } from "./TimerBlock";
import { TodoList } from "./TodoList";

export function MainPage() {
  const [infoMenu] = useState([
    "Выберите категорию и напишите название текущей задачи",
    "Запустите таймер («помидор»)",
    "Работайте пока «помидор» не прозвонит",
    "Сделайте короткий перерыв (3-5 минут)",
    "Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).",
  ]);

  return (
    <>
      <PageHeader />
      <main className={classes.main}>
        <div className="container">
          <div className={classes.contentContainer}>
            <div className={classes.infoBlock}>
              <TextComponent
                size={24}
                children={"Ура! Теперь можно начать работать:"}
                As={"h2"}
                addClass={classes.infoBlockTitle}
              />
              <ul className={classes.infoBlockList}>
                {infoMenu.map((item) => {
                  return (
                    <li className={classes.infoBlock__item} key={nanoid()}>
                      <TextComponent size={16} children={item} />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={classes.form}>
              <AddDealForm />
            </div>
            <div className={classes.viewTimerContainer}>
              <TimerBlock />
            </div>
            <TodoList />
          </div>
        </div>
      </main>
    </>
  );
}
