import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import '../global.css';

import { MainPage } from '../shared/MainPage';
import { StaticPage } from '../shared/StaticPage';
import { useAppDispatch } from '../store/hooks';
import { setWeekStitisticInfo } from '../store/static/staticSlice';

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
            <div>
              <h3>404 — страница не найдена</h3>
            </div>
          }
        ></Route>
      </Route>
    </Routes>
  );
}
