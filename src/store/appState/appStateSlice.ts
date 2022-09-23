import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAppState {
  theme: string;
  notifications: boolean;
}

const initialState: IAppState = {
  theme: localStorage.getItem('theme') ?? 'light',
  notifications: JSON.parse(localStorage.getItem('notifications') ?? 'true'),
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
      localStorage.setItem('theme', state.theme);
    },
    changeNotifications(state, action: PayloadAction) {
      state.notifications = !state.notifications;
      localStorage.setItem(
        'notifications',
        JSON.stringify(state.notifications)
      );
    },
  },
});

export const { changeTheme, changeNotifications } = appStateSlice.actions;
export const appStateReducer = appStateSlice.reducer;
