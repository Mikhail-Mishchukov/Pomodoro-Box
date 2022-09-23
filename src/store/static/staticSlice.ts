import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { getDayOfWeek } from '../../utils/getDayOfWeek';
import { getNumberOfWeek } from '../../utils/getNumberOfWeek';

export enum EBtnWeek {
  thisWeek = 'Эта неделя',
  lastWeek = 'Прошедшая неделя',
  preLastWeek = '2 недели назад',
}

export interface IBtnWeek {
  btnName: EBtnWeek;
  id: string;
}

export interface IDayInfo {
  timeActiveTimer: number;
  countTomato: number;
  pauseTime: number;
  countStops: number;
}
export enum EWeek {
  monday = 'monday',
  tuesday = 'tuesday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday',
  saturday = 'saturday',
  sunday = 'sunday',
}
export interface IWeekInfo {
  [EWeek.monday]: IDayInfo;
  [EWeek.tuesday]: IDayInfo;
  [EWeek.wednesday]: IDayInfo;
  [EWeek.thursday]: IDayInfo;
  [EWeek.friday]: IDayInfo;
  [EWeek.saturday]: IDayInfo;
  [EWeek.sunday]: IDayInfo;
  numberOfDayOfWeek: number;
}
export interface IStaticInfo {
  prelastWeek: IWeekInfo;
  lastWeek: IWeekInfo;
  thisWeek: IWeekInfo;
}
export interface IStatic {
  weekAray: IBtnWeek[];
  staticInfo: IStaticInfo;
  numberOfDay: EWeek;
}

const initialState: IStatic = {
  weekAray: [
    {
      btnName: EBtnWeek.thisWeek,
      id: nanoid(),
    },
    {
      btnName: EBtnWeek.lastWeek,
      id: nanoid(),
    },
    {
      btnName: EBtnWeek.preLastWeek,
      id: nanoid(),
    },
  ],
  staticInfo: JSON.parse(
    localStorage.getItem('staticInfo') ??
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
  name: 'StaticInfo',
  initialState,
  reducers: {
    setWeekStitisticInfo(state) {
      const numberOfWeek = getNumberOfWeek();
      if (state.staticInfo.thisWeek.numberOfDayOfWeek !== numberOfWeek) {
        state.staticInfo.prelastWeek = state.staticInfo.lastWeek;
        state.staticInfo.lastWeek = state.staticInfo.thisWeek;
        state.staticInfo.thisWeek = {
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
        };
        state.staticInfo.thisWeek.numberOfDayOfWeek = getNumberOfWeek();
        localStorage.setItem('staticInfo', JSON.stringify(state.staticInfo));
      }
    },
    setWeek(state, action: PayloadAction<string>) {
      const choosen = state.weekAray.find((item) => item.id === action.payload);
      state.weekAray = state.weekAray.filter(
        (item) => item.id !== action.payload
      );
      if (choosen) {
        state.weekAray.unshift(choosen);
      }
    },
    incrimentTimeActiveTimer(state) {
      state.staticInfo.thisWeek[getDayOfWeek(new Date())].timeActiveTimer++;
      localStorage.setItem('staticInfo', JSON.stringify(state.staticInfo));
    },
    incrimentTimePauseTimer(state) {
      state.staticInfo.thisWeek[getDayOfWeek(new Date())].pauseTime++;
      localStorage.setItem('staticInfo', JSON.stringify(state.staticInfo));
    },
    incrimentTomatoCounter(state) {
      state.staticInfo.thisWeek[getDayOfWeek(new Date())].countTomato++;
      localStorage.setItem('staticInfo', JSON.stringify(state.staticInfo));
    },
    incrimentStopsCounter(state) {
      state.staticInfo.thisWeek[getDayOfWeek(new Date())].countStops++;
      localStorage.setItem('staticInfo', JSON.stringify(state.staticInfo));
    },
    setChoosenDayOfWeek(state, action: PayloadAction<number>) {
      state.numberOfDay = getDayOfWeek(
        action.payload === 6 ? 0 : action.payload + 1
      );
    },
  },
});

export const {
  setWeek,
  incrimentTimeActiveTimer,
  setWeekStitisticInfo,
  incrimentTimePauseTimer,
  incrimentTomatoCounter,
  incrimentStopsCounter,
  setChoosenDayOfWeek,
} = staticSlice.actions;
export const staticReducer = staticSlice.reducer;
