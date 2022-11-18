import { createSlice } from '@reduxjs/toolkit';
import {
  MAX_NEWS,
  NameSpace
} from '../../const';
import { Data } from '../../types/state';

const initialState: Data = {
  news: null,
  newsItems: null,
  currentNews: null,
  newsLoading: false,
  unloadedNewsItems: [],
};

export const data = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    loadNews: (state, action) => {
      state.news = action.payload;
    },
    loadNewsItems: (state, action) => {
      if (state.newsItems === null) {
        state.newsItems = action.payload;
      } else {
        state.newsItems.unshift(...action.payload);
        state.newsItems = state.newsItems.slice(0, MAX_NEWS);
      }
    },
    loadCurrentNews: (state, action) => {
      state.currentNews = action.payload;
    },
    setUnloadedNewsItems: (state, action) => {
      state.unloadedNewsItems = action.payload;
    },
    setNewsLoading: (state, action) => {
      state.newsLoading = action.payload;
    },
  },
});

export const { loadNews, loadNewsItems, loadCurrentNews, setUnloadedNewsItems, setNewsLoading } = data.actions;
