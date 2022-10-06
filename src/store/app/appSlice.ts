import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IApp {
  theme: string;
  notifications: boolean;
}

const initialState: IApp = {
  theme: localStorage.getItem('theme') ?? 'light',
  notifications: JSON.parse(localStorage.getItem('notifications') ?? 'true'),
};

const appSlice = createSlice({
  name: 'appSlice',
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

export const { changeTheme, changeNotifications } = appSlice.actions;
export const appReducer = appSlice.reducer;
