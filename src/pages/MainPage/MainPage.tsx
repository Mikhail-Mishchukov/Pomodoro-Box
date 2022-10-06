import '../../global.css';
import { Header } from '../../components/layout/Header';
import { TextComponent } from '../../components/common/TextComponent';
import { AddDealForm } from './AddDealForm';
import styles from './MainPage.module.css';
import { TimerBlock } from './TimerBlock';
import { TodoList } from './TodoList';
import { nanoid } from 'nanoid';
export function MainPage() {
  const infoMenu = [
    'Выберите категорию и напишите название текущей задачи',
    'Запустите таймер («помидор»)',
    'Работайте пока «помидор» не прозвонит',
    'Сделайте короткий перерыв (3-5 минут)',
    'Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).',
  ];

  return (
    <>
      <Header></Header>
      <main className={styles.main}>
        <div className="container">
          <div className={styles.contentContainer}>
            <div className={styles.infoBlock}>
              <TextComponent
                size={24}
                children={'Ура! Теперь можно начать работать:'}
                As={'h2'}
                addClass={styles.infoBlock__title}
              />
              <ul className={styles.infoBlock__list}>
                {infoMenu.map((item) => {
                  return (
                    <li className={styles.infoBlock__item} key={nanoid()}>
                      <TextComponent size={16} children={item} />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.form}>
              <AddDealForm />
            </div>
            <div className={styles.viewTimerContainer}>
              <TimerBlock />
            </div>
            <TodoList />
          </div>
        </div>
      </main>
    </>
  );
}
