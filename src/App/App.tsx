import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import '../global.css';
import { MainPage } from '../components/MainPage';
import { StaticPage } from '../components/StaticPage';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setWeekStitisticInfo } from '../store/static/staticSlice';
import styles from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export function App() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.app.theme);
  useEffect(() => {
    dispatch(setWeekStitisticInfo());
  });

  return (
    <div data-theme={theme} className={styles.appContainer}>
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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        pauseOnHover={false}
        draggable
      />
    </div>
  );
}
