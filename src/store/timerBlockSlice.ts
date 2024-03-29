import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TimerBlock {
  todoID: string;
  time: number;
  name: string;
  numberTask: number;
  numberTomato: number;
  numberBreak: number;
  timerId?: ReturnType<typeof setInterval>;
  isTimerActive: boolean;
  isTaskActive: boolean;
  isTimerOnPause: boolean;
  isTimerBreakActive: boolean;
  isTaskBreakActive: boolean;
  isTimerBreakOnPause: boolean;
  isNotificationsActive: boolean;
  countBreak: number;
  setBigBreak: number;
  setBreak: number;
  setTime: number;
}
const initialState: TimerBlock = {
  todoID: "",
  time: 0,
  name: "",
  numberTask: 0,
  numberTomato: 0,
  numberBreak: 0,
  timerId: undefined,
  isTimerActive: false,
  isTaskActive: false,
  isTimerOnPause: false,
  isTimerBreakActive: false,
  isTaskBreakActive: false,
  isTimerBreakOnPause: false,
  isNotificationsActive: true,
  countBreak: 0,
  setBigBreak: 900,
  setBreak: 300,
  setTime: 0,
};
const timerBlockSlice = createSlice({
  name: "TimerBlock",
  initialState,
  reducers: {
    setTimer(state, action: PayloadAction<TimerBlock>) {
      if (state.todoID !== action.payload.todoID) {
        state.todoID = action.payload.todoID;
        state.time = action.payload.time;
        state.name = action.payload.name;
        state.numberTask = action.payload.numberTask;
        state.numberTomato = action.payload.numberTomato;
        state.numberBreak = action.payload.numberBreak;
        state.isTimerActive = action.payload.isTimerActive;
        state.isTaskActive = action.payload.isTaskActive;
        state.isTimerOnPause = action.payload.isTimerOnPause;
        state.isTimerBreakActive = action.payload.isTimerBreakActive;
        state.isTaskBreakActive = action.payload.isTaskBreakActive;
        state.isTimerBreakOnPause = action.payload.isTimerBreakOnPause;
        state.isNotificationsActive = action.payload.isNotificationsActive;
        state.countBreak = action.payload.countBreak;
        state.setBigBreak = action.payload.setBigBreak;
        state.setBreak = action.payload.setBreak;
        state.setTime = action.payload.setTime;
      }
    },
    updateName(state, action: PayloadAction<{ id: string; name: string }>) {
      if (state.todoID === action.payload.id) {
        state.name = action.payload.name;
      }
    },
    updateTime(state, action: PayloadAction<{ id: string; time: number }>) {
      if (state.todoID === action.payload.id) {
        state.time = action.payload.time;
      }
    },
    setIsTimerTaskActive(state, action: PayloadAction<boolean>) {
      state.isTaskActive = action.payload;
    },
    setIsTimerActive(state, action: PayloadAction<boolean>) {
      state.isTimerActive = action.payload;
    },
    setIsTimerOnPause(state, action: PayloadAction<boolean>) {
      state.isTimerOnPause = action.payload;
    },
    setTimerId(state, action: PayloadAction<ReturnType<typeof setInterval>>) {
      state.timerId = action.payload;
    },
    setIsTimerBreakActive(state, action: PayloadAction<boolean>) {
      state.isTimerBreakActive = action.payload;
    },
    setIsTaskBreakActive(state, action: PayloadAction<boolean>) {
      state.isTaskBreakActive = action.payload;
    },
    setIsTimerBreakOnPause(state, action: PayloadAction<boolean>) {
      state.isTimerBreakOnPause = action.payload;
    },
    stopTimer(state) {
      clearInterval(state.timerId);
    },
    updateCount(state, action: PayloadAction<{ id: string; count: number }>) {
      if (state.todoID === action.payload.id) {
        state.numberTomato = action.payload.count;
        state.numberBreak = action.payload.count;
      }
    },
    setIsNotificationActive(state, action: PayloadAction<boolean>) {
      state.isNotificationsActive = action.payload;
    },
    updateCountBreak(
      state,
      action: PayloadAction<{ id: string; count: number }>
    ) {
      if (state.todoID === action.payload.id) {
        state.countBreak = action.payload.count;
      }
    },
    updateSetBigBreak(
      state,
      action: PayloadAction<{ id: string; time: number }>
    ) {
      if (state.todoID === action.payload.id) {
        state.setBigBreak = action.payload.time;
      }
    },
    updateSetBreak(state, action: PayloadAction<{ id: string; time: number }>) {
      if (state.todoID === action.payload.id) {
        state.setBreak = action.payload.time;
      }
    },
    updateSetTime(state, action: PayloadAction<{ id: string; time: number }>) {
      if (state.todoID === action.payload.id) {
        state.setTime = action.payload.time;
      }
    },
  },
});

export const {
  setTimer,
  updateName,
  updateTime,
  setIsTimerActive,
  setIsTimerTaskActive,
  setIsTimerOnPause,
  setTimerId,
  setIsTimerBreakActive,
  setIsTaskBreakActive,
  setIsTimerBreakOnPause,
  stopTimer,
  updateCount,
  setIsNotificationActive,
  updateCountBreak,
  updateSetBigBreak,
  updateSetBreak,
  updateSetTime,
} = timerBlockSlice.actions;
export const timerReducer = timerBlockSlice.reducer;
