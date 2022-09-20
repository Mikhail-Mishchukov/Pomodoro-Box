import { configureStore } from '@reduxjs/toolkit';
import { addTaskFormReducer } from './addTastForm/addTaskForm';
import { appStateReducer } from './appState/appStateSlice';
import { staticReducer } from './static/staticSlice';
import { timerReducer } from './timerBlock/timerBlockSlice';
import { todoReducer } from './todo/todoSlice';

const store = configureStore({
  reducer: {
    form: addTaskFormReducer,
    todos: todoReducer,
    timerBlock: timerReducer,
    static: staticReducer,
    app: appStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
