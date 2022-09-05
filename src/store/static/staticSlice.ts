import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { getDayOfWeek } from '../../shared/utils/getDayOfWeek';
import { getNumberOfWeek } from '../../shared/utils/getNumberOfWeek';

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
  numberOfDayofWeek: number;
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
  staticInfo: {
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
      numberOfDayofWeek: 0,
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
      numberOfDayofWeek: 0,
    },
    thisWeek: {
      monday: {
        timeActiveTimer: 7200,
        countTomato: 5,
        countStops: 3,
        pauseTime: 400,
      },
      tuesday: {
        timeActiveTimer: 150,
        countTomato: 0,
        countStops: 5,
        pauseTime: 61,
      },
      wednesday: {
        timeActiveTimer: 1500,
        countTomato: 1,
        countStops: 0,
        pauseTime: 5000,
      },
      thursday: {
        timeActiveTimer: 0,
        countTomato: 0,
        countStops: 0,
        pauseTime: 0,
      },
      friday: {
        timeActiveTimer: 1500,
        countTomato: 100,
        countStops: 0,
        pauseTime: 500,
      },
      saturday: {
        timeActiveTimer: 1500,
        countTomato: 4,
        countStops: 0,
        pauseTime: 544,
      },
      sunday: {
        timeActiveTimer: 1500,
        countTomato: 5,
        countStops: 1,
        pauseTime: 1805,
      },
      numberOfDayofWeek: 0,
    },
  },
  numberOfDay: getDayOfWeek(new Date()),
};
const staticSlice = createSlice({
  name: 'StaticInfo',
  initialState,
  reducers: {
    setWeekStitisticInfo(state) {
      //const numberOfWeek = getNumberOfWeek();
      //Когда будет сохранение инфы, сделать обновление недель, пока что просто инициализируем недели в 0;
      state.staticInfo.thisWeek.numberOfDayofWeek = getNumberOfWeek();
      state.staticInfo.lastWeek.numberOfDayofWeek = getNumberOfWeek() - 1;
      state.staticInfo.prelastWeek.numberOfDayofWeek = getNumberOfWeek() - 2;
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
    },
    incrimentTimePauseTimer(state) {
      state.staticInfo.thisWeek[getDayOfWeek(new Date())].pauseTime++;
    },
    incrimentTomatoCounter(state) {
      state.staticInfo.thisWeek[getDayOfWeek(new Date())].countTomato++;
    },
    incrimentStopsCounter(state) {
      state.staticInfo.thisWeek[getDayOfWeek(new Date())].countStops++;
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
