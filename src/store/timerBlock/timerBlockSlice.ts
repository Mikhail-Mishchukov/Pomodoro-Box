import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITimerBlock {
  timerId?: ReturnType<typeof setInterval>;
  isTimerActive?: boolean;
  isTaskActive?: boolean;
  isTimerOnPause?: boolean;
  isTimerBreakActive?: boolean;
  isTaskBreakActive?: boolean;
  isTimerBreakOnPause?: boolean;
}
const initialState: ITimerBlock = {
  timerId: undefined,
  isTimerActive: false,
  isTaskActive: false,
  isTimerOnPause: false,
  isTimerBreakActive: false,
  isTaskBreakActive: false,
  isTimerBreakOnPause: false,
};
const timerBlockSlice = createSlice({
  name: 'TimerBlock',
  initialState,
  reducers: {
    setTimerId(state, action: PayloadAction<ReturnType<typeof setInterval>>) {
      state.timerId = action.payload;
    },
    setIsTimerActive(state, action: PayloadAction<boolean>) {
      state.isTimerActive = action.payload;
    },
    setIsTimerTaskActive(state, action: PayloadAction<boolean>) {
      state.isTaskActive = action.payload;
    },
    setIsTimerOnPause(state, action: PayloadAction<boolean>) {
      state.isTimerOnPause = action.payload;
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
  },
});

export const {
  setTimerId,
  setIsTimerActive,
  setIsTimerTaskActive,
  setIsTimerOnPause,
  setIsTimerBreakActive,
  setIsTaskBreakActive,
  setIsTimerBreakOnPause,
} = timerBlockSlice.actions;
export const timerReducer = timerBlockSlice.reducer;
