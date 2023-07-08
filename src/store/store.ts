import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { globalSettingsReducer } from "./globalSettingsSlice";
import { todoReducer } from "./todoSlice";
import { timerReducer } from "./timerBlockSlice";
import { staticReducer } from "./staticSlice";

const store = configureStore({
  reducer: {
    globalSettings: globalSettingsReducer,
    todos: todoReducer,
    timerBlock: timerReducer,
    static: staticReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
