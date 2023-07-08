import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { getDayOfWeek } from "../utils/workWithChart";

export enum AvailableWeek {
  thisWeek = "Эта неделя",
  lastWeek = "Прошедшая неделя",
  preLastWeek = "2 недели назад",
}

export interface BtnWeek {
  btnName: AvailableWeek;
  id: string;
}

export interface DayInfo {
  timeActiveTimer: number;
  countTomato: number;
  pauseTime: number;
  countStops: number;
}
export enum Week {
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
  sunday = "sunday",
}
export interface WeekInfo {
  [Week.monday]: DayInfo;
  [Week.tuesday]: DayInfo;
  [Week.wednesday]: DayInfo;
  [Week.thursday]: DayInfo;
  [Week.friday]: DayInfo;
  [Week.saturday]: DayInfo;
  [Week.sunday]: DayInfo;
  numberOfDayOfWeek: number;
}
export interface StaticInfo {
  prelastWeek: WeekInfo;
  lastWeek: WeekInfo;
  thisWeek: WeekInfo;
}
export interface Static {
  weekArray: BtnWeek[];
  staticInfo: StaticInfo;
  numberOfDay: Week;
}

const weekArray: BtnWeek[] = [
  {
    btnName: AvailableWeek.thisWeek,
    id: nanoid(),
  },
  {
    btnName: AvailableWeek.lastWeek,
    id: nanoid(),
  },
  {
    btnName: AvailableWeek.preLastWeek,
    id: nanoid(),
  },
];
const initialState: Static = {
  weekArray,
  staticInfo: JSON.parse(
    localStorage.getItem("staticInfo") ??
      JSON.stringify({
        prelastWeek: {
          monday: {
            timeActiveTimer: 0,
            countTomato: 0,
            countStops: 0,
            pauseTime: 0,
          },
          tuesday: {
            timeActiveTimer: 0,
            countTomato: 0,
            countStops: 0,
            pauseTime: 0,
          },
          wednesday: {
            timeActiveTimer: 0,
            countTomato: 0,
            countStops: 0,
            pauseTime: 0,
          },
          thursday: {
            timeActiveTimer: 0,
            countTomato: 0,
            countStops: 0,
            pauseTime: 0,
          },
          friday: {
            timeActiveTimer: 0,
            countTomato: 0,
            countStops: 0,
            pauseTime: 0,
          },
          saturday: {
            timeActiveTimer: 0,
            countTomato: 0,
            countStops: 0,
            pauseTime: 0,
          },
          sunday: {
            timeActiveTimer: 0,
            countTomato: 0,
            countStops: 0,
            pauseTime: 0,
          },
          numberOfDayOfWeek: 0,
        },
        lastWeek: {
          monday: {
            timeActiveTimer: 0,
            countTomato: 0,
            countStops: 0,
            pauseTime: 0,
          },
          tuesday: {
            timeActiveTimer: 0,
            countTomato: 0,
            countStops: 0,
            pauseTime: 0,
          },
          wednesday: {
            timeActiveTimer: 0,
            countTomato: 0,
            countStops: 0,
            pauseTime: 0,
          },
          thursday: {
            timeActiveTimer: 0,
            countTomato: 0,
            countStops: 0,
            pauseTime: 0,
          },
          friday: {
            timeActiveTimer: 0,
            countTomato: 0,
            countStops: 0,
            pauseTime: 0,
          },
          saturday: {
            timeActiveTimer: 0,
            countTomato: 0,
            countStops: 0,
            pauseTime: 0,
          },
          sunday: {
            timeActiveTimer: 0,
            countTomato: 0,
            countStops: 0,
            pauseTime: 0,
          },
          numberOfDayOfWeek: 0,
        },
        thisWeek: {
          monday: {
            timeActiveTimer: 0,
            countTomato: 0,
            countStops: 0,
            pauseTime: 0,
          },
          tuesday: {
            timeActiveTimer: 0,
            countTomato: 0,
            countStops: 0,
            pauseTime: 0,
          },
          wednesday: {
            timeActiveTimer: 0,
            countTomato: 0,
            countStops: 0,
            pauseTime: 0,
          },
          thursday: {
            timeActiveTimer: 0,
            countTomato: 0,
            countStops: 0,
            pauseTime: 0,
          },
          friday: {
            timeActiveTimer: 0,
            countTomato: 0,
            countStops: 0,
            pauseTime: 0,
          },
          saturday: {
            timeActiveTimer: 0,
            countTomato: 0,
            countStops: 0,
            pauseTime: 0,
          },
          sunday: {
            timeActiveTimer: 0,
            countTomato: 0,
            countStops: 0,
            pauseTime: 0,
          },
          numberOfDayOfWeek: 0,
        },
      })
  ),
  numberOfDay: getDayOfWeek(new Date()),
};
const staticSlice = createSlice({
  name: "StaticInfo",
  initialState,
  reducers: {
    // setWeekStatisticInfo(state) {
    //   const numberOfWeek = getNumberOfWeek();
    //   if (state.staticInfo.thisWeek.numberOfDayOfWeek !== numberOfWeek) {
    //     state.staticInfo.prelastWeek = state.staticInfo.lastWeek;
    //     state.staticInfo.lastWeek = state.staticInfo.thisWeek;
    //     state.staticInfo.thisWeek = {
    //       monday: {
    //         timeActiveTimer: 0,
    //         countTomato: 0,
    //         countStops: 0,
    //         pauseTime: 0,
    //       },
    //       tuesday: {
    //         timeActiveTimer: 0,
    //         countTomato: 0,
    //         countStops: 0,
    //         pauseTime: 0,
    //       },
    //       wednesday: {
    //         timeActiveTimer: 0,
    //         countTomato: 0,
    //         countStops: 0,
    //         pauseTime: 0,
    //       },
    //       thursday: {
    //         timeActiveTimer: 0,
    //         countTomato: 0,
    //         countStops: 0,
    //         pauseTime: 0,
    //       },
    //       friday: {
    //         timeActiveTimer: 0,
    //         countTomato: 0,
    //         countStops: 0,
    //         pauseTime: 0,
    //       },
    //       saturday: {
    //         timeActiveTimer: 0,
    //         countTomato: 0,
    //         countStops: 0,
    //         pauseTime: 0,
    //       },
    //       sunday: {
    //         timeActiveTimer: 0,
    //         countTomato: 0,
    //         countStops: 0,
    //         pauseTime: 0,
    //       },
    //       numberOfDayOfWeek: 0,
    //     };
    //     state.staticInfo.thisWeek.numberOfDayOfWeek = getNumberOfWeek();
    //     localStorage.setItem("staticInfo", JSON.stringify(state.staticInfo));
    //   }
    // },
    // setWeek(state, action: PayloadAction<string>) {
    //   const chosen = state.weekArray.find((item) => item.id === action.payload);
    //   state.weekArray = state.weekArray.filter(
    //     (item) => item.id !== action.payload
    //   );
    //   if (chosen) {
    //     state.weekArray.unshift(chosen);
    //   }
    // },
    incrementTimeActiveTimer(state) {
      state.staticInfo.thisWeek[getDayOfWeek(new Date())].timeActiveTimer++;
      localStorage.setItem("staticInfo", JSON.stringify(state.staticInfo));
    },
    incrementTimePauseTimer(state) {
      state.staticInfo.thisWeek[getDayOfWeek(new Date())].pauseTime++;
      localStorage.setItem("staticInfo", JSON.stringify(state.staticInfo));
    },
    incrementTomatoCounter(state) {
      state.staticInfo.thisWeek[getDayOfWeek(new Date())].countTomato++;
      localStorage.setItem("staticInfo", JSON.stringify(state.staticInfo));
    },
    incrementStopsCounter(state) {
      state.staticInfo.thisWeek[getDayOfWeek(new Date())].countStops++;
      localStorage.setItem("staticInfo", JSON.stringify(state.staticInfo));
    },
    // setChosenDayOfWeek(state, action: PayloadAction<number>) {
    //   state.numberOfDay = getDayOfWeek(
    //     action.payload === 6 ? 0 : action.payload + 1
    //   );
    // },
  },
});

export const {
  // setWeek,
  incrementTimeActiveTimer,
  // setWeekStatisticInfo,
  incrementTimePauseTimer,
  incrementTomatoCounter,
  incrementStopsCounter,
  // setChosenDayOfWeek,
} = staticSlice.actions;
export const staticReducer = staticSlice.reducer;
