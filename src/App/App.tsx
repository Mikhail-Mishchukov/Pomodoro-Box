// import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../global.css";
import { MainPage } from "../pages/MainPage";
// import { StaticPage } from "../pages/StaticPage";
// import { setWeekStatisticInfo } from "../store/static/staticSlice";
import { RootState, useAppSelector } from "../store/store";
import classes from "./App.module.css";

export function App() {
  // const dispatch = useAppDispatch();

  const theme = useAppSelector(
    (state: RootState) => state.globalSettings.theme
  );

  // useEffect(() => {
  //   dispatch(setWeekStatisticInfo());
  // }, [dispatch]);

  return (
    <div data-theme={theme} className={classes.appContainer}>
      <Routes>
        <Route path="/">
          <Route index element={<MainPage />} />
          {/*  <Route path="static" element={<StaticPage />}></Route> */}

          <Route
            path="*"
            element={
              <div className={classes.errorContainer}>
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
