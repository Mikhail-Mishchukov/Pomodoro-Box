import '../../global.css';
import { Header } from '../Header';
import { TextComponent } from '../utils-components/TextComponent';
import { AddDealForm } from './AddDealForm';
import styles from './mainpage.module.css';
import { TimerBlock } from './TimerBlock';
import { TodoList } from './TodoList';
export function MainPage() {
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
                <li className={styles.infoBlock__item}>
                  <TextComponent
                    size={16}
                    children={
                      'Выберите категорию и напишите название текущей задачи'
                    }
                  />
                </li>
                <li className={styles.infoBlock__item}>
                  <TextComponent
                    size={16}
                    children={'Запустите таймер («помидор»)'}
                  />
                </li>
                <li className={styles.infoBlock__item}>
                  <TextComponent
                    size={16}
                    children={'Работайте пока «помидор» не прозвонит'}
                  />
                </li>
                <li className={styles.infoBlock__item}>
                  <TextComponent
                    size={16}
                    children={'Сделайте короткий перерыв (3-5 минут)'}
                  />
                </li>
                <li className={styles.infoBlock__item}>
                  <TextComponent
                    size={16}
                    children={
                      'Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).'
                    }
                  />
                </li>
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
