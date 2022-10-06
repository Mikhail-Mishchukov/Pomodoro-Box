import { configureStore } from '@reduxjs/toolkit';
import { addTaskFormReducer } from './addTaskForm/addTaskForm';
import { appReducer } from './app/appSlice';
import { staticReducer } from './static/staticSlice';
import { timerReducer } from './timerBlock/timerBlockSlice';
import { todoReducer } from './todo/todoSlice';

const store = configureStore({
  reducer: {
    form: addTaskFormReducer,
    todos: todoReducer,
    timerBlock: timerReducer,
    static: staticReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
