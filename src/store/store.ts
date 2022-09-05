import { configureStore } from '@reduxjs/toolkit';
import { staticReducer } from './static/staticSlice';
import { timerReducer } from './timerBlock/timerBlockSlice';
import { todoReducer } from './todo/todoSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer,
    timerBlock: timerReducer,
    static: staticReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
