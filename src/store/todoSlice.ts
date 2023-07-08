import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { secondsInMinute } from "../utils/timeUtils";

export interface TodoItem {
  id: string;
  name: string;
  numberOfTask: number;
  allTomato: number;
  currentTomato: number;
  countBreak: number;
  currentBreak: number;
  countBreakBeforeBigBreak: number;
  timeForTomato: number;
  timeForBreak: number;
  timeForBigBreak: number;
  currentTimeForTomato: number;
  currentTimeForBreak: number;
  willDelete: boolean;
}

type TodoState = {
  list: TodoItem[];
  allTime: number;
  isTimerActive: boolean;
};

const initialState: TodoState = {
  list: JSON.parse(localStorage.getItem("todos") ?? "[]"),
  allTime: JSON.parse(localStorage.getItem("allTime") ?? "0"),
  isTimerActive: false,
};

const todoSlice = createSlice({
  name: "Todos",
  initialState,
  reducers: {
    createTodo(state, action: PayloadAction<string>) {
      const newTodo: TodoItem = {
        id: nanoid(),
        name: action.payload,
        numberOfTask: state.list.length + 1,
        allTomato: 1,
        currentTomato: 1,
        countBreak: 1,
        timeForTomato: 1500,
        timeForBreak: 300,
        timeForBigBreak: 900,
        currentTimeForTomato: 1500,
        currentTimeForBreak: 1,
        willDelete: false,
        countBreakBeforeBigBreak: 3,
        currentBreak: 1,
      };
      state.list.push(newTodo);
      state.allTime = state.allTime + newTodo.timeForTomato;
      localStorage.setItem("todos", JSON.stringify(state.list));
      localStorage.setItem("allTime", JSON.stringify(state.allTime));
    },
    incrementCountTomato(state, action: PayloadAction<string>) {
      const incrementTodo = state.list.find(
        (todo) => todo.id === action.payload
      );
      if (incrementTodo) {
        incrementTodo.allTomato++;
        state.allTime = state.allTime + incrementTodo.timeForTomato;
      }
      localStorage.setItem("todos", JSON.stringify(state.list));
      localStorage.setItem("allTime", JSON.stringify(state.allTime));
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
          state.allTime = state.allTime - decrementTodo.timeForTomato;
        }
      }
      localStorage.setItem("todos", JSON.stringify(state.list));
      localStorage.setItem("allTime", JSON.stringify(state.allTime));
    },
    updateNameTodo(state, action: PayloadAction<{ id: string; name: string }>) {
      const editTodo = state.list.find((todo) => todo.id === action.payload.id);
      if (editTodo?.name) {
        editTodo.name = action.payload.name;
      }
      localStorage.setItem("todos", JSON.stringify(state.list));
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
          ((todo.allTomato - todo.currentTomato) * todo.timeForTomato +
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
      localStorage.setItem("todos", JSON.stringify(state.list));
      localStorage.setItem("allTime", JSON.stringify(state.allTime));
    },
    addMinuteForTask(state, action: PayloadAction<string>) {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.currentTimeForTomato = todo.currentTimeForTomato + secondsInMinute;
        state.allTime = state.allTime + secondsInMinute;
      }
      localStorage.setItem("todos", JSON.stringify(state.list));
      localStorage.setItem("allTime", JSON.stringify(state.allTime));
    },
    addMinuteForBreak(state, action: PayloadAction<string>) {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo?.currentTimeForBreak || todo?.currentTimeForBreak === 0) {
        todo.currentTimeForBreak = todo.currentTimeForBreak + secondsInMinute;
      }
      localStorage.setItem("todos", JSON.stringify(state.list));
    },
    decreaseTimerTask(state, action: PayloadAction<string>) {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo?.currentTimeForTomato) {
        todo.currentTimeForTomato = todo.currentTimeForTomato - 1;
        state.allTime = state.allTime - 1;
      }
      localStorage.setItem("todos", JSON.stringify(state.list));
      localStorage.setItem("allTime", JSON.stringify(state.allTime));
    },
    resetTimer(state, action: PayloadAction<string>) {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo?.currentTimeForTomato || todo?.currentTimeForTomato === 0) {
        state.allTime =
          state.allTime - todo.currentTimeForTomato + todo.timeForTomato;
        todo.currentTimeForTomato = todo.timeForTomato;
      }
      localStorage.setItem("todos", JSON.stringify(state.list));
      localStorage.setItem("allTime", JSON.stringify(state.allTime));
    },
    setTimerBreak(state, action: PayloadAction<string>) {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo) {
        state.allTime = state.allTime - todo.currentTimeForTomato;
        todo.currentTimeForTomato = 0;
        if (todo.currentBreak % todo.countBreak === 0) {
          todo.currentTimeForBreak = todo.timeForBigBreak;
        } else {
          todo.currentTimeForBreak = todo.timeForBreak;
        }
      }
      localStorage.setItem("todos", JSON.stringify(state.list));
      localStorage.setItem("allTime", JSON.stringify(state.allTime));
    },
    decreaseTimerBreak(state, action: PayloadAction<string>) {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo?.currentTimeForBreak) {
        todo.currentTimeForBreak = todo.currentTimeForBreak - 1;
      }
      localStorage.setItem("todos", JSON.stringify(state.list));
    },
    doneTomato(state, action: PayloadAction<string>) {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.currentTomato++;
        todo.countBreak++;
        todo.currentBreak++;
        todo.currentTimeForTomato = todo.timeForTomato;
      }
      localStorage.setItem("todos", JSON.stringify(state.list));
    },
    setCurrentTimeBreak(
      state,
      action: PayloadAction<{ id: string; time: number }>
    ) {
      const todo = state.list.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.currentTimeForBreak = action.payload.time;
      }
      localStorage.setItem("todos", JSON.stringify(state.list));
    },
    setActiveTask(state, action: PayloadAction<boolean>) {
      state.isTimerActive = action.payload;
    },
    updateTodoCountBreak(
      state,
      action: PayloadAction<{ id: string; count: number }>
    ) {
      const todo = state.list.find((todo) => todo.id === action.payload.id);

      if (todo) {
        todo.countBreak = action.payload.count;
        todo.currentBreak = 1;
      }
      localStorage.setItem("todos", JSON.stringify(state.list));
    },
    updateSetTimeForBigBreak(
      state,
      action: PayloadAction<{ id: string; time: number }>
    ) {
      const todo = state.list.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.timeForBigBreak = action.payload.time;
      }
      localStorage.setItem("todos", JSON.stringify(state.list));
    },
    updateSetTimeForBreak(
      state,
      action: PayloadAction<{ id: string; time: number }>
    ) {
      const todo = state.list.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.timeForBreak = action.payload.time;
      }
      localStorage.setItem("todos", JSON.stringify(state.list));
    },
    updateTimeForTomato(
      state,
      action: PayloadAction<{ id: string; time: number }>
    ) {
      const todo = state.list.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.timeForTomato = action.payload.time;
      }
      localStorage.setItem("todos", JSON.stringify(state.list));
    },
    updateCurrentTimeForTomato(state, action: PayloadAction<string>) {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo) {
        state.allTime =
          state.allTime - todo.currentTimeForTomato + todo.timeForTomato;
        todo.currentTimeForTomato = todo.timeForTomato;
      }
      localStorage.setItem("todos", JSON.stringify(state.list));
      localStorage.setItem("allTime", JSON.stringify(state.allTime));
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
  updateTodoCountBreak,
  updateSetTimeForBigBreak,
  updateSetTimeForBreak,
  updateTimeForTomato,
  updateCurrentTimeForTomato,
} = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
