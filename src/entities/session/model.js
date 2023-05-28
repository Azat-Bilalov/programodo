import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // объект пользователя
  isLoggedIn: false, // флаг авторизации
  loading: false, // флаг загрузки
  error: null, // объект ошибки
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    // редьюсер для установки флага загрузки
    setLoading: (state) => {
      state.loading = true;
    },
    // редьюсер для установки пользователя и флага авторизации
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.loading = false;
    },
    // редьюсер для сброса состояния авторизации
    resetUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.loading = false;
    },
    // редьюсер для установки ошибки
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // редьюсер для сброса ошибки
    resetError: (state) => {
      state.error = null;
      state.loading = false;
    },
  },
});

export const sessionModel = {
    ...sessionSlice
}
