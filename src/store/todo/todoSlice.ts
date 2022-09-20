import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export interface ITodoItem {
  id: string;
  name: string;
  numberOfTask: number;
  allTomato: number;
  currentTomato: number;
  countBreak: number;
  setTimeForTomato: number;
  setTimeForBreak: number;
  setTimeForBigBreak: number;
  currentTimeForTomato: number;
  currentTimeForBreak: number;
  willDelete: boolean;
}

type TodoState = {
  list: ITodoItem[];
  allTime: number;
  isActiveTimer: boolean;
};

const initialState: TodoState = {
  list: [],
  allTime: 0,
  isActiveTimer: false,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    createTodo(state, action: PayloadAction<string>) {
      const newTodo = {
        id: nanoid(),
        name: action.payload,
        numberOfTask: state.list.length + 1,
        allTomato: 1,
        currentTomato: 1,
        countBreak: 1,
        setTimeForTomato: 1500,
        setTimeForBreak: 300,
        setTimeForBigBreak: 900,
        currentTimeForTomato: 1500,
        currentTimeForBreak: 1,
        willDelete: false,
      };
      state.list.push(newTodo);
      state.allTime = state.allTime + newTodo.setTimeForTomato;
    },
    incrementCountTomato(state, action: PayloadAction<string>) {
      const incrementTodo = state.list.find(
        (todo) => todo.id === action.payload
      );
      if (incrementTodo) {
        incrementTodo.allTomato++;
        state.allTime = state.allTime + incrementTodo.setTimeForTomato;
      }
    },
    decrementCountTomato(state, action: PayloadAction<string>) {
      const decrementTodo = state.list.find(
        (todo) => todo.id === action.payload
      );
      if (decrementTodo) {
        if (
          decrementTodo.allTomato >= 2 &&
          decrementTodo.currentTomato !== decrementTodo.allTomato
        ) {
          decrementTodo.allTomato--;
          state.allTime = state.allTime - decrementTodo.setTimeForTomato;
        }
      }
    },
    updateNameTodo(state, action: PayloadAction<{ id: string; name: string }>) {
      const editTodo = state.list.find((todo) => todo.id === action.payload.id);
      if (editTodo?.name) {
        editTodo.name = action.payload.name;
      }
    },
    setWillTodoDelete(state, action: PayloadAction<string>) {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.willDelete = true;
      }
    },
    deleteTodo(state, action: PayloadAction<string>) {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo) {
        state.allTime =
          state.allTime -
          ((todo.allTomato - todo.currentTomato) * todo.setTimeForTomato +
            todo.currentTimeForTomato);
      }
      state.list = state.list.filter((todo) => {
        return todo.id !== action.payload;
      });
      for (let i = 0; i < state.list.length; i++) {
        if (state.list[i].numberOfTask !== i + 1) {
          state.list[i].numberOfTask = i + 1;
        }
      }
    },
    addMinuteForTask(state, action: PayloadAction<string>) {
      const todo = state.list.find((todo) => todo.id === action.payload);

      if (todo) {
        todo.currentTimeForTomato = todo.currentTimeForTomato + 60;
        state.allTime = state.allTime + 60;
      }
    },
    addMinuteForBreak(state, action: PayloadAction<string>) {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo?.currentTimeForBreak || todo?.currentTimeForBreak === 0) {
        todo.currentTimeForBreak = todo.currentTimeForBreak + 60;
      }
    },
    decreaseTimerTask(state, action: PayloadAction<string>) {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo?.currentTimeForTomato) {
        todo.currentTimeForTomato = todo.currentTimeForTomato - 1;
        state.allTime = state.allTime - 1;
      }
    },
    resetTimer(state, action: PayloadAction<string>) {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo?.currentTimeForTomato || todo?.currentTimeForTomato === 0) {
        state.allTime =
          state.allTime - todo.currentTimeForTomato + todo.setTimeForTomato;
        todo.currentTimeForTomato = todo.setTimeForTomato;
      }
    },
    setTimerBreak(state, action: PayloadAction<string>) {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo) {
        state.allTime = state.allTime - todo.currentTimeForTomato;
        todo.currentTimeForTomato = 0;
        if (todo.countBreak % 3 === 0) {
          todo.currentTimeForBreak = todo.setTimeForBigBreak;
        } else {
          todo.currentTimeForBreak = todo.setTimeForBreak;
        }
      }
    },
    decreaseTimerBreak(state, action: PayloadAction<string>) {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo?.currentTimeForBreak) {
        todo.currentTimeForBreak = todo.currentTimeForBreak - 1;
      }
    },
    doneTomato(state, action: PayloadAction<string>) {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.currentTomato++;
        todo.countBreak++;
        todo.currentTimeForTomato = todo.setTimeForTomato;
      }
    },
    setCurrentTimeBreak(
      state,
      action: PayloadAction<{ id: string; time: number }>
    ) {
      const todo = state.list.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.currentTimeForBreak = action.payload.time;
      }
    },
    setActiveTask(state, action: PayloadAction<boolean>) {
      state.isActiveTimer = action.payload;
    },
  },
});
export const {
  createTodo,
  incrementCountTomato,
  decrementCountTomato,
  updateNameTodo,
  setWillTodoDelete,
  deleteTodo,
  addMinuteForTask,
  decreaseTimerTask,
  resetTimer,
  setTimerBreak,
  decreaseTimerBreak,
  addMinuteForBreak,
  doneTomato,
  setCurrentTimeBreak,
  setActiveTask,
} = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
