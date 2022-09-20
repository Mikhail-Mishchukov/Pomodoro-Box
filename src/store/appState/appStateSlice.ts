import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export interface IAppState {
  theme: string;
}

const initialState: IAppState = {
  theme: 'light',
};

const appStateSlice = createSlice({
  name: 'appStateSlice',
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction) {
      if (state.theme === 'light') {
        state.theme = 'dark';
      } else {
        state.theme = 'light';
      }
    },
  },
});

export const { changeTheme } = appStateSlice.actions;
export const appStateReducer = appStateSlice.reducer;
