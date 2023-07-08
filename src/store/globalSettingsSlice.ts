import { createSlice } from "@reduxjs/toolkit";

export interface GlobalSettings {
  theme: string;
  notifications: boolean;
}

const initialState: GlobalSettings = {
  theme: localStorage.getItem("theme") ?? "light",
  notifications: JSON.parse(localStorage.getItem("notifications") ?? "true"),
};

const globalSettingsSlice = createSlice({
  name: "GlobalSettingsSlice",
  initialState,
  reducers: {
    changeTheme(state) {
      if (state.theme === "light") {
        state.theme = "dark";
      } else {
        state.theme = "light";
      }
      localStorage.setItem("theme", state.theme);
    },
    changeNotifications(state) {
      state.notifications = !state.notifications;
      localStorage.setItem(
        "notifications",
        JSON.stringify(state.notifications)
      );
    },
  },
});

export const { changeTheme, changeNotifications } = globalSettingsSlice.actions;
export const globalSettingsReducer = globalSettingsSlice.reducer;
