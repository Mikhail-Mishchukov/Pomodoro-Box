import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAddTaskForm {
  name: string;
  error: string;
  willErrorDelete: boolean;
}

const initialState: IAddTaskForm = {
  name: '',
  error: '',
  willErrorDelete: false,
};

const addTaskFormSlice = createSlice({
  name: 'addTaskForm',
  initialState,
  reducers: {
    changeName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setErrorMessage(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setWillErrorMessageDelete(state, action: PayloadAction<boolean>) {
      if (state.willErrorDelete !== action.payload) {
        state.willErrorDelete = action.payload;
      }
    },
  },
});

export const { changeName, setErrorMessage, setWillErrorMessageDelete } =
  addTaskFormSlice.actions;
export const addTaskFormReducer = addTaskFormSlice.reducer;
