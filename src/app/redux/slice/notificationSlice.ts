import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  description: ''
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    }
  }
});

export const { setMessage, setDescription } = notificationSlice.actions;
export default notificationSlice.reducer;