import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export interface ITodoItem {
  id: string;
  text: string;
  allTomato: number;
  currentTomato: number;
  currentTimer: number;
  countBreak: number;
}

type TodoState = {
  list: ITodoItem[];
};

const initialState: TodoState = {
  list: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.list.push({
        id: nanoid(),
        text: action.payload,
        allTomato: 1,
        currentTomato: 1,
        currentTimer: 1500,
        countBreak: 0,
      });
    },
    incrementCount(state, action: PayloadAction<string>) {
      const incrementTodo = state.list.find(
        (todo) => todo.id === action.payload
      );
      if (incrementTodo) {
        incrementTodo.allTomato++;
      }
    },
    decrementCount(state, action: PayloadAction<string>) {
      const incrementTodo = state.list.find(
        (todo) => todo.id === action.payload
      );
      if (incrementTodo) {
        if (incrementTodo.allTomato >= 2) {
          incrementTodo.allTomato--;
        }
      }
    },
    updateTextTodo(state, action: PayloadAction<{ id: string; text: string }>) {
      const editTodo = state.list.find((todo) => todo.id === action.payload.id);
      if (editTodo?.text) {
        editTodo.text = action.payload.text;
      }
    },
    deleteTodo(state, action: PayloadAction<string>) {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
    addMinute(state, action: PayloadAction<string>) {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo?.currentTimer || todo?.currentTimer === 0) {
        todo.currentTimer = todo.currentTimer + 60;
      }
    },
    decreaseTimer(state, action: PayloadAction<string>) {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo?.currentTimer) {
        todo.currentTimer = todo.currentTimer - 1;
      }
    },
    resetTimer(state, action: PayloadAction<string>) {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo?.currentTimer || todo?.currentTimer === 0) {
        todo.currentTimer = 1500;
      }
    },
    doneTodo(state, action: PayloadAction<string>) {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo) {
        if (todo.allTomato === 1) {
          state.list = state.list.filter((todo) => todo.id !== action.payload);
        } else {
          todo.currentTimer = 1500;
          todo.currentTomato++;
          todo.allTomato--;
        }
      }
    },
    setTimerBreak(state, action: PayloadAction<string>) {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.countBreak++;
        if (todo.countBreak % 3 === 0) {
          todo.currentTimer = 900;
        } else {
          todo.currentTimer = 300;
        }
      }
    },
  },
});
export const {
  addTodo,
  incrementCount,
  decrementCount,
  updateTextTodo,
  deleteTodo,
  addMinute,
  decreaseTimer,
  resetTimer,
  doneTodo,
  setTimerBreak,
} = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
