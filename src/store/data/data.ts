import { createSlice } from '@reduxjs/toolkit';
import {
  NameSpace
} from '../../const';
import { Data } from '../../types/state';

const initialState: Data = {
  news: null,
  currentNews: null,
  currentNewsLoading: false,
};

export const data = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    loadNews: (state, action) => {
      state.news = action.payload;
    },
    loadCurrentNews: (state, action) => {
      state.currentNews = action.payload;
    },
    setCurrentNewsLoading: (state, action) => {
      state.currentNewsLoading = action.payload;
    }
  },
});

export const { loadNews, loadCurrentNews, setCurrentNewsLoading } = data.actions;
