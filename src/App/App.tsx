import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import '../global.css';
import { MainPage } from '../components/MainPage';
import { StaticPage } from '../components/StaticPage';
import { useAppDispatch } from '../store/hooks';
import { setWeekStitisticInfo } from '../store/static/staticSlice';
import styles from './App.module.css';

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setWeekStitisticInfo());
  }, []);

  return (
    <Routes>
      <Route path="/">
        <Route index element={<MainPage />} />
        <Route path="static" element={<StaticPage />}></Route>
        <Route
          path="*"
          element={
            <div className={styles.errorContainer}>
              <h3>404 — страница не найдена</h3>
            </div>
          }
        ></Route>
      </Route>
    </Routes>
  );
}
